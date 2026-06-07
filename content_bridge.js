/**
 * 超维 ERP - Content Script Bridge (改进版 v2.0)
 * 功能：网页与插件通信桥接、登录态同步、消息转发
 * 安全性：消息验证、限流、去重、回调管理
 */

console.log("✅ [Bridge v2.0] 登录同步桥已加载");

(function () {
  'use strict';

  if (window.__chaoweiBridgeLoadedV2) {
    console.log("⚠️ [Bridge] 已初始化，跳过重复加载");
    return;
  }
  window.__chaoweiBridgeLoadedV2 = true;

  // ============ 工具函数 ============

  const Utils = {
    getStorage: (keys) => new Promise(resolve => {
      chrome.storage.local.get(keys, resolve);
    }),

    setStorage: (data) => new Promise(resolve => {
      chrome.storage.local.set(data, resolve);
    }),

    removeStorage: (keys) => new Promise(resolve => {
      chrome.storage.local.remove(keys, resolve);
    }),

    postToPage: (data) => {
      window.postMessage(data, location.origin);
    },

    sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms))
  };

  // ============ 数据验证 ============

  const VALIDATION_RULES = {
    token: {
      type: 'string',
      minLength: 10,
      maxLength: 512,
      pattern: /^[a-zA-Z0-9_\-\.]+$/
    },
    user: {
      type: 'object',
      fields: {
        username: { type: 'string', maxLength: 100 },
        role: { type: 'string', enum: ['user', 'admin'] },
        id: { type: 'string', maxLength: 100 }
      }
    },
    action: {
      type: 'string',
      whitelist: [
        "getAutoPickStatus", "startAutoPickTask", "stopAutoPickTask",
        "getAutoPickConfig", "saveAutoPickConfig", "getStores",
        "getWatermarks", "getUser", "getTaskProgress", "aiAutoUpload",
        "autoPickNextCategory", "autoPickProgress", "check1688Login",
        "erpLogin", "erpLogout", "getStoreWarehouses", "toggleFloating"
      ]
    }
  };

  class DataValidator {
    static validate(data, rule) {
      // 基础类型检查
      if (rule.type === 'string') {
        if (typeof data !== 'string') return false;
        if (rule.minLength && data.length < rule.minLength) return false;
        if (rule.maxLength && data.length > rule.maxLength) return false;
        if (rule.pattern && !rule.pattern.test(data)) return false;
        return true;
      }

      if (rule.type === 'object') {
        if (typeof data !== 'object' || data === null) return false;

        // 白名单验证
        for (const key in data) {
          if (!rule.fields || !rule.fields[key]) {
            console.warn(`[Validate] 字段 ${key} 不被允许`);
            return false;
          }
        }

        // 递归验证字段
        for (const key in rule.fields) {
          if (data[key] !== undefined) {
            if (!this.validate(data[key], rule.fields[key])) {
              console.warn(`[Validate] 字段 ${key} 验证失败`);
              return false;
            }
          }
        }

        return true;
      }

      if (rule.enum) {
        return rule.enum.includes(data);
      }

      if (rule.whitelist) {
        return rule.whitelist.includes(data);
      }

      return true;
    }

    static sanitizeUser(user) {
      if (!user || typeof user !== 'object') return null;

      try {
        return {
          username: String(user.username || '').substring(0, 100),
          role: ['user', 'admin'].includes(user.role) ? user.role : 'user',
          id: String(user.id || '').substring(0, 100)
        };
      } catch (e) {
        console.error("[Validate] user 清理失败:", e);
        return null;
      }
    }

    static sanitizePayload(payload) {
      if (!payload || typeof payload !== 'object') return null;

      const cleaned = {};
      const maxPayloadSize = 1024 * 100; // 100KB

      // 限制payload大小
      if (JSON.stringify(payload).length > maxPayloadSize) {
        console.warn("[Validate] payload 过大");
        return null;
      }

      for (const [key, value] of Object.entries(payload)) {
        if (key.startsWith('_')) continue; // 跳过内部字段

        // 仅允许基础类型
        if (typeof value === 'string' || typeof value === 'number' || 
            typeof value === 'boolean' || value === null) {
          cleaned[key] = value;
        } else if (Array.isArray(value)) {
          cleaned[key] = value.slice(0, 1000); // 限制数组长度
        } else if (typeof value === 'object') {
          cleaned[key] = JSON.stringify(value).substring(0, 10000);
        }
      }

      return cleaned;
    }
  }

  // ============ 消息验证 ============

  class MessageValidator {
    static validateMessage(event, expectedSource = 'erp-web') {
      // 检查来源
      if (event.source !== window) {
        console.warn("[MsgValid] 消息来源不是当前窗口");
        return false;
      }

      if (event.origin !== location.origin) {
        console.warn("[MsgValid] 消息origin不匹配");
        return false;
      }

      const data = event.data;
      if (!data || typeof data !== 'object') {
        console.warn("[MsgValid] 消息数据无效");
        return false;
      }

      if (data.source !== expectedSource) {
        console.warn("[MsgValid] 消息source不匹配");
        return false;
      }

      if (!data.type || typeof data.type !== 'string') {
        console.warn("[MsgValid] 消息type无效");
        return false;
      }

      return true;
    }

    static validateLoginMessage(data) {
      if (!data.token) {
        console.warn("[MsgValid] token 缺失");
        return false;
      }

      if (!DataValidator.validate(data.token, VALIDATION_RULES.token)) {
        console.warn("[MsgValid] token 格式无效");
        return false;
      }

      if (data.user) {
        const sanitized = DataValidator.sanitizeUser(data.user);
        if (!sanitized) {
          console.warn("[MsgValid] user 数据无效");
          return false;
        }
      }

      return true;
    }
  }

  // ============ 消息去重 ============

  class MessageDeduplicator {
    constructor(windowMs = 5000) {
      this.messages = new Map();
      this.windowMs = windowMs;
    }

    getMessageId(message) {
      const key = JSON.stringify({
        type: message.type,
        action: message.action || null,
        // 某些高度变化的字段不纳入ID
      });
      return this.hash(key);
    }

    hash(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16);
    }

    isDuplicate(message) {
      const id = this.getMessageId(message);
      const now = Date.now();
      const lastTime = this.messages.get(id);

      if (lastTime && (now - lastTime) < this.windowMs) {
        console.warn("[Dedup] 检测到重复消息:", id);
        return true;
      }

      this.messages.set(id, now);

      // 清理过期消息
      const expired = [];
      for (const [msgId, timestamp] of this.messages) {
        if ((now - timestamp) > this.windowMs * 2) {
          expired.push(msgId);
        }
      }
      expired.forEach(id => this.messages.delete(id));

      return false;
    }
  }

  const deduplicator = new MessageDeduplicator();

  // ============ 回调管理 ============

  class CallbackManager {
    constructor(timeout = 30000) {
      this.callbacks = new Map();
      this.timeout = timeout;
      this.nextId = 0;
    }

    register(callback) {
      const id = `cb_${++this.nextId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const timer = setTimeout(() => {
        this.callbacks.delete(id);
        console.warn(`[Callback] 回调 ${id.substring(0, 20)}... 已超时`);
      }, this.timeout);

      this.callbacks.set(id, { callback, timer, createdAt: Date.now() });
      return id;
    }

    invoke(id, data) {
      const entry = this.callbacks.get(id);
      if (!entry) {
        console.warn(`[Callback] 回调 ${id.substring(0, 20)}... 不存在`);
        return false;
      }

      clearTimeout(entry.timer);
      this.callbacks.delete(id);

      try {
        entry.callback(data);
        return true;
      } catch (e) {
        console.error("[Callback] 执行失败:", e);
        return false;
      }
    }

    clear(id) {
      const entry = this.callbacks.get(id);
      if (entry) {
        clearTimeout(entry.timer);
        this.callbacks.delete(id);
      }
    }

    clearAll() {
      for (const [id, entry] of this.callbacks) {
        clearTimeout(entry.timer);
      }
      this.callbacks.clear();
    }

    getStats() {
      return {
        pendingCallbacks: this.callbacks.size,
        totalCreated: this.nextId
      };
    }
  }

  const callbackManager = new CallbackManager(30000);

  // ============ 限流 ============

  class RateLimiter {
    constructor(maxRequests = 100, windowMs = 60000) {
      this.maxRequests = maxRequests;
      this.windowMs = windowMs;
      this.requests = [];
    }

    isAllowed(identifier = 'default') {
      const now = Date.now();

      // 清除过期请求
      this.requests = this.requests.filter(
        req => (now - req.timestamp) < this.windowMs
      );

      const recentRequests = this.requests.filter(
        req => req.identifier === identifier
      );

      if (recentRequests.length >= this.maxRequests) {
        console.warn(`[RateLimit] ${identifier} 超过限额`);
        return false;
      }

      this.requests.push({ identifier, timestamp: now });
      return true;
    }
  }

  const rateLimiter = new RateLimiter(100, 60000);

  // ============ Background 通信 ============

  class BackgroundMessenger {
    static async send(payload, maxRetries = 3, baseDelay = 1000) {
      // 检查限流
      const action = payload.action || 'unknown';
      if (!rateLimiter.isAllowed(action)) {
        throw new Error("请求过于频繁，请稍后再试");
      }

      let lastError;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          return await new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
              reject(new Error("chrome.runtime.sendMessage 超时"));
            }, 10000);

            chrome.runtime.sendMessage(payload, (response) => {
              clearTimeout(timeoutId);

              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
              } else {
                resolve(response);
              }
            });
          });
        } catch (e) {
          lastError = e;

          if (attempt < maxRetries) {
            const delay = baseDelay * Math.pow(2, attempt - 1);
            console.warn(`[BGMsg] 发送失败，${delay}ms 后重试:`, e.message);
            await Utils.sleep(delay);
          }
        }
      }

      throw lastError;
    }
  }

  // ============ 认证同步 ============

  class AuthSynchronizer {
    constructor() {
      this.lastSyncTime = 0;
      this.syncInterval = 1000;
      this.isReady = false;
      this.pendingSync = false;
    }

    async syncAuthToPage() {
      const now = Date.now();

      // 防抖
      if (now - this.lastSyncTime < this.syncInterval) {
        this.pendingSync = true;
        return;
      }

      try {
        const stored = await Utils.getStorage(["erp_token", "erp_user"]);

        Utils.postToPage({
          source: "erp-extension",
          type: "erp-auth-status",
          loggedIn: !!stored.erp_token,
          token: stored.erp_token || null,
          user: stored.erp_user || null,
          timestamp: Date.now()
        });

        this.lastSyncTime = now;
        this.pendingSync = false;

        console.log("[AuthSync] 已同步登录态到网页");

        // 如果有待处理的同步，稍后再执行
        if (this.pendingSync) {
          setTimeout(() => this.syncAuthToPage(), this.syncInterval);
        }
      } catch (e) {
        console.error("[AuthSync] 同步失败:", e);
      }
    }

    notifyReady() {
      if (this.isReady) return;

      Utils.postToPage({
        source: "erp-extension",
        type: "erp-extension-ready",
        version: "2.0.0",
        timestamp: Date.now()
      });

      this.isReady = true;
      console.log("✅ [Bridge] 已通知网页插件就绪");

      // 同步登录态
      this.syncAuthToPage();
    }

    waitUntilPageReady() {
      return new Promise((resolve) => {
        if (document.readyState !== "loading") {
          resolve();
          return;
        }

        document.addEventListener("DOMContentLoaded", resolve, { once: true });
      });
    }

    async init() {
      // 立即通知就绪
      this.notifyReady();

      // 等待页面就绪后同步一次
      await this.waitUntilPageReady();
      setTimeout(() => this.syncAuthToPage(), 500);
    }
  }

  const authSync = new AuthSynchronizer();

  // ============ 消息处理 ============

  async function handleMessage(data) {
    const type = data.type;

    // erp-login: 网页登录成功
    if (type === "erp-login") {
      if (!MessageValidator.validateLoginMessage(data)) {
        console.warn("❌ [Bridge] 登录消息验证失败");
        return;
      }

      const sanitizedUser = data.user ? DataValidator.sanitizeUser(data.user) : null;

      await Utils.setStorage({
        erp_token: data.token,
        erp_user: sanitizedUser
      });

      console.log("✅ [Bridge] 已同步登录态到插件");
      await authSync.syncAuthToPage();
      return;
    }

    // erp-logout: 网页登出
    if (type === "erp-logout") {
      await Utils.removeStorage(["erp_token", "erp_user"]);
      console.log("✅ [Bridge] 已清除插件登录态");
      await authSync.syncAuthToPage();
      return;
    }

    // erp-check-auth: 网页询问登录态
    if (type === "erp-check-auth") {
      await authSync.syncAuthToPage();
      return;
    }

    // erp-bridge-call: 网页调用background
    if (type === "erp-bridge-call" && data.payload) {
      const payload = data.payload;
      const callbackId = payload._bridgeCallbackId;

      // 验证action
      if (!DataValidator.validate(payload.action, VALIDATION_RULES.action)) {
        console.warn("[Bridge] 拒绝非白名单 action:", payload.action);
        if (callbackId) {
          Utils.postToPage({
            source: "erp-extension",
            type: "erp-bridge-response",
            _bridgeCallbackId: callbackId,
            result: { success: false, error: "不允许的操作" }
          });
        }
        return;
      }

      // 清理payload
      const cleanPayload = DataValidator.sanitizePayload(payload);
      if (!cleanPayload) {
        console.warn("[Bridge] payload 清理失败");
        return;
      }

      // 转发到background
      try {
        const response = await BackgroundMessenger.send(cleanPayload);

        if (callbackId) {
          Utils.postToPage({
            source: "erp-extension",
            type: "erp-bridge-response",
            _bridgeCallbackId: callbackId,
            result: response || null
          });
        }
      } catch (e) {
        console.error("[Bridge] 转发失败:", e);
        if (callbackId) {
          Utils.postToPage({
            source: "erp-extension",
            type: "erp-bridge-response",
            _bridgeCallbackId: callbackId,
            result: { success: false, error: e.message }
          });
        }
      }

      return;
    }
  }

  // ============ 事件监听 ============

  // 监听网页消息
  window.addEventListener("message", function (e) {
    // 验证消息来源
    if (!MessageValidator.validateMessage(e, "erp-web")) {
      return;
    }

    const data = e.data;

    // 去重
    if (deduplicator.isDuplicate(data)) {
      console.warn("⚠️ [Bridge] 忽略重复消息");
      return;
    }

    // 处理消息
    handleMessage(data).catch((err) => {
      console.error("[Bridge] 消息处理失败:", err);
    });
  });

  // 监听 background 消息
  try {
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
      if (!msg || typeof msg !== 'object') return;

      const action = msg.action;

      // 登录态变化通知
      if (action === "erpAuthChanged") {
        if (msg.loggedOut) {
          Utils.removeStorage(["erp_token", "erp_user"]).then(() => {
            authSync.syncAuthToPage();
          });
        } else {
          const updates = {};
          if (msg.token !== undefined) updates.erp_token = msg.token;
          if (msg.user !== undefined) updates.erp_user = DataValidator.sanitizeUser(msg.user);

          if (Object.keys(updates).length > 0) {
            Utils.setStorage(updates).then(() => {
              authSync.syncAuthToPage();
            });
          }
        }
        sendResponse({ ok: true });
        return true;
      }

      // 自动选品状态推送
      if (action === "autoPickStatusUpdate") {
        Utils.postToPage({
          source: "erp-extension",
          type: "erp-autopick-status",
          status: msg.status || null,
          timestamp: Date.now()
        });
        sendResponse({ ok: true });
        return true;
      }

      sendResponse({ ok: false });
    });
  } catch (e) {
    console.error("[Bridge] chrome.runtime.onMessage 注册失败:", e);
  }

  // ============ 初始化 ============

  console.log("⚙️ [Bridge] 初始化中...");
  authSync.init();
  console.log("✅ [Bridge] 初始化完成");

})();