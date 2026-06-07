export default {
  async fetch(request, env, ctx) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Max-Age": "86400"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    const AI_BASE_URL = env.AI_BASE_URL || "https://gpt-agent.cc/v1";
    const AI_API_KEY = env.AI_API_KEY || "";
    const AI_TEXT_MODEL = env.AI_TEXT_MODEL || "gpt-5.4";
    const AI_VISION_MODEL = env.AI_VISION_MODEL || "gpt-5.4";
    const AI_IMAGE_MODEL = env.AI_IMAGE_MODEL || "gpt-image-2";

    const respond = (data, status = 200) => new Response(JSON.stringify(data), {
      status,
      headers: { "Content-Type": "application/json;charset=UTF-8", ...cors }
    });

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    // ========== Ozon 禁售/限售关键词库（完整版）==========
    const BANNED_KEYWORDS = [
      // 需要质量证明
      "生物活性添加剂","保健品","膳食补充剂","营养补充",
      "运动营养","蛋白粉","肌酸","增肌粉","健身补剂",
      "检测试纸","试纸","检测盒","测试盒","验孕",
      "美容仪","美容器","光子嫩肤","射频美容","美容卫生",
      "儿童座椅","儿童安全座椅","安全座椅","汽车座椅",
      "烟火","烟花","爆竹","鞭炮","礼花","焰火","仙女棒","烟火棒",
      "医疗器械","医疗设备","血压计","血糖仪","听诊器","医用",
      "医疗美容","美容针","注射器","微整形",
      "光子脱毛","脱毛仪","激光脱毛","IPL脱毛",
      "婴儿食品","婴儿奶粉","婴儿辅食","婴儿米粉","宝宝食品",
      // 酒精
      "酒精","白酒","红酒","啤酒","黄酒","葡萄酒","香槟","伏特加","威士忌",
      "朗姆酒","白兰地","清酒","米酒","果酒","烧酒","药酒","鸡尾酒",
      "乙醇","含酒精","酒酿",
      // 贵金属和宝石
      "贵金属","黄金","白银","铂金","钯金","铱","铑","钌","锇",
      "金条","银条","金币","银币",
      "珠宝","钻石","祖母绿","红宝石","蓝宝石","翠绿宝石","珍珠",
      "宝石","玉石","翡翠","和田玉",
      // 武器弹药
      "武器","枪支","弹药","爆炸物","炸药","火药","起爆",
      "匕首","军刀","战刀","猎刀","弹簧刀","蝴蝶刀",
      "刺刀","马刀","剑","长矛","战斧",
      "指节铜环","双节棍","流星锤","甩棍",
      "弓箭","弩","弹弓","气枪","仿真枪",
      "手雷","地雷","炮弹","子弹",
      // 放射性
      "放射性","X射线","同位素","辐射",
      // 色情成人
      "色情","成人用品","情趣","飞机杯","自慰","性玩具",
      // 毒品
      "毒品","大麻","CBD","海洛因","可卡因","冰毒","迷幻",
      "麻醉","精神药物","致幻","鸦片","吗啡",
      "毒蝇伞","南非醉茄","铺地黍","卡瓦胡椒",
      "四氢大麻酚","THC",
      // 窃听监控
      "隐藏摄像头","针孔摄像","偷拍","窃听器","录音笔伪装",
      "GPS追踪器","定位跟踪","隐蔽安装","间谍设备",
      "开锁工具","万能钥匙","开锁器",
      // 烟草尼古丁
      "香烟","烟草","卷烟","雪茄","电子烟","烟弹","烟油","尼古丁",
      "水烟壶","烟斗","烟嘴","烟丝","烟叶",
      "加热不燃烧","烟草加热",
      // 药品
      "药品","药物","处方药","兽药","动物维生素","兽用疫苗",
      "维生素片","维生素胶囊",
      "COVID-19","新冠","核酸检测",
      // 减肥违禁品
      "Lipotrim","Lishou","燃脂豆","Shafran",
      "Curvy plus","清姿瘦","Fito lida","Al-sheikh",
      "Molecula","SLT SLIM LUX",
      // 活体
      "活体动物","活体植物","活体昆虫",
      "植物种子","根茎","鳞茎","块茎",
      // 安全带
      "安全带适配器","安全带矫正","安全带护垫","安全带三角",
      "安全带插扣","无框儿童座椅",
      // 危险化学品
      "农药","杀虫剂","除草剂","鼠药","杀菌剂",
      "汽油","煤油","柴油","甲醇","丙酮","甲苯","二甲苯",
      "松节油","溶剂油","异丙醇",
      "双氧水","过氧化氢","硫酸","盐酸","硝酸",
      "氢氧化钠","烧碱",
      // 易燃物
      "打火机","火柴","点火液","固体燃料",
      "液态石蜡","壁炉燃料","蜡烛油","灯油",
      "丙烷","丁烷","异丁烷","气瓶","气罐",
      "灭火器","氦气瓶","制冷剂","氟利昂",
      // 电击防身
      "电击器","电击棒","电棍","防狼喷雾","催泪瓦斯","催泪喷雾","辣椒喷雾",
      // 捕猎
      "渔网","电子捕鱼","电鱼器","陷阱","捕兽夹","捕鸟网",
      "电击项圈","超声波驱狗",
      // 二手
      "二手","旧货","翻新","非卖品",
      // 交通标志
      "道路交通标志","车牌","号牌复制",
      // 货币证券
      "货币","纪念币","外币","旅行支票","证券",
      // 身份证件
      "身份证","护照","驾照",
      // 数字商品
      "游戏订阅","电子书","充值卡","激活码","兑换码",
      // 信号干扰
      "信号干扰器","GPS干扰","屏蔽器",
      // 葬礼用品
      "棺材","骨灰盒","寿衣","葬礼","殡葬",
      // 水银
      "水银温度计","水银","汞",
      // 芳香剂
      "芳香剂","嗅盐",
      // 蓄电池
      "蓄电池","铅酸电池","汽车电瓶",
      // 钕磁铁
      "钕磁铁","强力磁铁","探矿磁铁",
      // 特种装备
      "防弹衣","手铐","约束装备",
      // WHD限制
      "入户门","室内门","门框","门套线","门饰板",
      "牙科治疗台",
      "防水材料","瓷砖胶","自流平","腻子",
      "螺旋桩","屋面材料","吊顶型材","壁板","化粪池","玻璃砖",
      "金属型材","钢筋",
      "地毯","强化地板","地板革","踢脚线",
      "双体船",
      "懒人沙发填料",
      "毛皮大衣","羊皮大衣","皮草",
      "轮胎",
      "畜粪","禽粪",
      "水族箱","鱼缸",
      "贵金属硬币",
      // 英文关键词
      "alcohol","tobacco","weapon","knife","jewelry","lighter",
      "pesticide","firework","cannabis","narcotic","adult","erotic",
      "CBD","e-cigarette","vape","hookah","steroid"
    ];

    function isBannedProduct(title) {
      const text = String(title || "").toLowerCase();
      return BANNED_KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
    }

    // ========== 定价引擎（含尾程+提现+贴单费）==========
    function calculateOzonPrice(costCny, weightKg, exchangeRate, targetProfitRate, shippingType, cfg) {
      cfg = cfg || {};
      const commission = cfg.commission ?? 0.17;
      const ozonLogistics = cfg.ozonLogistics ?? 0.08;
      const lastMile = cfg.lastMile ?? 0.05;
      const withdrawal = cfg.withdrawal ?? 0.012;
      const labelFee = cfg.labelFee ?? 2;
      const seaCost = cfg.seaCost ?? 15;
      const airCost = cfg.airCost ?? 35;
      const minProfit = cfg.minProfit ?? 0.28;

      costCny = Number(costCny) || 0;
      weightKg = Number(weightKg) || 0.5;
      exchangeRate = Number(exchangeRate) || 13;

      let profitRate = Number(targetProfitRate) || 0.30;
      if (profitRate < minProfit) profitRate = minProfit;

      const shippingCostPerKg = shippingType === "sea" ? seaCost : airCost;
      const shippingCostCny = weightKg * shippingCostPerKg;
      const totalCostCny = costCny + shippingCostCny + labelFee;
      const totalCostRub = totalCostCny * exchangeRate;
      const divisor = 1 - commission - ozonLogistics - lastMile - withdrawal - profitRate;

      if (divisor <= 0) return null;

      const finalPrice = Math.ceil(totalCostRub / divisor);
      const minPrice = Math.ceil(totalCostRub / (1 - commission - ozonLogistics - lastMile - withdrawal));
      const oldPrice = Math.ceil(finalPrice * 1.3);

      return {
        ok: true, finalPrice, minPrice, oldPrice, costRub: totalCostRub,
        breakdown: { costCny, shippingCostCny, labelFee, totalCostCny, totalCostRub, commission, ozonLogistics, lastMile, withdrawal, profitRate, divisor }
      };
    }

    // ========== 鉴权 ==========
    async function verifyToken(req) {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
      const token = authHeader.slice(7);
      if (!env.KV) return null;
      const userId = await env.KV.get("token:" + token);
      if (!userId) return null;
      const userStr = await env.KV.get("user:" + userId);
      return userStr ? JSON.parse(userStr) : null;
    }

    async function hashPassword(password, salt) {
      const enc = new TextEncoder();
      const hashBuf = await crypto.subtle.digest("SHA-256", enc.encode(password + salt));
      return Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, "0")).join("");
    }

    function generateSalt() {
      return Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b => b.toString(16).padStart(2, "0")).join("");
    }

    function generateToken(len = 64) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const bytes = crypto.getRandomValues(new Uint8Array(len));
      return Array.from(bytes).map(b => chars[b % chars.length]).join("");
    }

    // ========== AI 公共请求 ==========
    async function callAI(messages, model, options) {
      options = options || {};
      try {
        const res = await fetch(`${AI_BASE_URL}/chat/completions`, {
          method: "POST",
          headers: { Authorization: `Bearer ${AI_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: model || AI_TEXT_MODEL, messages,
            temperature: options.temperature ?? 0.7,
            max_tokens: options.max_tokens || 4000,
            ...(options.json_mode && { response_format: { type: "json_object" } })
          })
        });
        const data = await res.json();
        if (!res.ok) return { ok: false, error: data?.error?.message || "AI接口异常" };
        return { ok: true, content: data.choices?.[0]?.message?.content || "" };
      } catch(e) { return { ok: false, error: e.message }; }
    }

    async function callVision(imageUrls, prompt) {
      try {
        const content = [{ type: "text", text: prompt }, ...imageUrls.map(u => ({ type: "image_url", image_url: { url: u, detail: "high" } }))];
        const res = await fetch(`${AI_BASE_URL}/chat/completions`, {
          method: "POST",
          headers: { Authorization: `Bearer ${AI_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({ model: AI_VISION_MODEL, messages: [{ role: "user", content }], max_tokens: 1000 })
        });
        const data = await res.json();
        if (!res.ok) return { ok: false, error: data?.error?.message || "识图失败" };
        return { ok: true, content: data.choices?.[0]?.message?.content || "" };
      } catch(e) { return { ok: false, error: e.message }; }
    }

    async function generateImage(prompt, size) {
      size = size || "1024x1024";
      try {
        const res = await fetch(`${AI_BASE_URL}/images/generations`, {
          method: "POST",
          headers: { Authorization: `Bearer ${AI_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({ model: AI_IMAGE_MODEL, prompt, n: 1, size, response_format: "url" })
        });
        const data = await res.json();
        if (!res.ok) return { ok: false, error: data?.error?.message || "生图失败" };
        return { ok: true, url: data.data?.[0]?.url || data.data?.[0]?.b64_json };
      } catch(e) { return { ok: false, error: e.message }; }
    }

    // ========== JSON清洗 ==========
    function cleanJsonResponse(text) {
      return String(text || "").replace(/^```(json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
    }

    // ========== AI商品文案 ==========
    async function processTitle(chineseTitle) {
      return callAI([{
        role: "system",
        content: "Ozon俄语标题优化：剔除批发/厂家/亚马逊/年份/国内平台词，保留规格材质卖点，俄语≤200字符，仅返回标题文本"
      }, { role: "user", content: `处理标题：${chineseTitle}` }], AI_TEXT_MODEL, { temperature: 0.3 });
    }

    async function generateDescription(productInfo) {
      const prompt = `商品:${productInfo.processedTitle || productInfo.title || ''},SKU:${JSON.stringify(productInfo.skus || [])},重量:${productInfo.weight || ''},尺寸:${JSON.stringify(productInfo.dimensions || {})},风格:${productInfo.styleHint || ''}\n生成150~300俄语详情，突出卖点场景，不提中国工厂，只返回正文`;
      return callAI([{ role: "system", content: "俄文Ozon文案专员" }, { role: "user", content: prompt }], AI_TEXT_MODEL);
    }

    async function fillAttributes(productInfo, attributes) {
      const attrList = attributes.map(a => ({ id: a.id, name: a.name, type: a.type, is_required: a.is_required, values: a.values?.slice(0, 20) || [] }));
      const res = await callAI([{
        role: "system", content: "根据商品信息填充Ozon属性，严格返回指定JSON结构，无多余字符"
      }, {
        role: "user",
        content: `商品信息${JSON.stringify(productInfo)}\n属性列表${JSON.stringify(attrList)}\n输出{"attributes":[{"attribute_id":数字,"values":[{"dictionary_value_id":数字,"value":"字符串"}]}]}`
      }], AI_TEXT_MODEL, { json_mode: true, temperature: 0.2 });
      if (!res.ok) return res;
      try {
        const parse = JSON.parse(cleanJsonResponse(res.content));
        return { ok: true, attributes: parse.attributes || [] };
      } catch(e) { return { ok: false, error: "JSON解析异常" }; }
    }

    async function generateRichContent(productInfo, descRu) {
      const res = await callAI([{
        role: "system", content: "生成Ozon富内容JSON：[{type:heading/paragraph/list,content/items}]，俄语，只输出json"
      }, {
        role: "user", content: `商品${productInfo.processedTitle || productInfo.title || ''},描述${descRu || ''},规格${JSON.stringify(productInfo.skus || [])}`
      }], AI_TEXT_MODEL, { json_mode: true });
      if (!res.ok) return res;
      try { return { ok: true, richContent: JSON.parse(cleanJsonResponse(res.content)) }; }
      catch(e) { return { ok: false }; }
    }

    async function generateTagsFromTitle(title, description) {
      const res = await callAI([{
        role: "system", content: "根据商品标题和描述，生成5-10个Ozon俄语搜索标签，用逗号分隔，只返回标签文字"
      }, { role: "user", content: `标题：${title}\n描述：${description || ''}` }], AI_TEXT_MODEL);
      if (!res.ok) return { ok: false };
      const tags = res.content.split(/[,，、]/).map(t => t.trim()).filter(t => t && t.length < 30 && t.length > 1);
      return { ok: true, tags };
    }

    async function generateImagePrompt(productInfo) {
      const prompt = `产品${productInfo.title || productInfo.processedTitle || ''},风格${productInfo.styleHint || "简约白底电商图"},纯白背景高清产品摄影英文提示词，200字以内`;
      return callAI([{ role: "system", content: "跨境美工提示词工程师" }, { role: "user", content: prompt }], AI_TEXT_MODEL, { max_tokens: 300 });
    }

    async function extractWeightFromImages(imageUrls) {
      const res = await callVision(imageUrls, `提取重量kg、长宽高cm，严格JSON：{"found":bool,"weight_kg":数字,"length_cm":数字,"width_cm":数字,"height_cm":数字}，无数据found:false，只json`);
      if (!res.ok) return { success: false };
      try {
        const json = JSON.parse(cleanJsonResponse(res.content));
        if (json.found && json.weight_kg) return { success: true, weight: json.weight_kg, dimensions: { length: json.length_cm, width: json.width_cm, height: json.height_cm } };
      } catch(e) {}
      return { success: false };
    }

    // ========== Ozon API ==========
    async function callOzonApi(endpoint, body, clientId, apiKey) {
      try {
        const res = await fetch(`https://api-seller.ozon.ru${endpoint}`, {
          method: "POST",
          headers: { "Client-Id": clientId, "Api-Key": apiKey, "Content-Type": "application/json" },
          body: JSON.stringify(body || {})
        });
        const text = await res.text();
        let data = null;
        try { data = text ? JSON.parse(text) : {}; } catch { return { ok: false, msg: "返回非JSON" }; }
        if (!res.ok) return { ok: false, msg: data.message || `HTTP${res.status}`, data };
        return { ok: true, ...data };
      } catch(e) { return { ok: false, msg: e.message }; }
    }

    const getOzonCategoryAttributes = (catId, cId, aKey) =>
      callOzonApi("/v1/description-category/attribute", { description_category_id: catId, language: "RU" }, cId, aKey);

    async function uploadImages(productId, images, cId, aKey) {
      const delays = [3000, 6000, 10000];
      let lastRes = null;
      for (const d of delays) {
        await sleep(d);
        const r = await callOzonApi("/v1/product/pictures/import", { product_id: +productId, images: images.slice(0, 15) }, cId, aKey);
        lastRes = r;
        if (r.ok) {
          const okCnt = (r.result?.pictures || []).filter(p => ["uploaded", "exists"].includes(p.state)).length;
          if (okCnt > 0) return { ok: true, uploadedCount: okCnt };
        }
      }
      return { ok: false, data: lastRes };
    }

    async function setPrice(offerId, price, oldPrice, minPrice, cId, aKey) {
      const priceItem = { offer_id: String(offerId), price: String(price), currency_code: "RUB", auto_action_enabled: "UNKNOWN" };
      if (oldPrice && oldPrice > price) priceItem.old_price = String(oldPrice);
      if (minPrice > 0) priceItem.min_price = String(minPrice);
      const delays = [0, 2000, 5000];
      for (const d of delays) {
        if (d > 0) await sleep(d);
        const r = await callOzonApi("/v1/product/import/prices", { prices: [priceItem] }, cId, aKey);
        if (r.ok) return { ok: true };
      }
      return { ok: false };
    }

    async function pollProductCreation(taskId, cId, aKey) {
      for (let i = 0; i < 20; i++) {
        const delay = i < 5 ? 3000 : Math.min(3000 * Math.pow(1.3, i - 5), 12000);
        await sleep(delay);
        const r = await callOzonApi("/v1/product/import/info", { task_id: taskId }, cId, aKey);
        if (!r.ok) continue;
        const item = r.result?.items?.[0];
        if (!item) continue;
        if (item.product_id && item.product_id !== 0) return { ok: true, productId: item.product_id, offerId: item.offer_id };
        if (item.status === "failed") return { ok: false, errors: item.errors || [] };
      }
      return { ok: false, errors: [{ message: "任务轮询超时" }] };
    }

    // ========== KV任务管理 ==========
    const updateTask = async (taskId, userId, updates) => {
      const key = `ai_task:${userId}:${taskId}`;
      const old = await env.KV.get(key);
      const task = old ? JSON.parse(old) : {};
      await env.KV.put(key, JSON.stringify({ ...task, ...updates, updatedAt: new Date().toISOString() }), { expirationTtl: 86400 * 7 });
    };

    const getTask = async (taskId, userId) => {
      const d = await env.KV.get(`ai_task:${userId}:${taskId}`);
      return d ? JSON.parse(d) : null;
    };

    // ========== 核心上品任务 ==========
    async function processAutoUpload(taskId, userId, product, config, userStores) {
      const log = async (step, status, msg) => await updateTask(taskId, userId, { step, status, message: msg });

      try {
        if (isBannedProduct(product.title)) {
          return await log("ai", "error", "该商品疑似Ozon禁售品，已跳过：" + product.title);
        }

        const targetStores = userStores.filter(s => config.storeIds.includes(s.id));
        if (!targetStores.length) return await log("ai", "error", "未勾选有效店铺");

        // 优先使用前端编辑器预翻译/生成的内容
        let processedTitle = product.processedTitle || product.editorTitleRu || "";
        let descriptionRu = product.editorDescRu || "";
        let richContentJson = product.editorRichContent || "";
        let tags = product.editorTags || "";

        // 如果编辑器没有预生成内容，才调用AI
        if (!processedTitle) {
          await log("ai", "loading", "AI翻译俄语标题");
          const titleRes = await processTitle(product.title);
          processedTitle = titleRes.ok ? titleRes.content.trim() : product.title;
        }

        if (!descriptionRu) {
          await log("ai", "loading", "生成商品俄文详情");
          const descRes = await generateDescription({ ...product, processedTitle, styleHint: config.styleHint });
          descriptionRu = descRes.ok ? descRes.content.trim() : "";
        }

        if (!richContentJson) {
          await log("ai", "loading", "生成Ozon富内容");
          const richRes = await generateRichContent({ ...product, processedTitle }, descriptionRu);
          if (richRes.ok) richContentJson = JSON.stringify(richRes.richContent);
        }

        const categoryId = +config.targetCategory.categoryId;
        const typeId = +config.targetCategory.typeId;

        await log("ai", "loading", "拉取类目属性");
        let attrList = [];
        const attrApiRes = await getOzonCategoryAttributes(categoryId, targetStores[0].clientId, targetStores[0].apiKey);
        if (attrApiRes.ok) attrList = attrApiRes.result || [];

        let filledAttr = [];
        if (attrList.length) {
          await log("ai", "loading", "AI智能填充属性");
          const fillRes = await fillAttributes({ ...product, processedTitle, styleHint: config.styleHint }, attrList);
          if (fillRes.ok) filledAttr = fillRes.attributes;
        }

        let allImgs = [...(product.images || [])];
        if (config.genDalle) {
          await log("image", "loading", "AI生成爆款首图");
          const promptRes = await generateImagePrompt({ ...product, styleHint: config.styleHint });
          if (promptRes.ok) {
            const imgRes = await generateImage(promptRes.content);
            if (imgRes.ok && imgRes.url) allImgs.unshift(imgRes.url);
          }
        }

        await log("upload", "loading", "开始批量创建商品");
        const results = [];

        for (const store of targetStores) {
          try {
            const skuPrices = (product.skus || []).map(s => Number(s.price)).filter(p => p > 0);
            const costCny = skuPrices.length ? Math.min(...skuPrices) : 0;
            const w = Number(product.weight || config.defaultWeight || 0.5);

            const priceCalc = calculateOzonPrice(costCny, w, config.exchangeRate, config.profitRate, config.shippingType);
            let finalPrice, oldPrice, minPrice;
            if (priceCalc) {
              finalPrice = priceCalc.finalPrice;
              oldPrice = priceCalc.oldPrice;
              minPrice = priceCalc.minPrice;
            } else {
              finalPrice = Math.ceil(costCny * (config.exchangeRate || 13) * 3);
              minPrice = Math.ceil(finalPrice * 0.7);
              oldPrice = Math.ceil(finalPrice * 1.3);
            }

            const rand = Math.random().toString(36).slice(-6).toUpperCase();
            const offerId = `AI_${(product.offerId || "").slice(-4)}_${store.id.slice(-4).toUpperCase()}_${rand}`;

            const importBody = {
              items: [{
                description_category_id: categoryId, type_id: typeId,
                name: processedTitle, offer_id: offerId,
                currency_code: "RUB", price: String(finalPrice),
                old_price: String(oldPrice), min_price: String(minPrice),
                vat: "0",
                weight: product.weight ? Math.round(product.weight * 1000) : 500, weight_unit: "g",
                depth: product.dimensions?.length ? Math.round(product.dimensions.length * 10) : 100,
                width: product.dimensions?.width ? Math.round(product.dimensions.width * 10) : 100,
                height: product.dimensions?.height ? Math.round(product.dimensions.height * 10) : 100,
                dimension_unit: "mm",
                images: allImgs.slice(0, 15), description: descriptionRu,
                attributes: filledAttr,
                rich_content_json: richContentJson
              }]
            };

            const createRes = await callOzonApi("/v1/product/import", importBody, store.clientId, store.apiKey);
            if (!createRes.ok) { results.push({ storeId: store.id, storeName: store.name, ok: false, msg: createRes.msg }); continue; }

            const taskIdOzon = createRes.result.task_id;
            const pollRes = await pollProductCreation(taskIdOzon, store.clientId, store.apiKey);
            if (!pollRes.ok) { results.push({ storeId: store.id, storeName: store.name, ok: false, msg: "商品创建失败" }); continue; }

            const pid = pollRes.productId;
            await uploadImages(pid, allImgs, store.clientId, store.apiKey);
            await setPrice(offerId, finalPrice, oldPrice, minPrice, store.clientId, store.apiKey);

            const hKey = `history:${userId}`;
            const hisStr = await env.KV.get(hKey);
            const history = hisStr ? JSON.parse(hisStr) : [];
            history.unshift({
              sku: product.offerId, productId: pid, offerId, storeName: store.name,
              title: processedTitle, price: finalPrice, status: "completed",
              source: "1688", createdAt: new Date().toISOString()
            });
            await env.KV.put(hKey, JSON.stringify(history.slice(0, 200)));
            results.push({ storeId: store.id, storeName: store.name, ok: true, productId: pid, offerId });

          } catch(e) { results.push({ storeId: store.id, storeName: store.name, ok: false, msg: e.message }); }
        }

        const succ = results.filter(r => r.ok).length;
        await updateTask(taskId, userId, { step: "done", status: "done", message: `${succ}/${results.length}店铺上架成功`, results, processedTitle, descriptionRu });

      } catch(e) {
        await updateTask(taskId, userId, { step: "upload", status: "error", message: "全局异常：" + e.message });
      }
    }

    // ========== 路由分发 ==========
    if (path === "/" || path === "") return respond({ code: 0, msg: "超维ERP AI上品 v8.0" });
    if (path === "/health") return respond({ code: 0, msg: "ok", time: new Date().toISOString() });

    // ===== 类目数据接口（Worker代理，解决 GitHub 被墙）=====
    if (path === "/erp/categories" && request.method === "GET") {
      try {
        var cachedCat = await env.KV.get("cache:ozon_categories");
        if (cachedCat) {
          return new Response(cachedCat, {
            status: 200,
            headers: { "Content-Type": "application/json;charset=UTF-8", ...cors }
          });
        }

        var tsvUrls = [
          "https://raw.githubusercontent.com/qq155630/leimu/main/ozon_%E7%9C%9F%E5%AE%9E%E4%BD%A3%E9%87%91_%E5%AE%8C%E6%95%B4%E7%89%88%20-%20%E5%89%AF%E6%9C%AC.TSV",
          "https://cdn.jsdelivr.net/gh/qq155630/leimu@main/ozon_%E7%9C%9F%E5%AE%9E%E4%BD%A3%E9%87%91_%E5%AE%8C%E6%95%B4%E7%89%88%20-%20%E5%89%AF%E6%9C%AC.TSV"
        ];

        var tsvText = null;
        for (var ti = 0; ti < tsvUrls.length; ti++) {
          try {
            var tsvRes = await fetch(tsvUrls[ti], { headers: { "User-Agent": "ChaoWei-ERP/8.0" } });
            if (tsvRes.ok) {
              tsvText = await tsvRes.text();
              if (tsvText && tsvText.length > 100) break;
            }
          } catch(te) { console.warn("TSV源" + ti + "失败:", te.message); }
          tsvText = null;
        }

        if (!tsvText) { return respond({ code: 500, msg: "所有类目数据源均失败" }, 500); }

        var catLines = tsvText.split(/\r?\n/).filter(Boolean);
        catLines.shift();

        var catTree = {};
        var catFlatList = [];

        catLines.forEach(function(line) {
          var cols = line.split("\t");
          if (cols.length < 5) return;
          var c1 = (cols[0] || "").trim();
          var c2 = (cols[1] || "").trim();
          var c3 = (cols[2] || "").trim();
          var catId = (cols[3] || "").trim();
          var typeId = (cols[4] || "").trim();
          if (!c1 || !catId || !typeId) return;

          if (!catTree[c1]) catTree[c1] = {};
          if (!catTree[c1][c2]) catTree[c1][c2] = [];

          var catName = c3 || c2;
          var catItem = { name: catName, c1: c1, c2: c2, c3: c3, categoryId: catId, typeId: typeId };
          catTree[c1][c2].push(catItem);
          catFlatList.push(catItem);
        });

        if (catFlatList.length === 0) { return respond({ code: 500, msg: "TSV解析后无数据" }, 500); }

        var catResult = JSON.stringify({
          code: 0,
          data: { tree: catTree, flatList: catFlatList, count: catFlatList.length }
        });

        await env.KV.put("cache:ozon_categories", catResult, { expirationTtl: 86400 });

        return new Response(catResult, {
          status: 200,
          headers: { "Content-Type": "application/json;charset=UTF-8", ...cors }
        });

      } catch(e) { return respond({ code: 500, msg: "类目接口异常: " + e.message }, 500); }
    }

    if (path === "/erp/categories/refresh" && request.method === "POST") {
      var catUser = await verifyToken(request);
      if (!catUser || catUser.role !== "admin") return respond({ code: 403, msg: "无权限" }, 403);
      await env.KV.delete("cache:ozon_categories");
      return respond({ code: 0, msg: "缓存已清除，下次加载将重新拉取" });
    }

    // 注册
    if (path === "/auth/register" && request.method === "POST") {
      try {
        if (!env.KV) return respond({ code: 500, msg: "未绑定KV" }, 500);
        const body = await request.json();
        if (!body.username || !body.password) return respond({ code: 400, msg: "账号密码必填" }, 400);
        if (body.password.length < 6) return respond({ code: 400, msg: "密码至少6位" }, 400);
        const invCode = await env.KV.get("config:inviteCode");
        if (invCode && body.inviteCode !== invCode) return respond({ code: 400, msg: "邀请码错误" }, 400);
        if (await env.KV.get(`username:${body.username}`)) return respond({ code: 400, msg: "用户名已存在" }, 400);
        const userCnt = await env.KV.get("config:userCount") || "0";
        const isAdmin = userCnt === "0";
        const uid = "user_" + Date.now().toString(36);
        const salt = generateSalt();
        const user = {
          id: uid, username: body.username,
          password: await hashPassword(body.password, salt), salt,
          role: isAdmin ? "admin" : "user", stores: [], watermarks: [],
          createdAt: new Date().toISOString()
        };
        await env.KV.put(`user:${uid}`, JSON.stringify(user));
        await env.KV.put(`username:${body.username}`, uid);
        await env.KV.put("config:userCount", String(+userCnt + 1));
        return respond({ code: 0, msg: isAdmin ? "注册成功(管理员)" : "注册成功", data: { id: uid, username: user.username, role: user.role } });
      } catch(e) { return respond({ code: 500, msg: e.message }, 500); }
    }

    // 登录
    if (path === "/auth/login" && request.method === "POST") {
      try {
        const body = await request.json();
        const uid = await env.KV.get(`username:${body.username}`);
        if (!uid) return respond({ code: 401, msg: "账号密码错误" }, 401);
        const userJson = await env.KV.get(`user:${uid}`);
        const user = JSON.parse(userJson);
        const salt = user.salt || "ozon_erp_salt_2024";
        if (user.password !== await hashPassword(body.password, salt)) return respond({ code: 401, msg: "账号密码错误" }, 401);
        const tk = generateToken();
        await env.KV.put(`token:${tk}`, uid, { expirationTtl: 86400 * 30 });
        return respond({
          code: 0, msg: "登录成功",
          data: { token: tk, user: { id: user.id, username: user.username, role: user.role, storeCount: (user.stores || []).length } }
        });
      } catch(e) { return respond({ code: 500, msg: e.message }, 500); }
    }

    if (path === "/auth/me" && request.method === "GET") {
      const user = await verifyToken(request);
      if (!user) return respond({ code: 401, msg: "未登录" }, 401);
      return respond({ code: 0, data: { id: user.id, username: user.username, role: user.role, storeCount: (user.stores || []).length, createdAt: user.createdAt } });
    }

    // 店铺管理
    if (path === "/user/stores" && request.method === "GET") {
      const user = await verifyToken(request);
      if (!user) return respond({ code: 401, msg: "未登录" }, 401);
      return respond({ code: 0, data: (user.stores || []).map(s => ({ id: s.id, name: s.name, clientId: s.clientId, hasApiKey: !!s.apiKey, createdAt: s.createdAt })) });
    }

    if (path === "/user/stores/save" && request.method === "POST") {
      const user = await verifyToken(request);
      if (!user) return respond({ code: 401, msg: "未登录" }, 401);
      const body = await request.json();
      const stores = user.stores || [];
      if (body.id) {
        const idx = stores.findIndex(i => i.id === body.id);
        if (idx === -1) return respond({ code: 404, msg: "店铺不存在" }, 404);
        stores[idx] = { ...stores[idx], name: body.name, clientId: body.clientId, apiKey: body.apiKey === "KEEP" ? stores[idx].apiKey : body.apiKey, updatedAt: new Date().toISOString() };
      } else {
        if (stores.length >= 15) return respond({ code: 400, msg: "最多15个店铺" }, 400);
        if (!body.apiKey) return respond({ code: 400, msg: "ApiKey不能为空" }, 400);
        stores.push({ id: "store_" + Date.now().toString(36), name: body.name, clientId: body.clientId, apiKey: body.apiKey, createdAt: new Date().toISOString() });
      }
      await env.KV.put(`user:${user.id}`, JSON.stringify({ ...user, stores }));
      return respond({ code: 0, msg: "保存成功" });
    }

    if (path === "/user/stores/delete" && request.method === "POST") {
      const user = await verifyToken(request);
      if (!user) return respond({ code: 401, msg: "未登录" }, 401);
      const { id } = await request.json();
      const stores = (user.stores || []).filter(s => s.id !== id);
      await env.KV.put(`user:${user.id}`, JSON.stringify({ ...user, stores }));
      return respond({ code: 0, msg: "删除成功" });
    }

    if (path === "/user/update-password" && request.method === "POST") {
      const user = await verifyToken(request);
      if (!user) return respond({ code: 401, msg: "未登录" }, 401);
      const { oldPassword, newPassword } = await request.json();
      if (!newPassword || newPassword.length < 6) return respond({ code: 400, msg: "新密码至少6位" }, 400);
      const salt = user.salt || "ozon_erp_salt_2024";
      if (user.password !== await hashPassword(oldPassword, salt)) return respond({ code: 400, msg: "原密码错误" }, 400);
      const newSalt = generateSalt();
      await env.KV.put(`user:${user.id}`, JSON.stringify({ ...user, password: await hashPassword(newPassword, newSalt), salt: newSalt }));
      return respond({ code: 0, msg: "密码修改成功" });
    }

    if (path === "/user/watermark" && request.method === "GET") {
      const u = await verifyToken(request);
      if (!u) return respond({ code: 401, msg: "未登录" }, 401);
      return respond({ code: 0, data: { watermarks: u.watermarks || [] } });
    }

    if (path === "/user/update-watermark" && request.method === "POST") {
      const u = await verifyToken(request);
      if (!u) return respond({ code: 401, msg: "未登录" }, 401);
      const { watermarks } = await request.json();
      await env.KV.put(`user:${u.id}`, JSON.stringify({ ...u, watermarks: watermarks || [] }));
      return respond({ code: 0, msg: "水印保存成功" });
    }

    if (path === "/user/list" && request.method === "GET") {
      const u = await verifyToken(request);
      if (!u || u.role !== "admin") return respond({ code: 403, msg: "无权限" }, 403);
      const userList = [];
      const { keys } = await env.KV.list({ prefix: "user:" });
      for (const k of keys) {
        const json = await env.KV.get(k.name);
        if (json) {
          const us = JSON.parse(json);
          userList.push({ id: us.id, username: us.username, role: us.role, storeCount: (us.stores || []).length, createdAt: us.createdAt });
        }
      }
      return respond({ code: 0, data: userList });
    }

    if (path === "/user/set-role" && request.method === "POST") {
      const u = await verifyToken(request);
      if (!u || u.role !== "admin") return respond({ code: 403, msg: "无权限" }, 403);
      const { userId, role } = await request.json();
      if (!["admin", "user"].includes(role)) return respond({ code: 400, msg: "角色无效" }, 400);
      const raw = await env.KV.get(`user:${userId}`);
      if (!raw) return respond({ code: 404, msg: "用户不存在" }, 404);
      const target = JSON.parse(raw);
      await env.KV.put(`user:${userId}`, JSON.stringify({ ...target, role }));
      return respond({ code: 0, msg: "角色修改成功" });
    }

    if (path === "/user/delete" && request.method === "POST") {
      const u = await verifyToken(request);
      if (!u || u.role !== "admin") return respond({ code: 403, msg: "无权限" }, 403);
      const { userId } = await request.json();
      if (userId === u.id) return respond({ code: 400, msg: "不能删除自己" }, 400);
      const raw = await env.KV.get(`user:${userId}`);
      if (!raw) return respond({ code: 404, msg: "用户不存在" }, 404);
      const delUser = JSON.parse(raw);
      await env.KV.delete(`user:${userId}`);
      await env.KV.delete(`username:${delUser.username}`);
      return respond({ code: 0, msg: "删除成功" });
    }

    if (path === "/admin/set-invite-code" && request.method === "POST") {
      const u = await verifyToken(request);
      if (!u || u.role !== "admin") return respond({ code: 403, msg: "无权限" }, 403);
      const { inviteCode } = await request.json();
      await env.KV.put("config:inviteCode", inviteCode || "");
      return respond({ code: 0, msg: "邀请码配置成功" });
    }

    if (path === "/erp/history" && request.method === "GET") {
      const u = await verifyToken(request);
      if (!u) return respond({ code: 401, msg: "未登录" }, 401);
      const his = await env.KV.get(`history:${u.id}`);
      return respond({ code: 0, data: his ? JSON.parse(his) : [] });
    }

    if (path === "/erp/store-warehouses" && request.method === "POST") {
      const u = await verifyToken(request);
      if (!u) return respond({ code: 401, msg: "未登录" }, 401);
      const { storeId } = await request.json();
      const store = (u.stores || []).find(s => s.id === storeId);
      if (!store) return respond({ code: 404, msg: "店铺不存在" }, 404);
      const res = await callOzonApi("/v2/warehouse/list", { limit: 200 }, store.clientId, store.apiKey);
      const whs = (res.warehouses || []).map(w => ({ warehouse_id: w.warehouse_id, name: w.name, type: w.is_rfbs ? "rFBS" : "FBS" }));
      return respond({ code: 0, data: whs });
    }

    if (path === "/ai/extract-weight" && request.method === "POST") {
      const u = await verifyToken(request);
      if (!u) return respond({ code: 401, msg: "未登录" }, 401);
      const { images } = await request.json();
      const res = await extractWeightFromImages(images || []);
      return respond({ code: 0, data: res });
    }

    // ===== 新增接口：翻译标题 =====
    if (path === "/ai/translate-title" && request.method === "POST") {
      const u = await verifyToken(request);
      if (!u) return respond({ code: 401, msg: "未登录" }, 401);
      const { title } = await request.json();
      if (!title) return respond({ code: 400, msg: "标题不能为空" }, 400);
      const res = await processTitle(title);
      if (res.ok) {
        return respond({ code: 0, data: { translation: res.content.trim() } });
      }
      return respond({ code: 500, msg: res.error }, 500);
    }

    // ===== 新增接口：翻译文本（通用）=====
    if (path === "/ai/translate-text" && request.method === "POST") {
      const u = await verifyToken(request);
      if (!u) return respond({ code: 401, msg: "未登录" }, 401);
      const { text, targetLang } = await request.json();
      if (!text) return respond({ code: 400, msg: "文本不能为空" }, 400);
      const langMap = { "ru": "俄语", "en": "英语" };
      const lang = langMap[targetLang || "ru"] || "俄语";
      const res = await callAI([{
        role: "system",
        content: `你是一个专业翻译官。将文本翻译成${lang}，保持原意，只返回翻译结果`
      }, { role: "user", content: `翻译：${text}` }], AI_TEXT_MODEL);
      if (res.ok) {
        return respond({ code: 0, data: { translation: res.content.trim() } });
      }
      return respond({ code: 500, msg: res.error }, 500);
    }

    // ===== 新增接口：AI改造单张图片 =====
    if (path === "/ai/enhance-image" && request.method === "POST") {
      const u = await verifyToken(request);
      if (!u) return respond({ code: 401, msg: "未登录" }, 401);
      const { imageUrl, styleHint } = await request.json();
      if (!imageUrl) return respond({ code: 400, msg: "图片URL不能为空" }, 400);

      try {
        // 用 Vision 分析原图
        const visionRes = await callVision([imageUrl], "描述这个商品的特点：材质、颜色、款式、用途，英文描述");
        const productDesc = visionRes.ok ? visionRes.content : "product photo";

        // 生成英文绘图提示词
        const promptRes = await callAI([{
          role: "system",
          content: "你是电商美工。根据商品描述生成英文AI绘图提示词，要求：纯白背景，高清产品摄影，专业电商风格，俄罗斯市场爆款风格，简洁现代"
        }, { role: "user", content: `商品：${productDesc}，风格：${styleHint || "现代简约、俄罗斯市场爆款风格"}` }], AI_TEXT_MODEL, { max_tokens: 200 });

        const prompt = promptRes.ok ? promptRes.content.trim() : `Professional product photography, white background, Russian e-commerce style, high quality`;

        // 生成新图
        const imgRes = await generateImage(prompt);
        if (imgRes.ok && imgRes.url) {
          return respond({ code: 0, data: { url: imgRes.url } });
        }
        return respond({ code: 500, msg: imgRes.error || "生图失败" }, 500);
      } catch(e) {
        return respond({ code: 500, msg: e.message }, 500);
      }
    }

    // ===== 新增接口：翻译图片（重新生成带俄文的相似图）=====
    if (path === "/ai/translate-image" && request.method === "POST") {
      const u = await verifyToken(request);
      if (!u) return respond({ code: 401, msg: "未登录" }, 401);
      const { imageUrl, styleHint } = await request.json();
      if (!imageUrl) return respond({ code: 400, msg: "图片URL不能为空" }, 400);

      try {
        // 识别原图中的文字和商品主体
        const visionRes = await callVision([imageUrl], "识别图片中的所有文字内容，并描述商品外观特征");
        const visionText = visionRes.ok ? visionRes.content : "";

        // 生成俄文提示词（保留商品主体，换背景/风格，加俄文元素）
        const promptRes = await callAI([{
          role: "system",
          content: "你是一个电商美工。将商品图改造成俄语市场的爆款图，保留商品主体，更换为俄语市场风格的背景和装饰，可以添加俄语文字，价格标签用卢布写法（如：199₽），整体专业电商风格"
        }, { role: "user", content: `原图描述：${visionText}\n风格要求：${styleHint || "俄罗斯电商爆款风格，简约专业"}` }], AI_TEXT_MODEL, { max_tokens: 250 });

        const prompt = promptRes.ok ? promptRes.content.trim() : `Product photo, Russian e-commerce style, professional white background, price tag in rubles, clean modern aesthetic`;

        const imgRes = await generateImage(prompt);
        if (imgRes.ok && imgRes.url) {
          return respond({ code: 0, data: { url: imgRes.url } });
        }
        return respond({ code: 500, msg: imgRes.error || "翻译图片失败" }, 500);
      } catch(e) {
        return respond({ code: 500, msg: e.message }, 500);
      }
    }

    // ===== 新增接口：生成俄文简介 =====
    if (path === "/ai/generate-desc" && request.method === "POST") {
      const u = await verifyToken(request);
      if (!u) return respond({ code: 401, msg: "未登录" }, 401);
      const { product } = await request.json();
      const res = await generateDescription({
        processedTitle: product?.title || product?.processedTitle || "",
        styleHint: product?.styleHint || "",
        weight: product?.weight,
        dimensions: product?.dimensions
      });
      if (res.ok) {
        return respond({ code: 0, data: { description: res.content.trim() } });
      }
      return respond({ code: 500, msg: res.error }, 500);
    }

    // ===== 新增接口：生成富内容 =====
    if (path === "/ai/generate-rich" && request.method === "POST") {
      const u = await verifyToken(request);
      if (!u) return respond({ code: 401, msg: "未登录" }, 401);
      const { product, description } = await request.json();
      const res = await generateRichContent({ processedTitle: product?.title || product?.processedTitle || "" }, description || "");
      if (res.ok) {
        return respond({ code: 0, data: { richContent: res.richContent } });
      }
      return respond({ code: 500, msg: "生成失败" }, 500);
    }

    // ===== 新增接口：生成标签 =====
    if (path === "/ai/generate-tags" && request.method === "POST") {
      const u = await verifyToken(request);
      if (!u) return respond({ code: 401, msg: "未登录" }, 401);
      const { product, description } = await request.json();
      const title = product?.title || product?.processedTitle || "";
      const res = await generateTagsFromTitle(title, description || "");
      if (res.ok) {
        return respond({ code: 0, data: { tags: res.tags } });
      }
      return respond({ code: 500, msg: res.error || "生成失败" }, 500);
    }

    // 提交上品任务
    if (path === "/ai/auto-upload" && request.method === "POST") {
      const u = await verifyToken(request);
      if (!u) return respond({ code: 401, msg: "未登录" }, 401);
      const { product, config } = await request.json();
      if (!product || !config || !config.storeIds?.length) return respond({ code: 400, msg: "参数不全" }, 400);
      if (!config.targetCategory?.categoryId || !config.targetCategory?.typeId) return respond({ code: 400, msg: "缺少类目信息" }, 400);
      const taskId = "task_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6);
      await updateTask(taskId, u.id, { taskId, userId: u.id, step: "ai", status: "loading", message: "任务初始化", createdAt: new Date().toISOString() });
      ctx.waitUntil(processAutoUpload(taskId, u.id, product, config, u.stores || []).catch(e => console.error("TaskErr:", e.message)));
      return respond({ code: 0, msg: "任务已创建", data: { taskId } });
    }

    // 查询任务进度
    if (path.startsWith("/ai/task-progress/")) {
      const u = await verifyToken(request);
      if (!u) return respond({ code: 401, msg: "未登录" }, 401);
      const tid = path.replace("/ai/task-progress/", "");
      const task = await getTask(tid, u.id);
      return task ? respond({ code: 0, data: task }) : respond({ code: 404, msg: "任务不存在" }, 404);
    }

    return respond({ code: 404, msg: "接口不存在" }, 404);
  }
};
