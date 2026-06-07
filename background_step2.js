'use strict';

console.log("✅ [Background] 超维 ERP v8.0 启动");

const API_URL = "https://api.ozonerp.chaowei.online";
const CONFIG = {
  requestTimeout: 30000,
  maxRetries: 3,
  retryDelay: 1000,
  keepAliveInterval: 0.5,
  tokenCheckInterval: 3600000
};

// ============ 日志系统 ============

class Logger {
  constructor(context = "Background") {
    this.context = context;
    this.logs = [];
    this.maxLogs = 100;
  }

  log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, level, message, context: this.context, ...(data && { data }) };
    
    this.logs.push(logEntry);
    if (this.logs.length > this.maxLogs) this.logs.shift();

    const prefix = `[${level}] [${this.context}]`;
    if (data) {
      console[level.toLowerCase()](prefix, message, data);
    } else {
      console[level.toLowerCase()](prefix, message);
    }
  }

  info(msg, data) { this.log("INFO", msg, data); }
  warn(msg, data) { this.log("WARN", msg, data); }
  error(msg, data) { this.log("ERROR", msg, data); }
  debug(msg, data) { this.log("DEBUG", msg, data); }
  getLogs() { return this.logs; }
  clearLogs() { this.logs = []; }
}

const logger = new Logger("Background");

// ============ 存储管理 ============

class StorageManager {
  static async get(keys) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.get(keys, (result) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve(result);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  static async set(data) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.set(data, () => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve();
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  static async remove(keys) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.remove(keys, () => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve();
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  static async clear() {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.clear(() => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve();
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}

// ============ API 客户端 ============

class APIClient {
  constructor(baseURL, options = {}) {
    this.baseURL = baseURL;
    this.timeout = options.timeout || CONFIG.requestTimeout;
    this.maxRetries = options.maxRetries || CONFIG.maxRetries;
    this.requestLog = [];
  }

  async request(path, options = {}) {
    const token = await this.getValidToken();

    if (!token && !this.isPublicPath(path)) {
      throw new Error("未登录或登录已过期");
    }

    const headers = {
      "Content-Type": "application/json",
      "X-Request-ID": this.generateRequestId(),
      ...(token && { "Authorization": `Bearer ${token}` })
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    let lastError;
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        logger.debug(`请求 ${path}`, { attempt, method: options.method || "GET" });

        const response = await fetch(this.baseURL + path, {
          method: options.method || "GET",
          headers,
          body: options.body ? JSON.stringify(options.body) : undefined,
          signal: controller.signal,
          credentials: "same-origin"
        });

        clearTimeout(timeoutId);

        if (response.status === 401) {
          await StorageManager.remove(["erp_token", "erp_user", "erp_token_expires_at"]);
          this.broadcastAuthChange(false);
          throw new Error("登录已过期，请重新登录");
        }

        if (response.status === 403) {
          throw new Error("权限不足");
        }

        let data;
        try {
          data = await response.json();
        } catch (e) {
          data = { code: response.status, msg: `HTTP ${response.status}` };
        }

        if (!response.ok && response.status >= 500) {
          lastError = new Error(data.msg || `HTTP ${response.status}`);
          
          if (attempt < this.maxRetries) {
            await this.delay(CONFIG.retryDelay * attempt);
            continue;
          }
          throw lastError;
        }

        return data;
      } catch (e) {
        clearTimeout(timeoutId);
        lastError = e;

        if (e.name === "AbortError") {
          throw new Error("请求超时");
        }

        if (attempt < this.maxRetries && this.isRetryable(e)) {
          logger.warn(`请求失败，准备重试`, { attempt, error: e.message });
          await this.delay(CONFIG.retryDelay * attempt);
          continue;
        }

        throw e;
      }
    }

    throw lastError || new Error("请求失败");
  }

  async getValidToken() {
    const stored = await StorageManager.get(["erp_token", "erp_token_expires_at"]);
    
    if (!stored.erp_token) return null;
    
    if (stored.erp_token_expires_at && Date.now() > stored.erp_token_expires_at) {
      await StorageManager.remove(["erp_token", "erp_user", "erp_token_expires_at"]);
      this.broadcastAuthChange(false);
      return null;
    }

    return stored.erp_token;
  }

  isPublicPath(path) {
    const publicPaths = ["/auth/login", "/auth/register"];
    return publicPaths.some(p => path.includes(p));
  }

  isRetryable(error) {
    const message = error.message || "";
    return message.includes("网络") || message.includes("timeout") || message.includes("Failed to fetch");
  }

  delay(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  generateRequestId() {
    const random = crypto.getRandomValues(new Uint8Array(8))
      .reduce((a, b) => a + b.toString(16).padStart(2, '0'), '');
    return `req_${Date.now()}_${random}`;
  }

  logRequest(path, method, status) {
    this.requestLog.push({
      path,
      method: method || "GET",
      status,
      timestamp: new Date().toISOString()
    });

    if (this.requestLog.length > 100) {
      this.requestLog.shift();
    }
  }

  broadcastAuthChange(isLoggedIn) {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {
          action: "erpAuthChanged",
          loggedOut: !isLoggedIn
        }).catch(() => {});
      });
    });
  }

  getRequestLog() {
    return this.requestLog;
  }
}

const apiClient = new APIClient(API_URL);

// ============ Token 管理 ============

class TokenManager {
  static async setToken(token, expiresInSeconds = 30 * 24 * 60 * 60) {
    const expiresAt = Date.now() + expiresInSeconds * 1000;
    await StorageManager.set({
      erp_token: token,
      erp_token_expires_at: expiresAt
    });
    logger.info("Token 已保存");
  }

  static async getToken() {
    const stored = await StorageManager.get("erp_token");
    return stored.erp_token || null;
  }

  static async clearToken() {
    await StorageManager.remove(["erp_token", "erp_user", "erp_token_expires_at"]);
    logger.info("Token 已清除");
  }

  static async checkExpiry() {
    const stored = await StorageManager.get("erp_token_expires_at");
    if (!stored.erp_token_expires_at) return;

    if (Date.now() > stored.erp_token_expires_at) {
      logger.warn("Token 已过期，自动清除");
      await this.clearToken();
      return true;
    }

    return false;
  }
}

// ============ 消息处理 ============

const messageHandlers = {
  erpLogin: async (msg) => {
    try {
      const res = await apiClient.request("/auth/login", {
        method: "POST",
        body: { username: msg.username, password: msg.password }
      });

      if (res.code === 0 && res.data?.token) {
        await TokenManager.setToken(res.data.token);
        await StorageManager.set({ erp_user: res.data.user });
        logger.info("登录成功", { username: msg.username });
        return { success: true, data: res.data };
      }

      return { success: false, error: res.msg || "登录失败" };
    } catch (e) {
      logger.error("登录失败", e);
      return { success: false, error: e.message };
    }
  },

  erpLogout: async () => {
    try {
      await TokenManager.clearToken();
      logger.info("登出成功");
      return { success: true };
    } catch (e) {
      logger.error("登出失败", e);
      return { success: false, error: e.message };
    }
  },

  getUser: async () => {
    try {
      const stored = await StorageManager.get("erp_user");
      return { success: true, user: stored.erp_user || null };
    } catch (e) {
      logger.error("获取用户信息失败", e);
      return { success: false, error: e.message };
    }
"  
  // ===== 新增：翻译文本 =====
  translateText: async (msg) => {
    try {
      const res = await apiClient.request("/ai/translate-text", {
        method: 'POST',
        body: { text: msg.text, targetLang: msg.targetLang || 'ru' }
      });
      if (res.code === 0) {
        return { success: true, data: res.data };
      }
      return { success: false, error: res.msg || '翻译失败' };
    } catch (e) {
      logger.error('翻译失败', e);
      return { success: false, error: e.message };
    }
  },

  // ===== 新增：AI改造图片 =====
  enhanceImage: async (msg) => {
    try {
      const res = await apiClient.request("/ai/enhance-image", {
        method: 'POST',
        body: { imageUrl: msg.imageUrl, styleHint: msg.styleHint || '' }
      });
      if (res.code === 0) {
        return { success: true, data: res.data };
      }
      return { success: false, error: res.msg || 'AI改造失败' };
    } catch (e) {
      logger.error('AI改造失败', e);
      return { success: false, error: e.message };
    }
  },

  // ===== 新增：生成简介 =====
  generateDescription: async (msg) => {
    try {
      const res = await apiClient.request("/ai/generate-description", {
        method: 'POST',
        body: { product: msg.product }
      });
      if (res.code === 0) {
        return { success: true, data: res.data };
      }
      return { success: false, error: res.msg || '生成失败' };
    } catch (e) {
      logger.error('生成简介失败', e);
      return { success: false, error: e.message };
    }
  },

  // ===== 新增：生成标签 =====
  generateTags: async (msg) => {
    try {
      const res = await apiClient.request("/ai/generate-tags", {
        method: 'POST',
        body: { product: msg.product }
      });
      if (res.code === 0) {
        return { success: true, data: res.data };
      }
      return { success: false, error: res.msg || '生成失败' };
    } catch (e) {
      logger.error('生成标签失败', e);
      return { success: false, error: e.message };
    }
  },
  },

  getStores: async () => {
    try {
      const res = await apiClient.request("/user/stores");
      if (res.code === 0) {
        return { success: true, data: res.data || [] };
      }
      return { success: false, error: res.msg || "获取店铺失败" };
    } catch (e) {
      logger.error("获取店铺失败", e);
      return { success: false, error: e.message };
    }
  },

  getWatermarks: async () => {
    try {
      const res = await apiClient.request("/user/watermark");
      if (res.code === 0) {
        return { success: true, data: res.data || [] };
      }
      return { success: false, error: res.msg || "获取水印失败" };
    } catch (e) {
      logger.error("获取水印失败", e);
      return { success: false, error: e.message };
    }
  },

  getStoreWarehouses: async (msg) => {
    try {
      const res = await apiClient.request("/erp/store-warehouses", {
        method: "POST",
        body: { storeId: msg.storeId }
      });
      if (res.code === 0) {
        return { success: true, data: res.data || [] };
      }
      return { success: false, error: res.msg || "获取仓库失败" };
    } catch (e) {
      logger.error("获取仓库失败", e);
      return { success: false, error: e.message };
    }
  },

  aiAutoUpload: async (msg) => {
    try {
      const res = await apiClient.request("/ai/auto-upload", {
        method: "POST",
        body: { product: msg.product, config: msg.config }
      });
      if (res.code === 0) {
        return { success: true, taskId: res.data?.taskId };
      }
      return { success: false, error: res.msg || "提交失败" };
    } catch (e) {
      logger.error("AI 上品失败", e);
      return { success: false, error: e.message };
    }
  },

  getTaskProgress: async (msg) => {
    try {
      const res = await apiClient.request("/ai/task-progress/" + msg.taskId);
      if (res.code === 0) {
        return { success: true, task: res.data };
      }
      return { success: false, error: res.msg || "查询失败" };
    } catch (e) {
      logger.error("获取任务进度失败", e);
      return { success: false, error: e.message };
    }
  },

  // ===== 新增：翻译文本 =====
  translateText: async (msg) => {
    try {
      const res = await apiClient.request("/ai/translate-text", {
        method: "POST",
        body: { text: msg.text, targetLang: msg.targetLang || "ru" }
      });
      if (res.code === 0) {
        return { success: true, data: res.data };
      }
      return { success: false, error: res.msg || "翻译失败" };
    } catch (e) {
      logger.error("翻译失败", e);
      return { success: false, error: e.message };
    }
  },

  // ===== 新增：AI改造图片 =====
  enhanceImage: async (msg) => {
    try {
      const res = await apiClient.request("/ai/enhance-image", {
        method: "POST",
        body: { imageUrl: msg.imageUrl, styleHint: msg.styleHint || "" }
      });
      if (res.code === 0) {
        return { success: true, data: res.data };
      }
      return { success: false, error: res.msg || "AI改造失败" };
    } catch (e) {
      logger.error("AI改造失败", e);
      return { success: false, error: e.message };
    }
  },

  // ===== 新增：翻译图片 =====
  translateImage: async (msg) => {
    try {
      const res = await apiClient.request("/ai/translate-image", {
        method: "POST",
        body: { imageUrl: msg.imageUrl, styleHint: msg.styleHint || "" }
      });
      if (res.code === 0) {
        return { success: true, data: res.data };
      }
      return { success: false, error: res.msg || "翻译图片失败" };
    } catch (e) {
      logger.error("翻译图片失败", e);
      return { success: false, error: e.message };
    }
  },

  // ===== 新增：生成简介 =====
  generateDescription: async (msg) => {
    try {
      const res = await apiClient.request("/ai/generate-desc", {
        method: "POST",
        body: { product: msg.product }
      });
      if (res.code === 0) {
        return { success: true, data: res.data };
      }
      return { success: false, error: res.msg || "生成失败" };
    } catch (e) {
      logger.error("生成简介失败", e);
      return { success: false, error: e.message };
    }
  },

  // ===== 新增：生成富内容 =====
  generateRichContent: async (msg) => {
    try {
      const res = await apiClient.request("/ai/generate-rich", {
        method: "POST",
        body: { product: msg.product, description: msg.description }
      });
      if (res.code === 0) {
        return { success: true, data: res.data };
      }
      return { success: false, error: res.msg || "生成失败" };
    } catch (e) {
      logger.error("生成富内容失败", e);
      return { success: false, error: e.message };
    }
  },

  // ===== 新增：生成标签 =====
  generateTags: async (msg) => {
    try {
      const res = await apiClient.request("/ai/generate-tags", {
        method: "POST",
        body: { product: msg.product, description: msg.description }
      });
      if (res.code === 0) {
        return { success: true, data: res.data };
      }
      return { success: false, error: res.msg || "生成失败" };
    } catch (e) {
      logger.error("生成标签失败", e);
      return { success: false, error: e.message };
    }
  },

  check1688Login: async () => {
  return new Promise(resolve => {
    try {
      // ⭐ 优先查找已打开的 1688 标签页
      chrome.tabs.query({ url: "*://*.1688.com/*" }, function(existingTabs) {
        
        // 没有打开 1688 标签页
        if (!existingTabs || existingTabs.length === 0) {
          logger.warn("没有打开的 1688 标签页");
          resolve({
            success: true,
            loggedIn: false,
            reason: "请先在浏览器打开 1688 网站并登录"
          });
          return;
        }
        
        logger.info(`找到 ${existingTabs.length} 个 1688 标签页`);
        
        // 优先选择非登录页的标签页
        var targetTab = existingTabs.find(function(t) {
          return t.url && 
                 !t.url.includes("login") && 
                 !t.url.includes("passport");
        }) || existingTabs[0];
        
        logger.info(`使用标签页检测: ${targetTab.url}`);
        
        // 在该标签页执行检测脚本
        chrome.scripting.executeScript({
          target: { tabId: targetTab.id },
          func: function() {
            try {
              var cookies = document.cookie || "";
              var url = location.href;
              
              // 1688 常见的登录态 Cookie
              var loginCookies = [
                "unb",           // 用户ID（最关键）
                "_tb_token_",    // Token
                "cookie2",       // 主 Cookie
                "lgc",           // 登录用户名
                "munb",          // 主用户ID
                "tracknick",     // 用户昵称
                "_nk_"           // 用户标识
              ];
              
              var foundCookies = [];
              loginCookies.forEach(function(name) {
                if (cookies.indexOf(name + "=") >= 0) {
                  foundCookies.push(name);
                }
              });
              
              var isLoginPage = url.indexOf("login") >= 0 || 
                                url.indexOf("passport") >= 0;
              
              // 至少有 1 个关键 Cookie 就认为已登录
              var loggedIn = foundCookies.length >= 1 && !isLoginPage;
              
              return {
                loggedIn: loggedIn,
                foundCookies: foundCookies,
                cookieCount: foundCookies.length,
                isLoginPage: isLoginPage,
                url: url
              };
            } catch(e) {
              return { error: e.message };
            }
          }
        }, function(results) {
          if (chrome.runtime.lastError) {
            logger.error("脚本执行失败", chrome.runtime.lastError);
            resolve({ 
              success: false, 
              loggedIn: false, 
              error: "脚本执行失败: " + chrome.runtime.lastError.message 
            });
            return;
          }
          
          if (!results || !results[0] || !results[0].result) {
            resolve({ 
              success: false, 
              loggedIn: false, 
              error: "无法读取检测结果" 
            });
            return;
          }
          
          var r = results[0].result;
          logger.info("检测结果", r);
          
          if (r.error) {
            resolve({ 
              success: false, 
              loggedIn: false, 
              error: r.error 
            });
            return;
          }
          
          var reason = "";
          if (r.loggedIn) {
            reason = "检测到登录Cookie: " + r.foundCookies.join(", ");
          } else if (r.isLoginPage) {
            reason = "当前在登录页，请先完成登录";
          } else if (r.cookieCount === 0) {
            reason = "未检测到登录Cookie";
          } else {
            reason = "登录状态异常";
          }
          
          resolve({
            success: true,
            loggedIn: r.loggedIn,
            reason: reason
          });
        });
      });
    } catch (e) {
      logger.error("检查1688登录失败", e);
      resolve({ success: false, error: e.message });
    }
  });
},

  getAutoPickConfig: async () => {
    try {
      const stored = await StorageManager.get("auto_pick_config");
      return { success: true, config: stored.auto_pick_config || null };
    } catch (e) {
      logger.error("获取选品配置失败", e);
      return { success: false, error: e.message };
    }
  },

  saveAutoPickConfig: async (msg) => {
    try {
      await StorageManager.set({ auto_pick_config: msg.config });
      logger.info("选品配置已保存");
      return { success: true };
    } catch (e) {
      logger.error("保存选品配置失败", e);
      return { success: false, error: e.message };
    }
  },

  startAutoPickTask: async (msg) => {
    try {
      const config = msg.config;
      if (!config || !config.targetCategories?.length || !config.storeIds?.length) {
        return { success: false, error: "参数不完整" };
      }

      const categoriesQueue = config.targetCategories.map(item => ({
        keyword: item.keyword,
        categoryId: item.categoryId,
        typeId: item.typeId
      }));

      await StorageManager.set({
        auto_pick_config: config,
        auto_pick_categories_queue: categoriesQueue,
        auto_pick_category_index: 0,
        auto_pick_queue: [],
        auto_pick_queue_index: 0,
        auto_pick_counters: { processed: 0, success: 0, failed: 0 },
        auto_pick_status: {
          running: true,
          startedAt: Date.now(),
          processed: 0,
          success: 0,
          failed: 0,
          current: "准备开始",
          currentCategoryName: categoriesQueue[0]?.keyword,
          categoryIndex: 0,
          totalCategories: categoriesQueue.length,
          log: [{
            time: Date.now(),
            text: `🚀 自动选品任务已启动，共 ${categoriesQueue.length} 个类目`
          }]
        }
      });

      logger.info("自动选品任务已启动", { categories: categoriesQueue.length });
      return { success: true };
    } catch (e) {
      logger.error("启动选品任务失败", e);
      return { success: false, error: e.message };
    }
  },

  stopAutoPickTask: async () => {
    try {
      const stored = await StorageManager.get(["auto_pick_status", "auto_pick_tab_id"]);
      const status = stored.auto_pick_status || {};

      if (stored.auto_pick_tab_id) {
        try {
          chrome.tabs.update(stored.auto_pick_tab_id, { url: "about:blank" });
        } catch (e) {}
      }

      await StorageManager.set({
        auto_pick_status: { ...status, running: false, stoppedAt: Date.now() },
        auto_pick_tab_id: null
      });

      logger.info("自动选品任务已停止");
      return { success: true };
    } catch (e) {
      logger.error("停止选品任务失败", e);
      return { success: false, error: e.message };
    }
  },

  getAutoPickStatus: async () => {
    try {
      const stored = await StorageManager.get("auto_pick_status");
      return { success: true, status: stored.auto_pick_status || null };
    } catch (e) {
      logger.error("获取选品状态失败", e);
      return { success: false, error: e.message };
    }
  },

  autoPickNextCategory: async (msg) => {
    try {
      const nextIndex = typeof msg.nextIndex === "number" ? msg.nextIndex : 0;
      const stored = await StorageManager.get([
        "auto_pick_config",
        "auto_pick_categories_queue",
        "auto_pick_status"
      ]);

      const config = stored.auto_pick_config;
      const categories = stored.auto_pick_categories_queue || [];
      const status = stored.auto_pick_status || {};

      if (nextIndex >= categories.length) {
        await StorageManager.set({
          auto_pick_status: {
            ...status,
            running: false,
            current: "全部类目已完成",
            finishedAt: Date.now()
          }
        });
        logger.info("所有类目处理完成");
        return { success: true, done: true };
      }

      logger.info(`处理类目 ${nextIndex + 1}/${categories.length}`);
      return { success: true, done: false };
    } catch (e) {
      logger.error("处理下一个类目失败", e);
      return { success: false, error: e.message };
    }
  },

  autoPickProgress: async (msg) => {
    try {
      const stored = await StorageManager.get("auto_pick_status");
      const status = stored.auto_pick_status || {};
      const data = msg.data || {};

      await StorageManager.set({
        auto_pick_status: {
          ...status,
          processed: data.processed !== undefined ? data.processed : status.processed,
          success: data.success !== undefined ? data.success : status.success,
          failed: data.failed !== undefined ? data.failed : status.failed,
          current: data.current || status.current,
          running: data.type !== "done"
        }
      });

      logger.debug("选品进度更新", data);
      return { success: true };
    } catch (e) {
      logger.error("更新选品进度失败", e);
      return { success: false, error: e.message };
    }
  }
};

// ============ 消息监听 ============

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || !msg.action) {
    sendResponse({ success: false, error: "无效消息" });
    return true;
  }

  logger.debug("收到消息", { action: msg.action, sender: sender.id });

  const handler = messageHandlers[msg.action];
  if (!handler) {
    sendResponse({ success: false, error: `未知 action: ${msg.action}` });
    return true;
  }

  Promise.resolve()
    .then(() => handler(msg))
    .then(sendResponse)
    .catch(e => {
      logger.error(`消息处理失败: ${msg.action}`, e);
      sendResponse({ success: false, error: e.message });
    });

  return true;
});

// ============ 标签页事件 ============

chrome.tabs.onRemoved.addListener((tabId) => {
  StorageManager.get(["auto_pick_tab_id", "auto_pick_status"]).then(stored => {
    if (stored.auto_pick_tab_id === tabId && stored.auto_pick_status?.running) {
      logger.warn("任务标签被关闭，自动停止");
      messageHandlers.stopAutoPickTask();
    }
  });
});

// ============ Keep-Alive 机制 ============

function setupKeepAlive() {
  try {
    chrome.alarms.create("keepAlive", { periodInMinutes: CONFIG.keepAliveInterval });
    chrome.alarms.onAlarm.addListener(alarm => {
      if (alarm.name === "keepAlive") {
        logger.debug("⏰ Service Worker 保活");
        TokenManager.checkExpiry();
      }
    });
    logger.info("Keep-Alive 机制已启动");
  } catch (e) {
    logger.error("Keep-Alive 设置失败", e);
  }
}

// ============ 插件启动 ============

chrome.runtime.onStartup.addListener(() => {
  logger.info("插件启动");
  setupKeepAlive();
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    logger.info("插件已安装");
    chrome.tabs.create({ url: "https://ozonerp.chaowei.online" });
  } else if (details.reason === "update") {
    logger.info("插件已更新", { previousVersion: details.previousVersion });
  }
});

// 初始化
setupKeepAlive();

setInterval(() => {
  TokenManager.checkExpiry();
}, CONFIG.tokenCheckInterval);

logger.info("Background Worker 已初始化完成");
