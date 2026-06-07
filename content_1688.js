console.log("✅ [1688] 超维ERP AI上品 v8.1.2 已加载");

if (document.documentElement.dataset.chaoweiErp1688 === "1") {
  console.log("⚠️ [1688] 已初始化");
} else {
  document.documentElement.dataset.chaoweiErp1688 = "1";
  init1688();
}

function init1688() {
  var PANEL_MIN_KEY = "chaowei_1688_panel_minimized";
  var API_BASE = "https://api.ozonerp.chaowei.online";

  // ===== 物流费率表（CNY）=====
  var SHIPPING_DB = {
    'Extra Small': { channels: { '陆运': {'ATC':{fee:2.60,perG:0.0240},'GUOO':{fee:3.00,perG:0.0260},'ZTO':{fee:3.12,perG:0.0260},'Tanais':{fee:3.10,perG:0.0259},'Ural':{fee:3.12,perG:0.0260},'RETS':{fee:3.12,perG:0.0260},'OYX':{fee:3.12,perG:0.0260},'ABT':{fee:3.12,perG:0.0260},'Xingyuan':{fee:3.12,perG:0.0260},'CEL':{fee:3.12,perG:0.0260}}, '陆空联运': {'ATC':{fee:2.60,perG:0.0350},'Ural':{fee:2.92,perG:0.0364},'ZTO':{fee:3.12,perG:0.0364},'GUOO':{fee:3.12,perG:0.0364},'CEL':{fee:3.12,perG:0.0364},'RETS':{fee:3.12,perG:0.0364},'OYX':{fee:3.12,perG:0.0364},'ABT':{fee:3.12,perG:0.0364},'Xingyuan':{fee:3.12,perG:0.0364},'Tanais':{fee:3.10,perG:0.0364}}, '空运': {'ATC':{fee:3.00,perG:0.0450},'RETS':{fee:3.12,perG:0.0468},'ZTO':{fee:3.12,perG:0.0468},'Ural':{fee:3.12,perG:0.0468},'GUOO':{fee:3.12,perG:0.0468},'CEL':{fee:3.12,perG:0.0468}} } },
    'Small': { channels: { '陆运': {'GBS':{fee:15.20,perG:0.02375},'ATC':{fee:16.00,perG:0.0238},'Tanais':{fee:16.60,perG:0.0259},'ZTO':{fee:16.64,perG:0.0260},'Ural':{fee:16.64,perG:0.0260},'RETS':{fee:16.64,perG:0.0260},'CEL':{fee:16.64,perG:0.0260},'GUOO':{fee:16.64,perG:0.0260},'OYX':{fee:16.64,perG:0.0260},'ABT':{fee:16.64,perG:0.0260},'Xingyuan':{fee:16.64,perG:0.0260}}, '陆空联运': {'GBS':{fee:15.20,perG:0.0340},'ATC':{fee:16.00,perG:0.0330},'Tanais':{fee:16.60,perG:0.0364},'ZTO':{fee:16.64,perG:0.0364},'Ural':{fee:16.64,perG:0.0364},'RETS':{fee:16.64,perG:0.0364},'CEL':{fee:16.64,perG:0.0364},'GUOO':{fee:16.64,perG:0.0364},'OYX':{fee:16.64,perG:0.0364},'ABT':{fee:16.64,perG:0.0364},'Xingyuan':{fee:16.64,perG:0.0364}}, '空运': {'GBS':{fee:16.00,perG:0.04275},'ATC':{fee:16.00,perG:0.0450},'ZTO':{fee:16.64,perG:0.0468},'Ural':{fee:16.64,perG:0.0468},'RETS':{fee:16.64,perG:0.0468},'GUOO':{fee:16.64,perG:0.0468},'CEL':{fee:16.64,perG:0.0468}} } },
    'Big': { channels: { '陆运': {'ATC':{fee:36.00,perG:0.01700},'Tanais':{fee:37.40,perG:0.01760},'CEL':{fee:37.44,perG:0.01768},'Xingyuan':{fee:37.44,perG:0.01768},'ABT':{fee:37.44,perG:0.01768},'OYX':{fee:37.44,perG:0.01768},'GUOO':{fee:37.44,perG:0.01768}}, '陆空联运': {'ATC':{fee:36.00,perG:0.0250},'Tanais':{fee:37.40,perG:0.0259},'ZTO':{fee:37.44,perG:0.0260},'Ural':{fee:37.44,perG:0.0260},'RETS':{fee:37.44,perG:0.0260},'CEL':{fee:37.44,perG:0.0260},'GUOO':{fee:37.44,perG:0.0260},'OYX':{fee:37.44,perG:0.0260},'ABT':{fee:37.44,perG:0.0260},'Xingyuan':{fee:37.44,perG:0.0260}}, '空运': {'Ural':{fee:37.44,perG:0.03432}} } },
    'Budget': { channels: { '陆运': {'GBS':{fee:22.40,perG:0.01700},'ATC':{fee:23.00,perG:0.01700},'Tanais':{fee:23.90,perG:0.01760},'ZTO':{fee:23.92,perG:0.01768},'RETS':{fee:23.92,perG:0.01768},'CEL':{fee:23.92,perG:0.01768},'GUOO':{fee:23.92,perG:0.01768},'Xingyuan':{fee:23.92,perG:0.01768},'ABT':{fee:23.92,perG:0.01768},'OYX':{fee:23.92,perG:0.01768}}, '陆空联运': {'GBS':{fee:21.85,perG:0.0250},'ATC':{fee:23.00,perG:0.0250},'Tanais':{fee:23.90,perG:0.0259},'ZTO':{fee:23.92,perG:0.0260},'Ural':{fee:23.92,perG:0.0260},'RETS':{fee:23.92,perG:0.0260},'CEL':{fee:23.92,perG:0.0260},'GUOO':{fee:23.92,perG:0.0260},'OYX':{fee:23.92,perG:0.0260},'ABT':{fee:23.92,perG:0.0260},'Xingyuan':{fee:23.92,perG:0.0260}}, '空运': {'GBS':{fee:21.85,perG:0.03300},'ZTO':{fee:23.92,perG:0.03432},'Ural':{fee:23.92,perG:0.03432},'CEL':{fee:23.92,perG:0.03432}} } },
    'Premium Small': { channels: { '陆运': {'GBS':{fee:21.00,perG:0.02375},'ATC':{fee:21.50,perG:0.0240},'ZTO':{fee:22.88,perG:0.0260},'Ural':{fee:22.88,perG:0.0260},'RETS':{fee:22.88,perG:0.0260},'OYX':{fee:22.88,perG:0.0260},'ABT':{fee:22.88,perG:0.0260},'Xingyuan':{fee:22.88,perG:0.0260},'CEL':{fee:22.88,perG:0.0260},'GUOO':{fee:22.88,perG:0.0260}}, '陆空联运': {'GBS':{fee:21.00,perG:0.0340},'ATC':{fee:21.00,perG:0.0340},'RETS':{fee:22.88,perG:0.0364},'ZTO':{fee:22.88,perG:0.0364},'Ural':{fee:22.88,perG:0.0364},'OYX':{fee:22.88,perG:0.0364},'ABT':{fee:22.88,perG:0.0364},'Xingyuan':{fee:22.88,perG:0.0364},'CEL':{fee:22.88,perG:0.0364},'GUOO':{fee:22.88,perG:0.0364}}, '空运': {'GBS':{fee:22.00,perG:0.04275},'ATC':{fee:22.00,perG:0.0450},'ZTO':{fee:22.88,perG:0.0468},'Ural':{fee:22.88,perG:0.0468},'RETS':{fee:22.88,perG:0.0468},'GUOO':{fee:22.88,perG:0.0468},'CEL':{fee:22.88,perG:0.0468}} } },
    'Premium Big': { channels: { '陆运': {'ATC':{fee:62.00,perG:0.02200},'ZTO':{fee:64.48,perG:0.02392},'RETS':{fee:64.48,perG:0.02392},'GUOO':{fee:64.48,perG:0.02392},'Xingyuan':{fee:64.48,perG:0.02392},'ABT':{fee:64.48,perG:0.02392},'OYX':{fee:64.48,perG:0.02392},'CEL':{fee:64.48,perG:0.02392}}, '陆空联运': {'ATC':{fee:62.00,perG:0.02700},'ZTO':{fee:64.48,perG:0.02912},'Ural':{fee:64.48,perG:0.02912},'CEL':{fee:64.48,perG:0.02912},'ABT':{fee:64.48,perG:0.02912},'OYX':{fee:64.48,perG:0.02912},'Xingyuan':{fee:64.48,perG:0.02912},'GUOO':{fee:64.48,perG:0.02912}}, '空运': {'Ural':{fee:64.48,perG:0.03432}} } }
  };

  // ===== 档位+计费函数 =====
  function getShippingTier(p,w){if(w>30000)return null;if(p<=135){if(w<=500)return'Extra Small';return'Budget';}if(p<=635){if(w<=2000)return'Small';return'Big';}if(w<=5000)return'Premium Small';return'Premium Big';}
  function getVolumeWeight(l,w,h){if(!l||!w||!h)return 0;return(l*w*h)/12000*1000;}
  function getBillWeight(wG,l,w,h,t){if(t==='Big'||t==='Premium Big')return Math.max(wG||0,getVolumeWeight(l,w,h));return wG||0;}
  var TIER_SIZE_LIMITS={'Extra Small':{sumMax:90,longestMax:60},'Budget':{sumMax:150,longestMax:60},'Small':{sumMax:150,longestMax:60},'Big':{sumMax:310,longestMax:150},'Premium Small':{sumMax:250,longestMax:60},'Premium Big':{sumMax:310,longestMax:150,maxBox:[150,80,80]}};
  function checkSizeLimit(t,l,w,h){var lm=TIER_SIZE_LIMITS[t];if(!lm||!l||!w||!h)return{ok:true};if(l+w+h>lm.sumMax)return{ok:false,reason:t+' 三边和超限'};if(Math.max(l,w,h)>lm.longestMax)return{ok:false,reason:t+' 最长边超限'};if(lm.maxBox){var s=[l,w,h].sort(function(a,b){return b-a;});var m=lm.maxBox.sort(function(a,b){return b-a;});for(var i=0;i<3;i++){if(s[i]>m[i])return{ok:false,reason:'Premium Big超出150×80×80'};}}return{ok:true};}
  function checkWeightLimit(t,wG,l,w,h){if(wG>30000)return{ok:false,reason:'超30kg'};if(t==='Big'&&getBillWeight(wG,l,w,h,t)>31000)return{ok:false,reason:'Big计费重超31kg'};if(t==='Premium Big'&&getBillWeight(wG,l,w,h,t)>80000)return{ok:false,reason:'Premium Big计费重超80kg'};return{ok:true};}
  function getCarrierList(p,wG,ch,dims){var t=getShippingTier(p,wG);if(!t)return[];var td=SHIPPING_DB[t];if(!td)return[];var cm={'air':'空运','land':'陆运','air_land':'陆空联运'};var cn=cm[ch]||'陆运';var cs=td.channels[cn];if(!cs)return[];var l=(dims&&dims.length)||0,w=(dims&&dims.width)||0,h=(dims&&dims.height)||0;var bw=getBillWeight(wG,l,w,h,t);var list=[];for(var n in cs){var c=cs[n];list.push({name:n,fee:Math.round((c.fee+bw*c.perG)*100)/100});}list.sort(function(a,b){return a.fee-b.fee;});return list;}
  function getCarrierFee(p,wG,ch,cn,dims){var t=getShippingTier(p,wG);if(!t)return 0;var td=SHIPPING_DB[t];if(!td)return 0;var cm2={'air':'空运','land':'陆运','air_land':'陆空联运'};var chn=cm2[ch]||'陆运';var cs=td.channels[chn];if(!cs||!cs[cn])return 0;var l=(dims&&dims.length)||0,w=(dims&&dims.width)||0,h=(dims&&dims.height)||0;var bw=getBillWeight(wG,l,w,h,t);var c=cs[cn];return Math.round((c.fee+bw*c.perG)*100)/100;}
  function calculatePrice(cost,wG,pr,st,cn,dims){pr=pr||0.25;if(pr<0.15)pr=0.15;var com=0.17,lf=2,rr=0.02,wf=0.012,tr=0.05;var fc=cost+lf;var price=fc*2,sf=0,tier='';for(var i=0;i<5;i++){tier=getShippingTier(price,wG);if(!tier)return{error:'超30kg'};if(cn){sf=getCarrierFee(price,wG,st,cn,dims);}else{var first=getCarrierList(price,wG,st,dims)[0];sf=first?first.fee:0;}var div=1-com-rr-wf-tr-pr;if(div<=0)return null;var np=Math.ceil((fc+sf)/div);if(Math.abs(np-price)<=1){price=np;break;}price=np;}if(dims){var sc=checkSizeLimit(tier,dims.length,dims.width,dims.height);if(!sc.ok)return{error:sc.reason};var wc=checkWeightLimit(tier,wG,dims.length,dims.width,dims.height);if(!wc.ok)return{error:wc.reason};}return{price:price,shippingFee:sf,shippingTier:tier,commission:com};}

  // ===== 工具函数 =====
  function escapeHtml(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
  function getOfferId(){var m=location.href.match(/offer\/(\d+)/);return m?m[1]:null;}
  function sleep(ms){return new Promise(function(r){setTimeout(r,ms);});}

  // ===== 检测页面版本 =====
  function detectPageVersion(){
    if(document.querySelectorAll(".sku-filter-button").length>0) return "new_button";
    if(document.querySelectorAll(".expand-view-item").length>0) return "old_table";
    return "unknown";
  }

      // ===== 抓取所有SKU（含SKU专属图片）=====
  function scrapeAllSkus(){
    var version=detectPageVersion();
    var skus=[];
    
    // 🔧 URL清理：把缩略图URL转为大图
    function cleanSkuImage(url){
      if(!url) return "";
      return url
        .replace(/\.jpg_sum\.jpg$/i, ".jpg")
        .replace(/\.jpg_\d+x\d+\.jpg.*$/i, ".jpg")
        .replace(/_sum\.jpg$/i, ".jpg")
        .replace(/_\d+x\d+\./gi, ".")
        .replace(/\.webp$/i, "");
    }
    
    if(version==="old_table"){
      document.querySelectorAll(".expand-view-item").forEach(function(item,idx){
        var label=item.querySelector(".item-label");
        var img=item.querySelector("img");
        var text=item.textContent||"";
        var pm=text.match(/¥\s*(\d+\.?\d*)/);
        var sm=text.match(/库存\s*(\d+)/);
        var imgSrc = img ? cleanSkuImage(img.src || "") : "";
        skus.push({
          index: idx,
          name: (label ? label.textContent.trim() : "SKU" + idx),
          price: pm ? parseFloat(pm[1]) : 0,
          stock: sm ? parseInt(sm[1]) : 0,
          image: imgSrc,
          skuId: "",
          element: item,
          version: "old_table"
        });
      });
    }else if(version==="new_button"){
      document.querySelectorAll(".sku-filter-button").forEach(function(btn,idx){
        var img=btn.querySelector("img");
        var imgSrc = img ? cleanSkuImage(img.src || "") : "";
        skus.push({
          index: idx,
          name: btn.textContent.trim(),
          price: 0,
          stock: 0,
          image: imgSrc,
          skuId: "",
          element: btn,
          version: "new_button"
        });
      });
    }
    
    // 从 window.context 补充 skuId 和价格
    try {
      var ctxStr = JSON.stringify(window.context);
      var skuInfos = [];
      var skuRegex = /\{[^{}]*"skuId"\s*:\s*(\d+)[^{}]*"sku1"\s*:\s*"([^"]*)"[^{}]*\}/g;
      var m;
      while ((m = skuRegex.exec(ctxStr)) !== null) {
        try {
          var obj = JSON.parse(m[0]);
          if (obj.skuId && obj.sku1) {
            skuInfos.push({
              skuId: obj.skuId,
              sku1: obj.sku1,
              price: obj.price || obj.discountPrice || 0,
              image: cleanSkuImage(obj.imageUrl || obj.image || "")
            });
          }
        } catch(e) {}
      }
      
      skus.forEach(function(sku){
        var found = skuInfos.find(function(s){ return s.sku1 === sku.name; });
        if (found) {
          sku.skuId = found.skuId;
          if (!sku.price && found.price) sku.price = found.price;
          if (!sku.image && found.image) sku.image = found.image;
        }
      });
      
      console.log("📦 [SKU] 抓到", skus.length, "个 | 含图片:", skus.filter(function(s){return s.image;}).length);
    } catch(e) {}
    
    return skus;
  }

  // ===== 抓取1688面包屑类目 =====
  function scrape1688Category(){
    var result = {full: "", parts: []};
    try {
      var crumbs = document.querySelectorAll(".breadcrumb a, .crumb a, [class*='breadcrumb'] a, [class*='Breadcrumb'] a");
      if (crumbs.length > 0) {
        crumbs.forEach(function(a){
          var txt = (a.textContent || "").trim();
          if (txt && txt.length < 30 && !txt.includes("首页") && !txt.includes("1688")) {
            result.parts.push(txt);
          }
        });
      }
      if (result.parts.length === 0) {
        var attrs = scrapeProductAttributes();
        for (var k in attrs) {
          if (k.includes("类目") || k.includes("分类") || k.includes("品类")) {
            var v = String(attrs[k]).split(/[>＞→\->]/);
            v.forEach(function(p){ p = p.trim(); if (p && p.length < 30) result.parts.push(p); });
            break;
          }
        }
      }
      result.full = result.parts.join(" > ");
    } catch(e) {
      console.warn("[1688] 类目抓取失败:", e.message);
    }
    return result;
  }

        // ===== 从window.context抓取SKU包装数据（只取weight字段）=====
  function scrapeSkuPackInfo(){
    var packInfo=[];
    try{
      var ctxStr=JSON.stringify(window.context);
      
      // 抓取包含 skuId 和 weight 的对象
      var regex=/\{[^{}]*"skuId"\s*:\s*\d+[^{}]*"weight"\s*:\s*\d+[^{}]*\}/g;
      var matches=ctxStr.match(regex);
      if(matches){
        matches.forEach(function(m){
          try{
            var obj=JSON.parse(m);
            // 🔧 严格按字段名取值，不做任何猜测
            if (obj.skuId && typeof obj.weight === 'number' && obj.weight > 0) {
              packInfo.push({
                skuId: obj.skuId,
                sku1: obj.sku1 || "",
                weight: parseInt(obj.weight),     // ← 只取weight
                length: parseInt(obj.length) || 0, // ← 只取length
                width: parseInt(obj.width) || 0,   // ← 只取width
                height: parseInt(obj.height) || 0  // ← 只取height
                // 不取volume！
              });
            }
          }catch(e){}
        });
      }
      console.log("📦 [1688] context包装数据:", packInfo.length, "条");
      if (packInfo.length > 0) {
        console.log("📦 [1688] 示例:", packInfo[0]);
      }
    }catch(e){}
    return packInfo;
  }

    // ===== 抓取包装信息表格（只取重量列，不要体积）=====
  function scrapePackTable(){
    var packData=[];
    try{
      var tables = document.querySelectorAll("table");
      
      tables.forEach(function(table){
        var rows = table.querySelectorAll("tr");
        if (rows.length < 2) return;
        
        // 解析表头
        var headerCells = rows[0].querySelectorAll("th, td");
        if (headerCells.length === 0) return;
        
        var headers = [];
        headerCells.forEach(function(cell){
          headers.push((cell.textContent || "").trim());
        });
        
        // 必须有"重量"才处理
        var hasWeight = headers.some(function(h){ return /重量|净重|毛重/.test(h); });
        if (!hasWeight) return;
        
        console.log("📦 [包装表] 表头:", headers);
        
        // 🔧 智能识别每列索引（只识别需要的列）
        var nameIdx = 0;  // 默认第一列是名称
        var lengthIdx = -1, widthIdx = -1, heightIdx = -1, weightIdx = -1;
        
        headers.forEach(function(h, i){
          // 长（cm）- 必须明确是长度
          if (/^长\b|^长\s*\(|^长\s*（|^长度/.test(h) && lengthIdx === -1) lengthIdx = i;
          // 宽（cm）
          if (/^宽\b|^宽\s*\(|^宽\s*（|^宽度/.test(h) && widthIdx === -1) widthIdx = i;
          // 高（cm）
          if (/^高\b|^高\s*\(|^高\s*（|^高度/.test(h) && heightIdx === -1) heightIdx = i;
          // 重量 - 严格匹配
          if (/重量|净重|毛重/.test(h) && weightIdx === -1) weightIdx = i;
        });
        
        console.log("📦 [包装表] 列索引: name=" + nameIdx + ", length=" + lengthIdx + ", width=" + widthIdx + ", height=" + heightIdx + ", weight=" + weightIdx);
        
        if (weightIdx === -1) {
          console.warn("📦 [包装表] 未找到重量列");
          return;
        }
        
        // 读取每行数据
        for (var i = 1; i < rows.length; i++) {
          var cells = rows[i].querySelectorAll("td");
          if (cells.length === 0 || cells.length <= weightIdx) continue;
          
          var name = (cells[nameIdx].textContent || "").trim();
          var length = lengthIdx >= 0 ? (parseFloat(cells[lengthIdx].textContent) || 0) : 0;
          var width = widthIdx >= 0 ? (parseFloat(cells[widthIdx].textContent) || 0) : 0;
          var height = heightIdx >= 0 ? (parseFloat(cells[heightIdx].textContent) || 0) : 0;
          var weight = parseFloat(cells[weightIdx].textContent) || 0;
          
          if (name && weight > 0) {
            packData.push({
              name: name,
              length: length,
              width: width,
              height: height,
              weight: weight
            });
            console.log("📦 [包装表] 行:", name, "→ 重量:", weight, "g");
          }
        }
      });
    }catch(e){
      console.warn("[1688] 包装表抓取异常:", e.message);
    }
    return packData;
  }

  // ===== 抓取运费 =====
  function scrapeFreight(){var text=document.body.innerText||"";var m=text.match(/运费\s*[¥￥]\s*(\d+\.?\d*)\s*起?/);return m?parseFloat(m[1]):0;}

  // ===== 抓取商品属性表 =====
  function scrapeProductAttributes(){
    var attrs={};
    try{
      document.querySelectorAll(".ant-descriptions-item").forEach(function(item){
        var label=item.querySelector(".ant-descriptions-item-label");
        var value=item.querySelector(".ant-descriptions-item-content");
        if(label&&value){var k=(label.textContent||"").trim();var v=(value.textContent||"").trim();if(k&&v&&k.length<30&&v.length<200)attrs[k]=v;}
      });
      if(Object.keys(attrs).length===0){
        document.querySelectorAll("table tr").forEach(function(row){
          var cells=row.querySelectorAll("td");
          if(cells.length>=2){var k=(cells[0].textContent||"").trim();var v=(cells[1].textContent||"").trim();if(k&&v&&k.length<30)attrs[k]=v;}
        });
      }
    }catch(e){}
    return attrs;
  }

  // ===== 抓取详情文字 =====
  function scrapeDetailText(){
    var filterWords=["厂家直销","价格合理","品质保证","值得信赖","开票","税点","咨询客服","联系客服","发货时间","发货规则","下午","物流费","快递费","江浙沪","包邮","本店","店铺","主营","关注","随机发","颜色随机","咨询","详询","联系方式","电话","微信","QQ","一件代发","代发","混批","批发","现货","库存充足"];
    var detailText="";
    try{
      document.querySelectorAll(".detail-desc, [class*='detail-content'], .module-detail").forEach(function(el){
        var t=(el.innerText||"").trim();
        if(t.length<20)return;
        var lines=t.split(/\n/).filter(function(line){
          line=line.trim();if(line.length<5)return false;
          for(var i=0;i<filterWords.length;i++){if(line.includes(filterWords[i]))return false;}
          return true;
        });
        if(lines.length>0)detailText+=lines.join("\n")+"\n";
      });
    }catch(e){}
    return detailText.slice(0,1000);
  }
    // ===== 按SKU组织图片（每个SKU有自己的主图）=====
  function buildSkuImagesMap(productData) {
    var skuImageMap = {};
    
    try {
      var skus = productData.skus || [];
      var sharedImages = productData.images || [];
      
      skus.forEach(function(sku){
        if (!sku.name) return;
        var imgs = [];
        
        // 1. 该SKU的专属图（从SKU缩略图来）放第一位
        if (sku.image && sku.image.indexOf("alicdn") >= 0) {
          imgs.push(sku.image);
        }
        
        // 2. 加上商品的共用图（去重）
        sharedImages.forEach(function(src){
          if (imgs.indexOf(src) === -1) {
            imgs.push(src);
          }
        });
        
        skuImageMap[sku.name] = imgs;
      });
      
      console.log("🎨 [SKU图片] 映射:", Object.keys(skuImageMap).length, "个SKU");
    } catch(e) {
      console.warn("[SKU图片] 异常:", e.message);
    }
    
    return skuImageMap;
  }

    // ===== 抓取商品完整数据（新版1688专用 v2）=====
  function scrapeProductData(){
    var data={
      offerId:getOfferId(),
      url:location.href,
      title:"",
      images:[],
      skus:[],
      detailImages:[],
      video:null,
      freight:scrapeFreight(),
      pageVersion:detectPageVersion(),
      productAttributes:scrapeProductAttributes(),
      detailText:scrapeDetailText(),
      skuPackInfo:scrapeSkuPackInfo(),
      packData:scrapePackTable(),
      category1688:scrape1688Category(),
      scrapedAt:new Date().toISOString()
    };
    
    // ===== 标题 =====
    try{
      var titleEl=document.querySelector(".title-text")||
                  document.querySelector("[class*='title'][class*='detail']")||
                  document.querySelector("[class*='offerTitle']")||
                  document.querySelector(".module-pdInfo h1")||
                  document.querySelector(".detail-header-title")||
                  document.querySelector(".title-content")||
                  document.querySelector(".d-title")||
                  document.querySelector("[class*='od-pc-offer-title']");
      if(titleEl)data.title=titleEl.textContent.trim();
      
      // 从 context 取
      if(!data.title){
        try {
          var ctxTitle = window.context && window.context.data && window.context.data.offerTitle;
          if (ctxTitle) data.title = String(ctxTitle).trim();
        } catch(e){}
      }
      
      if(!data.title){
        var companyWords=["有限公司","有限责任","工厂","厂家","贸易","实业","科技有限","商行","经营部"];
        var h1s=Array.from(document.querySelectorAll("h1"));
        var cands=h1s.map(function(h){return h.textContent.trim();}).filter(function(t){
          if(!t||t.length<4)return false;
          for(var i=0;i<companyWords.length;i++){if(t.includes(companyWords[i]))return false;}
          return true;
        });
        if(cands.length>0){cands.sort(function(a,b){return b.length-a.length;});data.title=cands[0];}
        else if(h1s.length>0)data.title=h1s[0].textContent.trim();
      }
      if(!data.title){var og=document.querySelector('meta[property="og:title"]');if(og)data.title=(og.getAttribute("content")||"").trim();}
      if(!data.title)data.title=document.title.replace(/-.*$/,"").replace(/\|.*$/,"").trim();
    }catch(e){}
    
    // ===== 图片抓取（针对新版1688）=====
    try {
      var mainImages = [];
      var detailImages = [];
      var seenUrls = {};
      
      // 🔹 方式1：从 window.context 提取（最可靠）
      try {
        var ctxStr = JSON.stringify(window.context);
        
        // 1.1 提取主图：fullPathImageURI 字段
        var mainImgMatches = ctxStr.match(/"(?:imageList|mainImageList|images)"\s*:\s*\[[^\]]+\]/gi) || [];
        mainImgMatches.forEach(function(block){
          var urlPattern = /"(?:fullPathImageURI|imageURI|imageUrl)"\s*:\s*"([^"]+)"/gi;
          var m;
          while ((m = urlPattern.exec(block)) !== null) {
            var url = m[1].replace(/\\\//g, "/").replace(/\\u002F/g, "/");
            if (url && !seenUrls[url] && url.indexOf("alicdn") >= 0) {
              seenUrls[url] = true;
              mainImages.push(url);
            }
          }
        });
        console.log("📷 [1688] context主图:", mainImages.length, "张");
        
        // 1.2 全文搜索：所有 cbu01.alicdn.com 大图（作为详情图候选）
        var allCbuMatches = ctxStr.match(/https?:\\?\/\\?\/cbu01\.alicdn\.com\/img\/ibank\/[^"'\s,\]\\]+/gi) || [];
        allCbuMatches.forEach(function(url){
          url = url.replace(/\\\//g, "/").replace(/\\u002F/g, "/");
          // 过滤
          if (/_\d{2,3}x\d{2,3}\./.test(url)) return; // 小图带尺寸
          if (!/\.(jpg|jpeg|png)/i.test(url)) return; // 必须是图片
          if (/qrcode|wechat|weixin|logo/i.test(url)) return;
          
          if (!seenUrls[url]) {
            seenUrls[url] = true;
            detailImages.push(url);
          }
        });
        console.log("📷 [1688] context全文图:", detailImages.length, "张");
      } catch(e) { console.warn("[1688] context抓图失败:", e.message); }
      
      // 🔹 方式2：DOM补充（针对.od-gallery等新版容器）
      try {
        var domSelectors = [
          ".od-gallery-preview img",
          ".od-gallery-list img",
          ".od-gallery-list-wapper img",
          ".module-od-picture-gallery img",
          ".ant-image-img.preview-img",
          ".detail-gallery-turn-item img",
          ".gallery-turn-scroll img",
          "[class*='gallery'] img",
          "[class*='Gallery'] img"
        ];
        
        domSelectors.forEach(function(sel){
          document.querySelectorAll(sel).forEach(function(img){
            var src = img.getAttribute("src") || img.getAttribute("data-src") || img.getAttribute("data-original") || "";
            if (!src) return;
            if (src.indexOf("alicdn") === -1 && src.indexOf("1688") === -1) return;
            if (/\.svg/i.test(src) || /qrcode|wechat|weixin|logo/i.test(src)) return;
            var w = img.naturalWidth || img.width || 0;
            if (w > 0 && w < 200) return;
            if (/_\d{2,3}x\d{2,3}\./.test(src)) return;
            if (/tps-\d{1,2}-\d{1,2}/.test(src)) return;
            
            if (src.startsWith("//")) src = "https:" + src;
            
            if (!seenUrls[src]) {
              seenUrls[src] = true;
              mainImages.push(src);
            }
          });
        });
      } catch(e) { console.warn("[1688] DOM抓图异常:", e.message); }
      
      // 🔹 方式3：所有 cbu01 大图（兜底）
      try {
        document.querySelectorAll("img").forEach(function(img){
          var src = img.getAttribute("src") || img.getAttribute("data-src") || "";
          if (!src) return;
          if (src.indexOf("cbu01.alicdn.com") === -1) return;
          if (/\.svg/i.test(src) || /qrcode|wechat|weixin|logo/i.test(src)) return;
          if (/_\d{2,3}x\d{2,3}\./.test(src)) return;
          if (/tps-\d{1,2}-\d{1,2}/.test(src)) return;
          var w = img.naturalWidth || img.width || 0;
          if (w > 0 && w < 300) return;
          
          if (src.startsWith("//")) src = "https:" + src;
          
          if (!seenUrls[src]) {
            seenUrls[src] = true;
            if (w > 500 || !w) detailImages.push(src);
          }
        });
      } catch(e) {}
      
      // 🔹 清理URL
      function cleanUrl(url) {
        return url
          .replace(/\.webp$/i, "")
          .replace(/\.jpg_.*$/i, ".jpg")
          .replace(/_sum\.jpg$/i, ".jpg");
      }
      
      mainImages = mainImages.map(cleanUrl);
      detailImages = detailImages.map(cleanUrl);
      
      // 去重
      var mainSet = {};
      data.images = mainImages.filter(function(u){
        if (mainSet[u]) return false;
        mainSet[u] = true;
        return true;
      });
      
      var detailSet = {};
      data.detailImages = detailImages.filter(function(u){
        if (mainSet[u]) return false;
        if (detailSet[u]) return false;
        detailSet[u] = true;
        return true;
      });
      
      // 如果主图为空，从详情图借前10张
      if (data.images.length === 0 && data.detailImages.length > 0) {
        data.images = data.detailImages.slice(0, 10);
        data.detailImages = data.detailImages.slice(10);
      }
      
      console.log("✅ [1688] 最终 主图:", data.images.length, "张, 详情图:", data.detailImages.length, "张");
    } catch(e) { console.warn("[1688] 图片抓取整体异常:", e.message); }
    
    // ===== SKU列表 =====
    data.skus=scrapeAllSkus();
    
    // ===== 视频 =====
    try{
      var videoUrl=null;
      var videoEl=document.querySelector("video");
      if(videoEl)videoUrl=videoEl.src||videoEl.currentSrc||videoEl.getAttribute("src");
      if(!videoUrl){var ogV=document.querySelector('meta[property="og:video"]');if(ogV)videoUrl=ogV.getAttribute("content");}
      if(!videoUrl){
        try {
          var ctxStr2 = JSON.stringify(window.context);
          var vm = ctxStr2.match(/https?:\\?\/\\?\/[^"'\s]+\.mp4[^"'\s]*/);
          if (vm) videoUrl = vm[0].replace(/\\\//g, "/").replace(/\\u002F/g, "/");
        } catch(e){}
      }
      if(videoUrl){data.video=videoUrl;}
    }catch(e){}
    
        // 🔧 抓取每个SKU的图片映射
    try {
      data.skuImagesMap = buildSkuImagesMap(data);
    } catch(e) {}
    
    return data;
  }

    // ===== SKU切换（不点击页面，直接从已抓取的数据切换）=====
  async function selectSkuAndScrape(skuIndex){
    var skus = editorProductData ? editorProductData.skus : scrapeAllSkus();
    if(skuIndex >= skus.length) return null;
    var sku = skus[skuIndex];
    
    console.log("🔄 [1688] 切换SKU(无点击):", sku.name);
    
    // 从已抓取的数据中找该SKU的图片
    var skuImages = [];
    if (editorProductData && editorProductData.skuImagesMap) {
      skuImages = editorProductData.skuImagesMap[sku.name] || [];
    }
    
    // 如果该SKU没有专属图片，用商品主图
    var mainImgs = skuImages.length > 0 ? skuImages : (editorProductData ? editorProductData.images : []);
    var detailImgs = editorProductData ? editorProductData.detailImages : [];
    
    return {
      sku: sku,
      images: mainImgs,
      detailImages: detailImgs,
      freight: editorProductData ? editorProductData.freight : 0
    };
  }

  // ===== 智能获取重量和尺寸 =====
  function getPackageInfoFromPage(productData, selectedSkuName){
    var weight = 0, dimensions = null, source = "";
    
    if(selectedSkuName && productData.skuPackInfo && productData.skuPackInfo.length > 0){
      var pack = productData.skuPackInfo.find(function(p){return p.sku1 === selectedSkuName;});
      if(!pack) pack = productData.skuPackInfo[0];
      if(pack && pack.weight > 0){
        weight = pack.weight;
        if(pack.length > 0 && pack.width > 0 && pack.height > 0){
          dimensions = {length:pack.length, width:pack.width, height:pack.height};
        }
        source = "页面包装数据";
        return {found:true, weight:weight, dimensions:dimensions, source:source};
      }
    }
    
    if(productData.packData && productData.packData.length > 0){
      var packRow = null;
      if(selectedSkuName){
        packRow = productData.packData.find(function(p){
          return p.name === selectedSkuName || selectedSkuName.includes(p.name) || p.name.includes(selectedSkuName);
        });
      }
      if(!packRow) packRow = productData.packData[0];
      if(packRow && packRow.weight > 0){
        weight = packRow.weight;
        if(packRow.length > 0 && packRow.width > 0 && packRow.height > 0){
          dimensions = {length:packRow.length, width:packRow.width, height:packRow.height};
        }
        source = "包装信息表";
        return {found:true, weight:weight, dimensions:dimensions, source:source};
      }
    }
    
    var attrs = productData.productAttributes || {};
    for(var k in attrs){
      if(k.includes("重量") || k.includes("净重") || k.includes("毛重")){
        var v = parseFloat(String(attrs[k]).replace(/[^\d.]/g, ""));
        if(v > 0){
          if(v <= 100) weight = Math.round(v * 1000);
          else weight = Math.round(v);
          source = "商品属性";
          return {found:true, weight:weight, dimensions:null, source:source};
        }
      }
    }
    
    return {found:false, weight:0, dimensions:null, source:""};
  }

  // ===== 进度步骤 =====
  var steps=[{key:"scrape",label:"抓取商品数据"},{key:"ai",label:"AI 处理内容"},{key:"image",label:"生成爆款图"},{key:"upload",label:"上传到 Ozon"},{key:"done",label:"完成"}];
  function renderSteps(currentKey,status,message){var el=document.getElementById("erp-progress-steps");if(!el)return;var currentIdx=steps.findIndex(function(s){return s.key===currentKey;});el.innerHTML=steps.map(function(step,idx){var icon,color;if(idx<currentIdx){icon="✅";color="#52c41a";}else if(idx===currentIdx){if(status==="error"){icon="❌";color="#ff4d4f";}else if(status==="waiting"){icon="⏳";color="#fa8c16";}else if(status==="done"){icon="✅";color="#52c41a";}else{icon="⏳";color="#1677ff";}}else{icon="⬜";color="#ccc";}var extra=(idx===currentIdx&&message)?'<div style="font-size:11px;color:'+color+';margin-top:3px;padding-left:28px;">'+escapeHtml(message)+'</div>':"";return '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;"><span style="font-size:16px;flex-shrink:0;">'+icon+'</span><span style="font-size:12px;color:'+color+';font-weight:'+(idx===currentIdx?"600":"normal")+';">'+escapeHtml(step.label)+'</span></div>'+extra;}).join("");}

    // ===== 悬浮按钮 + 菜单 =====
  var menuPanel = null;
  
  function injectUploadButton(){
    if(document.getElementById("erp-1688-btn"))return;
    var btn=document.createElement("div");
    btn.id="erp-1688-btn";
    btn.style.cssText="position:fixed;top:50%;right:0;transform:translateY(-50%);background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:12px 0 0 12px;padding:14px 12px;cursor:pointer;z-index:999997;font-family:Arial;font-size:13px;font-weight:bold;text-align:center;box-shadow:-4px 0 16px rgba(102,126,234,.4);writing-mode:vertical-rl;letter-spacing:3px;transition:all .2s;";
    btn.textContent="🤖 AI助手";
    btn.addEventListener("mouseenter",function(){btn.style.padding="14px 16px";});
    btn.addEventListener("mouseleave",function(){btn.style.padding="14px 12px";});
    btn.addEventListener("click",function(e){
      e.stopPropagation();
      toggleMenuPanel();
    });
    document.body.appendChild(btn);
  }
  function showFloatingButton(){var b=document.getElementById("erp-1688-btn");if(b)b.style.display="block";}
  function hideFloatingButton(){var b=document.getElementById("erp-1688-btn");if(b)b.style.display="none";}
  
  function toggleMenuPanel(){
    if(menuPanel && menuPanel.style.display === "block"){
      menuPanel.style.display = "none";
      return;
    }
    if(!menuPanel) createMenuPanel();
    menuPanel.style.display = "block";
    loadMenuUserInfo();
  }
  
  function createMenuPanel(){
    menuPanel = document.createElement("div");
    menuPanel.id = "erp-menu-panel";
    menuPanel.style.cssText = "position:fixed;top:50%;right:55px;transform:translateY(-50%);width:280px;background:#fff;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,0.25);z-index:999998;font-family:'PingFang SC',Arial,sans-serif;overflow:hidden;display:none;";
    
    var html = '';
    html += '<div style="background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:20px;text-align:center;">';
    html += '<div style="font-size:18px;font-weight:bold;margin-bottom:4px;">🤖 超维 ERP AI</div>';
    html += '<div style="font-size:11px;opacity:0.85;">当前版本 v8.2</div>';
    html += '<div id="erp-menu-user" style="font-size:12px;opacity:0.9;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.2);">⏳ 加载中...</div>';
    html += '</div>';
    html += '<div style="padding:16px;">';
    html += '<button id="erp-menu-collect" style="width:100%;padding:16px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:bold;cursor:pointer;box-shadow:0 4px 12px rgba(102,126,234,0.3);">🚀 AI 采集本商品</button>';
    html += '<div style="font-size:11px;color:#999;text-align:center;margin-top:6px;">一键采集标题/SKU/图片/重量</div>';
    html += '</div>';
    html += '<div style="height:1px;background:#f0f0f0;margin:0 16px;"></div>';
    html += '<div style="padding:8px 16px;">';
    html += '<div class="erp-menu-item" data-action="collectbox" style="padding:12px;cursor:pointer;border-radius:8px;display:flex;align-items:center;gap:10px;"><span style="font-size:18px;">📦</span><span style="flex:1;font-size:13px;color:#333;">采集箱</span><span style="color:#999;">›</span></div>';
    html += '<div class="erp-menu-item" data-action="erp" style="padding:12px;cursor:pointer;border-radius:8px;display:flex;align-items:center;gap:10px;"><span style="font-size:18px;">🌐</span><span style="flex:1;font-size:13px;color:#333;">ERP 后台</span><span style="color:#999;">›</span></div>';
    html += '<div class="erp-menu-item" data-action="history" style="padding:12px;cursor:pointer;border-radius:8px;display:flex;align-items:center;gap:10px;"><span style="font-size:18px;">📊</span><span style="flex:1;font-size:13px;color:#333;">上品记录</span><span style="color:#999;">›</span></div>';
    html += '<div class="erp-menu-item" data-action="stores" style="padding:12px;cursor:pointer;border-radius:8px;display:flex;align-items:center;gap:10px;"><span style="font-size:18px;">🏪</span><span style="flex:1;font-size:13px;color:#333;">店铺管理</span><span style="color:#999;">›</span></div>';
    html += '</div>';
    html += '<div style="height:1px;background:#f0f0f0;margin:0 16px;"></div>';
    html += '<div style="padding:8px 16px 16px;">';
    html += '<div class="erp-menu-item" data-action="logout" style="padding:12px;cursor:pointer;border-radius:8px;display:flex;align-items:center;gap:10px;color:#ff4d4f;"><span style="font-size:18px;">🚪</span><span style="flex:1;font-size:13px;">退出登录</span></div>';
    html += '</div>';
    
    menuPanel.innerHTML = html;
    document.body.appendChild(menuPanel);
    
    menuPanel.querySelectorAll(".erp-menu-item").forEach(function(item){
      item.addEventListener("mouseenter",function(){this.style.background="#f5f7fa";});
      item.addEventListener("mouseleave",function(){this.style.background="";});
      item.addEventListener("click",function(e){
        e.stopPropagation();
        handleMenuAction(this.dataset.action);
      });
    });
    
    document.getElementById("erp-menu-collect").addEventListener("click",function(e){
      e.stopPropagation();
      menuPanel.style.display = "none";
      showFullscreenEditor();
    });
    
    document.addEventListener("click",function(e){
      if(menuPanel && menuPanel.style.display === "block"){
        if(!menuPanel.contains(e.target) && e.target.id !== "erp-1688-btn"){
          menuPanel.style.display = "none";
        }
      }
    });
  }
  
    function loadMenuUserInfo(){
    chrome.storage.local.get(["erp_user","erp_token"],function(items){
      var userEl = document.getElementById("erp-menu-user");
      if(!userEl) return;
      
      // 🔧 只要有token就算已登录
      if(items.erp_token){
        var name = (items.erp_user && items.erp_user.username) ? items.erp_user.username : "已登录";
        userEl.textContent = "👤 " + name;
      } else {
        userEl.innerHTML = '⚠️ 未登录 <a href="https://ozonerp.chaowei.online" target="_blank" style="color:#fff;text-decoration:underline;">去登录</a>';
      }
    });
  }
  
  function handleMenuAction(action){
    if(menuPanel) menuPanel.style.display = "none";
    if(action === "erp"){
      window.open("https://ozonerp.chaowei.online","_blank");
    } else if(action === "history"){
      window.open("https://ozonerp.chaowei.online/#history","_blank");
    } else if(action === "stores"){
      window.open("https://ozonerp.chaowei.online/#stores","_blank");
    } else if(action === "collectbox"){
      alert("📦 采集箱功能开发中，敬请期待！");
    } else if(action === "logout"){
      if(confirm("确定要退出登录吗？")){
        chrome.storage.local.remove(["erp_token","erp_user"],function(){
          alert("已退出登录");
          loadMenuUserInfo();
        });
      }
    }
  }

  // ===== 编辑器全局状态 =====
  var panelEl=null, maskEl=null;
  var editorImages = [];
  var editorProductData = null;
  var editorState = {
    titleRu: "",
    descRu: "",
    tags: "",
    richContentMode: "visual",
    richContentBlocks: [],
    richContentJson: "",
    selectedCategory: null,
    selectedSkuIndex: 0,
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    weightSource: ""
  };
  // ===== 全屏编辑器（1400×900居中弹窗）=====
      // ===== 全屏编辑器（异步加载版 v8.2）=====
  function showFullscreenEditor() {
    localStorage.setItem(PANEL_MIN_KEY, "0");
    injectUploadButton();
    
    // 先显示加载界面
    showLoadingPanel();
    
    // 异步采集
    setTimeout(function(){
      doCollectAndRender();
    }, 100);
  }
  
  // 显示加载面板
  function showLoadingPanel() {
    if (panelEl) { panelEl.remove(); panelEl = null; }
    if (maskEl) { maskEl.remove(); maskEl = null; }
    
    maskEl = document.createElement("div");
    maskEl.id = "erp-editor-mask";
    maskEl.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:999997;display:block;backdrop-filter:blur(2px);";
    
    panelEl = document.createElement("div");
    panelEl.id = "erp-1688-panel";
    panelEl.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:95vw;height:92vh;max-width:1800px;max-height:1100px;min-width:1100px;min-height:650px;background:#f5f7fa;z-index:999998;display:flex;flex-direction:column;font-family:Arial,sans-serif;border-radius:16px;box-shadow:0 20px 80px rgba(0,0,0,0.3);overflow:hidden;";
    
    panelEl.innerHTML = [
      '<div style="background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">',
        '<div style="font-size:18px;font-weight:bold;">🤖 AI 全品编辑器</div>',
        '<button id="erp-loading-close" style="padding:8px 16px;background:rgba(255,255,255,0.2);border:none;border-radius:6px;color:#fff;font-size:13px;cursor:pointer;font-weight:600;">✕ 关闭</button>',
      '</div>',
      '<div style="flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:24px;">',
        '<div style="font-size:80px;animation:erp-spin 2s linear infinite;display:inline-block;">⏳</div>',
        '<div style="font-size:28px;color:#667eea;font-weight:bold;">获取数据中...</div>',
        '<div id="erp-loading-text" style="font-size:15px;color:#888;">正在准备采集</div>',
        '<div style="width:400px;height:8px;background:#e0e0e0;border-radius:4px;overflow:hidden;">',
          '<div id="erp-loading-bar" style="width:0%;height:100%;background:linear-gradient(90deg,#667eea,#764ba2);border-radius:4px;transition:width 0.3s;"></div>',
        '</div>',
      '</div>',
      '<style>@keyframes erp-spin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }</style>'
    ].join("");
    
    document.body.appendChild(maskEl);
    document.body.appendChild(panelEl);
    
    document.getElementById("erp-loading-close").onclick = hideFullscreenEditor;
  }
  
  // 异步采集 + 渲染
  async function doCollectAndRender() {
    var loadingText = document.getElementById("erp-loading-text");
    var loadingBar = document.getElementById("erp-loading-bar");
    
    function setProgress(text, percent){
      if(loadingText) loadingText.textContent = text;
      if(loadingBar) loadingBar.style.width = percent + "%";
    }
    
    try {
      setProgress("📦 抓取商品标题和数据...", 20);
      await sleep(200);
      editorProductData = scrapeProductData();
      
      setProgress("🎨 抓取SKU列表...", 40);
      await sleep(200);
      var skus = scrapeAllSkus();
      
      setProgress("🖼️ 整理商品图片...", 60);
      await sleep(200);
      var mainImages = editorProductData.images || [];
      var detailImages = editorProductData.detailImages || [];
      
      editorImages = [];
      var seen = {};
      mainImages.concat(detailImages).forEach(function(src, idx) {
        if (!seen[src] && idx < 20) {
          seen[src] = true;
          editorImages.push({
            index: editorImages.length,
            originalUrl: src,
            translatedUrl: null,
            enhancedUrl: null,
            isMain: editorImages.length < 10,
            status: "original"
          });
        }
      });
      
      setProgress("📏 识别重量和尺寸...", 80);
      await sleep(200);
      
      editorState = {
        titleRu: "",
        descRu: "",
        tags: "",
        richContentMode: "visual",
        richContentBlocks: [],
        richContentJson: "",
        selectedCategory: null,
        selectedSkuIndex: 0,
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        weightSource: ""
      };
      
      if (skus.length > 0) {
        var pkgInfo = getPackageInfoFromPage(editorProductData, skus[0].name);
        if (pkgInfo.found) {
          editorState.weight = pkgInfo.weight;
          editorState.weightSource = pkgInfo.source;
          if (pkgInfo.dimensions) {
            editorState.length = pkgInfo.dimensions.length;
            editorState.width = pkgInfo.dimensions.width;
            editorState.height = pkgInfo.dimensions.height;
          }
        }
      }
      
      setProgress("✅ 采集完成，正在渲染界面...", 100);
      await sleep(400);
      
      renderFullEditorContent(skus);
      
    } catch(e) {
      console.error("采集失败:", e);
      if (loadingText) loadingText.textContent = "❌ 采集失败: " + e.message;
    }
  }
  // 渲染完整编辑器内容
  function renderFullEditorContent(skus) {
    if (!panelEl) return;
    
    var inputStyle = "width:100%;padding:8px 10px;border:1.5px solid #e2e8f0;border-radius:6px;font-size:12px;outline:none;background:#fff;box-sizing:border-box;";
    var inputSmallStyle = "width:65px;padding:6px 8px;border:1.5px solid #e2e8f0;border-radius:6px;font-size:12px;outline:none;background:#fff;box-sizing:border-box;text-align:center;";
    var btnPrimary = "padding:8px 14px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border:none;border-radius:6px;font-size:12px;cursor:pointer;font-weight:600;";
    var btnSecondary = "padding:6px 12px;background:#fff;color:#667eea;border:1.5px solid #667eea;border-radius:6px;font-size:11px;cursor:pointer;font-weight:600;";
    var btnSmall = "padding:4px 8px;background:#fff;color:#666;border:1px solid #ddd;border-radius:4px;font-size:11px;cursor:pointer;";
    var sectionTitle = "font-size:13px;font-weight:700;color:#333;margin-bottom:8px;display:flex;align-items:center;gap:6px;";
    var cardStyle = "background:#fff;border-radius:8px;padding:12px;margin-bottom:10px;";
    
    var cat1688 = (editorProductData.category1688 && editorProductData.category1688.full) || "未识别";
    
    panelEl.innerHTML = [
      '<div style="background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">',
        '<div style="display:flex;align-items:center;gap:16px;flex:1;min-width:0;">',
          '<div style="font-size:18px;font-weight:bold;">🤖 AI 全品编辑器</div>',
          '<div style="font-size:11px;opacity:0.85;background:rgba(255,255,255,0.15);padding:3px 10px;border-radius:10px;">1688类目: ' + escapeHtml(cat1688) + '</div>',
          '<div id="erp-editor-status" style="font-size:12px;opacity:0.9;">已采集 ' + editorImages.length + ' 张图片 | ' + skus.length + '个SKU</div>',
          (editorProductData.video ? '<div style="font-size:11px;background:rgba(82,196,26,0.25);padding:3px 10px;border-radius:10px;">🎬 已抓到视频</div>' : '<div style="font-size:11px;background:rgba(255,255,255,0.1);padding:3px 10px;border-radius:10px;opacity:0.6;">🎬 无视频</div>'),
        '</div>',
        '<div style="display:flex;align-items:center;gap:8px;">',
          '<button id="erp-editor-close" style="padding:8px 16px;background:rgba(255,255,255,0.2);border:none;border-radius:6px;color:#fff;font-size:13px;cursor:pointer;font-weight:600;">✕ 关闭</button>',
        '</div>',
      '</div>',
      
      '<div style="flex:1;display:flex;overflow:hidden;padding:12px;gap:12px;">',
        
        // 左栏
        '<div style="width:25%;min-width:300px;display:flex;flex-direction:column;gap:10px;overflow-y:auto;padding-right:4px;">',
          
          '<div style="' + cardStyle + '">',
            '<div style="' + sectionTitle + '">📦 选择 SKU</div>',
            '<div id="erp-sku-list" style="max-height:200px;overflow-y:auto;border:1px solid #f0f0f0;border-radius:6px;padding:4px;">',
              skus.length > 0 ? skus.map(function(s, i) {
                return '<label style="display:flex;align-items:flex-start;padding:8px;font-size:11px;cursor:pointer;border-bottom:1px solid #f5f5f5;gap:8px;">' +
                  '<input type="radio" name="erp-sku" value="' + i + '" data-name="' + escapeHtml(s.name) + '" data-price="' + s.price + '"' + (i === 0 ? ' checked' : '') + ' style="margin-top:8px;flex-shrink:0;"/>' +
                  (s.image ? '<img src="' + escapeHtml(s.image) + '" style="width:40px;height:40px;object-fit:cover;border-radius:4px;flex-shrink:0;"/>' : '') +
                  '<div style="flex:1;min-width:0;">' +
                    '<div style="line-height:1.4;word-break:break-all;color:#333;" title="' + escapeHtml(s.name) + '">' + escapeHtml(s.name) + '</div>' +
                    (s.price > 0 ? '<div style="color:#ff4d4f;font-weight:600;margin-top:4px;">¥' + s.price + '</div>' : '') +
                  '</div>' +
                  '</label>';
              }).join("") : '<div style="color:#999;font-size:11px;padding:10px;text-align:center;">未找到SKU</div>',
            '</div>',
          '</div>',
          
          '<div style="' + cardStyle + 'background:linear-gradient(135deg,#fff,#fef7ff);border:1px solid #e9d5ff;">',
            '<div style="' + sectionTitle + '">📏 包装信息（可手动修改）</div>',
            '<div style="margin-bottom:8px;">',
              '<div style="font-size:11px;color:#666;margin-bottom:4px;">重量 (g) <span style="color:#ff4d4f;">*必填</span></div>',
              '<input type="number" id="erp-pkg-weight" value="' + (editorState.weight || "") + '" placeholder="例如：500" style="' + inputStyle + '" min="1"/>',
            '</div>',
            '<div style="margin-bottom:8px;">',
              '<div style="font-size:11px;color:#666;margin-bottom:4px;">包装尺寸 (cm) <span style="color:#999;">可选</span></div>',
              '<div style="display:flex;align-items:center;gap:4px;">',
                '<input type="number" id="erp-pkg-length" value="' + (editorState.length || "") + '" placeholder="长" style="' + inputSmallStyle + '" min="1"/>',
                '<span style="color:#999;">×</span>',
                '<input type="number" id="erp-pkg-width" value="' + (editorState.width || "") + '" placeholder="宽" style="' + inputSmallStyle + '" min="1"/>',
                '<span style="color:#999;">×</span>',
                '<input type="number" id="erp-pkg-height" value="' + (editorState.height || "") + '" placeholder="高" style="' + inputSmallStyle + '" min="1"/>',
              '</div>',
            '</div>',
            '<div id="erp-pkg-source" style="font-size:10px;padding:4px 8px;border-radius:4px;' + (editorState.weightSource ? 'background:#f6ffed;color:#52c41a;' : 'background:#fff7e6;color:#fa8c16;') + '">' + 
              (editorState.weightSource ? '📌 数据来源：' + editorState.weightSource : '⚠️ 未从页面抓到，请手动填写') + 
            '</div>',
          '</div>',
          
          '<div style="' + cardStyle + '">',
            '<div style="' + sectionTitle + '">📝 标题</div>',
            '<div style="font-size:10px;color:#999;margin-bottom:4px;">中文原标题：</div>',
            '<div style="font-size:11px;color:#555;background:#f9fafb;padding:6px;border-radius:4px;margin-bottom:8px;max-height:60px;overflow-y:auto;line-height:1.5;">' + escapeHtml(editorProductData.title || "") + '</div>',
            '<button id="erp-btn-translate-title" style="' + btnSecondary + 'width:100%;margin-bottom:6px;">🌍 AI翻译为俄文</button>',
            '<div style="font-size:10px;color:#999;margin-bottom:4px;">俄文标题（可编辑）：</div>',
            '<textarea id="erp-title-ru" placeholder="点击上方按钮翻译，或手动输入..." style="' + inputStyle + 'min-height:60px;resize:vertical;"></textarea>',
          '</div>',
          
          '<div style="' + cardStyle + '">',
            '<div style="' + sectionTitle + '">📄 商品简介（俄文）</div>',
            '<button id="erp-btn-generate-desc" style="' + btnSecondary + 'width:100%;margin-bottom:6px;">🤖 AI生成俄文简介</button>',
            '<textarea id="erp-desc-ru" placeholder="点击上方按钮生成..." style="' + inputStyle + 'min-height:120px;resize:vertical;"></textarea>',
          '</div>',
          
          '<div style="' + cardStyle + '">',
            '<div style="' + sectionTitle + '">🏷️ 搜索标签（俄文）</div>',
            '<button id="erp-btn-generate-tags" style="' + btnSecondary + 'width:100%;margin-bottom:6px;">🤖 AI生成俄文标签</button>',
            '<input type="text" id="erp-tags" placeholder="标签1, 标签2, 标签3..." style="' + inputStyle + '"/>',
            '<div style="font-size:10px;color:#999;margin-top:4px;">用逗号分隔，建议5-10个</div>',
          '</div>',
          
          '<div style="' + cardStyle + '">',
            '<div style="' + sectionTitle + '">📊 富内容</div>',
            '<div style="display:flex;gap:4px;margin-bottom:8px;">',
              '<button id="erp-rich-mode-visual" class="erp-rich-mode-btn" data-mode="visual" style="' + btnSmall + 'flex:1;background:#667eea;color:#fff;border-color:#667eea;">🎨 可视化</button>',
              '<button id="erp-rich-mode-json" class="erp-rich-mode-btn" data-mode="json" style="' + btnSmall + 'flex:1;">📝 JSON</button>',
            '</div>',
            '<button id="erp-btn-generate-rich" style="' + btnSecondary + 'width:100%;margin-bottom:8px;">🤖 AI生成富内容</button>',
            '<div id="erp-rich-visual-editor" style="display:block;"></div>',
            '<div id="erp-rich-json-editor" style="display:none;">',
              '<textarea id="erp-rich-json-text" placeholder="[]" style="' + inputStyle + 'min-height:180px;font-family:monospace;font-size:11px;resize:vertical;"></textarea>',
            '</div>',
          '</div>',
          
        '</div>',
        
        // 中栏
        '<div style="width:50%;background:#fff;border-radius:8px;padding:14px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;">',
          '<div style="' + sectionTitle + 'font-size:14px;">🎨 图片管理 <span id="erp-img-count" style="font-weight:normal;font-size:12px;color:#888;"></span></div>',
          '<div>',
            '<div style="font-size:12px;color:#667eea;font-weight:600;margin-bottom:8px;">🖼️ 主图（前10张，建议Ozon主图）</div>',
            '<div id="erp-main-images" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;"></div>',
          '</div>',
          '<div>',
            '<div style="font-size:12px;color:#667eea;font-weight:600;margin-bottom:8px;margin-top:10px;">📸 详情图</div>',
            '<div id="erp-detail-images" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;"></div>',
          '</div>',
        '</div>',
        
        // 右栏
        '<div style="width:25%;min-width:280px;display:flex;flex-direction:column;gap:10px;overflow-y:auto;padding-left:4px;">',
          
          '<div style="' + cardStyle + '">',
            '<div style="' + sectionTitle + '">🏪 上传到哪些店铺</div>',
            '<div id="erp-store-list" style="max-height:140px;overflow-y:auto;"><div style="color:#999;font-size:11px;">⏳ 加载中...</div></div>',
          '</div>',
          
          '<div style="' + cardStyle + '">',
            '<div style="' + sectionTitle + '">📦 Ozon类目 <span style="color:#ff4d4f;font-size:10px;font-weight:normal;">*必选</span></div>',
            '<input type="text" id="erp-category-search" placeholder="🔍 搜索类目..." style="' + inputStyle + 'margin-bottom:6px;"/>',
            '<div id="erp-category-tree" style="max-height:320px;overflow-y:auto;border:1px solid #f0f0f0;border-radius:6px;padding:6px;background:#fafafa;">',
              '<div style="color:#999;font-size:11px;text-align:center;padding:10px;">⏳ 加载类目中...</div>',
            '</div>',
            '<div id="erp-category-selected" style="margin-top:6px;font-size:11px;color:#667eea;font-weight:600;"></div>',
          '</div>',
          
          '<div style="' + cardStyle + '">',
            '<div style="' + sectionTitle + '">💰 定价设置</div>',
            '<div style="margin-bottom:6px;">',
              '<label style="font-size:11px;color:#666;">利润率 %</label>',
              '<input type="number" id="erp-profit-rate" value="25" min="15" style="' + inputStyle + '"/>',
            '</div>',
            '<div style="margin-bottom:6px;">',
              '<label style="font-size:11px;color:#666;">物流方式</label>',
              '<select id="erp-shipping-type" style="' + inputStyle + '">',
                '<option value="land">陆运</option>',
                '<option value="air_land">陆空联运</option>',
                '<option value="air">空运</option>',
              '</select>',
            '</div>',
            '<div id="erp-price-preview" style="background:#f0f5ff;border:1px solid #c7d2fe;border-radius:6px;padding:8px;font-size:11px;color:#667eea;line-height:1.7;display:none;margin-top:6px;"></div>',
            '<div style="font-size:10px;color:#aaa;margin-top:4px;line-height:1.5;">佣金17%+物流8%+尾程5%+提现1.2%+贴单¥2</div>',
          '</div>',
          
          '<div style="' + cardStyle + '">',
            '<div style="' + sectionTitle + '">🎭 AI 图片风格</div>',
            '<input type="text" id="erp-style-hint" placeholder="如：时尚女性、家居实用..." style="' + inputStyle + '"/>',
          '</div>',
          
          '<button id="erp-start-btn" style="' + btnPrimary + 'font-size:14px;padding:14px;width:100%;margin-top:8px;">🚀 开始上品到 Ozon</button>',
          
          '<div id="erp-progress-area" style="display:none;background:#fff;border-radius:8px;padding:12px;">',
            '<div style="font-size:12px;font-weight:700;color:#555;margin-bottom:8px;">📊 进度</div>',
            '<div id="erp-progress-steps"></div>',
          '</div>',
          
        '</div>',
        
      '</div>'
    ].join("");
    
    // 绑定事件
    document.getElementById("erp-editor-close").onclick = hideFullscreenEditor;
    maskEl.onclick = hideFullscreenEditor;
    document.getElementById("erp-start-btn").onclick = startUpload;
    
    document.querySelectorAll('input[name="erp-sku"]').forEach(function(radio){
      radio.addEventListener("change", async function(){
        var idx = parseInt(this.value);
        var skuName = this.dataset.name;
        var self = this;
        editorState.selectedSkuIndex = idx;
        updateEditorStatus("⏳ 切换SKU：" + skuName);
        try {
          var skuResult = await selectSkuAndScrape(idx);
          if (skuResult && (skuResult.images.length > 0 || skuResult.detailImages.length > 0)) {
            var newMainImages = skuResult.images || [];
            var newDetailImages = skuResult.detailImages || [];
            editorImages = [];
            var seen2 = {};
            newMainImages.concat(newDetailImages).forEach(function(src, ix) {
              if (!seen2[src] && ix < 20) {
                seen2[src] = true;
                editorImages.push({
                  index: editorImages.length,
                  originalUrl: src,
                  translatedUrl: null,
                  enhancedUrl: null,
                  isMain: editorImages.length < 10,
                  status: "original"
                });
              }
            });
            updateImagePanels();
            updateEditorStatus("✅ 已切换：" + skuName + "（" + editorImages.length + "张图）");
          }
        } catch(e) { console.error("SKU切换失败:", e); }
        
        var pkgInfo = getPackageInfoFromPage(editorProductData, skuName);
        if (pkgInfo.found) {
          document.getElementById("erp-pkg-weight").value = pkgInfo.weight;
          if (pkgInfo.dimensions) {
            document.getElementById("erp-pkg-length").value = pkgInfo.dimensions.length;
            document.getElementById("erp-pkg-width").value = pkgInfo.dimensions.width;
            document.getElementById("erp-pkg-height").value = pkgInfo.dimensions.height;
          }
          var srcEl = document.getElementById("erp-pkg-source");
          srcEl.textContent = "📌 数据来源：" + pkgInfo.source;
          srcEl.style.background = "#f6ffed";
          srcEl.style.color = "#52c41a";
        }
        updatePricePreview();
      });
    });
    
    ["erp-pkg-weight","erp-pkg-length","erp-pkg-width","erp-pkg-height"].forEach(function(id){
      var el = document.getElementById(id);
      if(el) el.addEventListener("input", updatePricePreview);
    });
    
    ["erp-profit-rate","erp-shipping-type"].forEach(function(id){
      var el = document.getElementById(id);
      if(el) {
        el.addEventListener("change", updatePricePreview);
        el.addEventListener("input", updatePricePreview);
      }
    });
    
    document.getElementById("erp-btn-translate-title").onclick = translateTitle;
    document.getElementById("erp-btn-generate-desc").onclick = generateDescription;
    document.getElementById("erp-btn-generate-tags").onclick = generateTags;
    document.getElementById("erp-btn-generate-rich").onclick = generateRichContent;
    
    document.querySelectorAll(".erp-rich-mode-btn").forEach(function(btn){
      btn.onclick = function(){ switchRichMode(this.dataset.mode); };
    });
    
    var jsonTextarea = document.getElementById("erp-rich-json-text");
    if (jsonTextarea) {
      jsonTextarea.addEventListener("input", function(){
        editorState.richContentJson = this.value;
      });
    }
    
    loadStores();
    loadCategoryTree();
    updateImagePanels();
    renderRichVisualEditor();
        setTimeout(updatePricePreview, 500);
  }
  
  function hideFullscreenEditor() {
    localStorage.setItem(PANEL_MIN_KEY, "1");
    if (panelEl) panelEl.style.display = "none";
    if (maskEl) maskEl.style.display = "none";
    showFloatingButton();
  }
  
  function updateEditorStatus(msg) {
    var el = document.getElementById("erp-editor-status");
    if (el) el.textContent = msg;
  }
  
  // ===== 图片面板渲染（强化版）=====
  function updateImagePanels() {
    var mainContainer = document.getElementById("erp-main-images");
    var detailContainer = document.getElementById("erp-detail-images");
    var countEl = document.getElementById("erp-img-count");
    
    if (countEl) countEl.textContent = "(" + editorImages.length + "张)";
    
    var mainImages = editorImages.filter(function(img) { return img.isMain; });
    var detailImages = editorImages.filter(function(img) { return !img.isMain; });
    
    if (mainContainer) {
      mainContainer.innerHTML = mainImages.map(function(img, idx) {
        return renderImageCard(img, idx, "main");
      }).join("") || '<div style="color:#999;font-size:11px;grid-column:1/-1;text-align:center;padding:20px;">暂无主图</div>';
    }
    
    if (detailContainer) {
      detailContainer.innerHTML = detailImages.map(function(img, idx) {
        return renderImageCard(img, idx + mainImages.length, "detail");
      }).join("") || '<div style="color:#999;font-size:11px;grid-column:1/-1;text-align:center;padding:10px;">暂无详情图</div>';
    }
    
    bindImageButtons();
  }
  
  function renderImageCard(img, idx, type) {
    var displayUrl = img.enhancedUrl || img.translatedUrl || img.originalUrl;
    var statusText = "", statusColor = "#999";
    
    if (img.status === "translating") { statusText = "⏳ 翻译中..."; statusColor = "#fa8c16"; }
    else if (img.status === "translated") { statusText = "✅ 已翻译"; statusColor = "#52c41a"; }
    else if (img.status === "enhancing") { statusText = "⏳ AI生成中..."; statusColor = "#1677ff"; }
    else if (img.status === "enhanced") { statusText = "✨ 已改造"; statusColor = "#722ed1"; }
    
    return '<div style="background:#f9fafb;border-radius:8px;padding:8px;border:1px solid #f0f0f0;">' +
      // 图片可点击放大（强力阻止冒泡）
      '<div class="erp-img-clickable" data-index="' + idx + '" style="position:relative;cursor:zoom-in;overflow:hidden;border-radius:6px;margin-bottom:8px;background:#f0f0f0;" draggable="false">' +
        '<img src="' + escapeHtml(displayUrl) + '" style="width:100%;aspect-ratio:1;object-fit:cover;display:block;pointer-events:none;user-select:none;" loading="lazy" draggable="false"/>' +
        '<div style="position:absolute;top:4px;right:4px;background:rgba(0,0,0,0.7);color:#fff;padding:2px 8px;border-radius:10px;font-size:10px;pointer-events:none;font-weight:600;">' + (idx + 1) + '</div>' +
        '<div style="position:absolute;bottom:4px;left:4px;background:rgba(0,0,0,0.7);color:#fff;padding:2px 8px;border-radius:10px;font-size:10px;pointer-events:none;">🔍 点击放大</div>' +
      '</div>' +
      // 状态文字
      '<div style="font-size:10px;color:' + statusColor + ';margin-bottom:6px;text-align:center;height:14px;font-weight:600;">' + statusText + '</div>' +
      // 按钮（带文字）
      '<div style="display:flex;flex-direction:column;gap:4px;">' +
        '<button class="erp-btn-translate" data-index="' + idx + '" title="把图片中的中文翻译成俄文（重新生成）" style="padding:5px 6px;font-size:11px;background:#fff;border:1px solid #667eea;border-radius:4px;color:#667eea;cursor:pointer;font-weight:600;">🌍 翻译为俄文</button>' +
        '<button class="erp-btn-enhance" data-index="' + idx + '" title="AI重新生成爆款风格图片" style="padding:5px 6px;font-size:11px;background:#fff;border:1px solid #722ed1;border-radius:4px;color:#722ed1;cursor:pointer;font-weight:600;">✨ AI改造图片</button>' +
      '</div>' +
    '</div>';
  }
  
  function bindImageButtons() {
    document.querySelectorAll(".erp-btn-translate").forEach(function(btn) {
      btn.onclick = function(e) { 
        e.stopPropagation();
        e.preventDefault();
        translateImage(parseInt(this.dataset.index));
        return false;
      };
    });
    document.querySelectorAll(".erp-btn-enhance").forEach(function(btn) {
      btn.onclick = function(e) { 
        e.stopPropagation();
        e.preventDefault();
        enhanceImage(parseInt(this.dataset.index));
        return false;
      };
    });
    
    // 图片点击放大（强力阻止冒泡）
    document.querySelectorAll(".erp-img-clickable").forEach(function(box) {
      var newBox = box.cloneNode(true);
      box.parentNode.replaceChild(newBox, box);
      
      newBox.addEventListener("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();
        openImageViewer(parseInt(this.dataset.index));
        return false;
      }, true);
      
      newBox.querySelectorAll("img, div").forEach(function(child){
        child.addEventListener("click", function(e){
          e.stopPropagation();
          e.preventDefault();
          e.stopImmediatePropagation();
          return false;
        }, true);
      });
    });
  }

  // ===== 图片大图查看器（强力版）=====
  function openImageViewer(startIdx) {
    var oldViewer = document.getElementById("erp-image-viewer");
    if (oldViewer) oldViewer.remove();
    
    var currentIdx = startIdx;
    
    var viewerEl = document.createElement("div");
    viewerEl.id = "erp-image-viewer";
    viewerEl.style.cssText = [
      "position: fixed !important",
      "top: 0 !important",
      "left: 0 !important",
      "right: 0 !important",
      "bottom: 0 !important",
      "width: 100vw !important",
      "height: 100vh !important",
      "background: rgba(0,0,0,0.95) !important",
      "z-index: 2147483647 !important",
      "display: flex !important",
      "align-items: center !important",
      "justify-content: center !important",
      "flex-direction: column !important",
      "margin: 0 !important",
      "padding: 0 !important",
      "border: none !important"
    ].join(";");
    
    function render() {
      var img = editorImages[currentIdx];
      if (!img) return;
      var displayUrl = img.enhancedUrl || img.translatedUrl || img.originalUrl;
      var hasMultipleVersions = !!(img.translatedUrl || img.enhancedUrl);
      
      viewerEl.innerHTML = '';
      
      var topBar = document.createElement("div");
      topBar.style.cssText = "position:absolute;top:0;left:0;right:0;background:rgba(0,0,0,0.85);color:#fff;padding:14px 24px;display:flex;justify-content:space-between;align-items:center;z-index:10;";
      topBar.innerHTML = 
        '<div style="font-size:15px;font-weight:600;color:#fff;">' +
          '图片 ' + (currentIdx + 1) + ' / ' + editorImages.length + ' ' + 
          (img.isMain ? '<span style="background:#667eea;padding:3px 10px;border-radius:12px;font-size:12px;margin-left:10px;">主图</span>' : '<span style="background:#888;padding:3px 10px;border-radius:12px;font-size:12px;margin-left:10px;">详情图</span>') +
        '</div>';
      
      var closeBtn = document.createElement("button");
      closeBtn.textContent = "✕ 关闭";
      closeBtn.style.cssText = "background:#ff4d4f !important;color:#fff !important;border:none !important;padding:10px 20px !important;border-radius:8px !important;cursor:pointer !important;font-size:14px !important;font-weight:600 !important;box-shadow:0 4px 12px rgba(255,77,79,0.4) !important;";
      closeBtn.addEventListener("click", function(e){
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();
        close();
        return false;
      }, true);
      topBar.appendChild(closeBtn);
      viewerEl.appendChild(topBar);
      
      var imgContainer = document.createElement("div");
      imgContainer.style.cssText = "display:flex;align-items:center;justify-content:center;max-width:85vw;max-height:75vh;";
      
      var bigImg = document.createElement("img");
      bigImg.src = displayUrl;
      bigImg.style.cssText = "max-width:85vw;max-height:75vh;object-fit:contain;border-radius:8px;box-shadow:0 8px 40px rgba(0,0,0,0.6);user-select:none;-webkit-user-drag:none;";
      bigImg.draggable = false;
      bigImg.addEventListener("click", function(e){
        e.stopPropagation();
        e.preventDefault();
        return false;
      }, true);
      imgContainer.appendChild(bigImg);
      viewerEl.appendChild(imgContainer);
      
      if (editorImages.length > 1) {
        var prevBtn = document.createElement("button");
        prevBtn.textContent = "‹";
        prevBtn.style.cssText = "position:absolute !important;left:20px !important;top:50% !important;transform:translateY(-50%) !important;background:rgba(255,255,255,0.25) !important;color:#fff !important;border:none !important;width:60px !important;height:60px !important;border-radius:50% !important;cursor:pointer !important;font-size:32px !important;font-weight:bold !important;z-index:10 !important;line-height:1 !important;";
        prevBtn.addEventListener("click", function(e){
          e.stopPropagation();
          e.preventDefault();
          currentIdx = (currentIdx - 1 + editorImages.length) % editorImages.length;
          render();
          return false;
        }, true);
        viewerEl.appendChild(prevBtn);
        
        var nextBtn = document.createElement("button");
        nextBtn.textContent = "›";
        nextBtn.style.cssText = "position:absolute !important;right:20px !important;top:50% !important;transform:translateY(-50%) !important;background:rgba(255,255,255,0.25) !important;color:#fff !important;border:none !important;width:60px !important;height:60px !important;border-radius:50% !important;cursor:pointer !important;font-size:32px !important;font-weight:bold !important;z-index:10 !important;line-height:1 !important;";
        nextBtn.addEventListener("click", function(e){
          e.stopPropagation();
          e.preventDefault();
          currentIdx = (currentIdx + 1) % editorImages.length;
          render();
          return false;
        }, true);
        viewerEl.appendChild(nextBtn);
      }
      
      if (hasMultipleVersions) {
        var bottomBar = document.createElement("div");
        bottomBar.style.cssText = "position:absolute;bottom:60px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.85);color:#fff;padding:12px 20px;border-radius:30px;display:flex;gap:10px;align-items:center;z-index:10;";
        bottomBar.innerHTML = '<span style="font-size:13px;margin-right:10px;color:#fff;">查看版本：</span>';
        
        var versions = [
          {key:"original", label:"原图", color:"#667eea", url:img.originalUrl},
          {key:"translated", label:"🌍 翻译版", color:"#52c41a", url:img.translatedUrl},
          {key:"enhanced", label:"✨ AI改造版", color:"#722ed1", url:img.enhancedUrl}
        ];
        
        versions.forEach(function(v){
          if (!v.url) return;
          var verBtn = document.createElement("button");
          verBtn.textContent = v.label;
          var isActive = displayUrl === v.url;
          verBtn.style.cssText = "padding:6px 14px !important;background:" + (isActive ? v.color : "rgba(255,255,255,0.15)") + " !important;color:#fff !important;border:none !important;border-radius:18px !important;cursor:pointer !important;font-size:12px !important;font-weight:600 !important;";
          verBtn.addEventListener("click", function(e){
            e.stopPropagation();
            e.preventDefault();
            bigImg.src = v.url;
            bottomBar.querySelectorAll("button").forEach(function(b){
              b.style.setProperty("background", "rgba(255,255,255,0.15)", "important");
            });
            verBtn.style.setProperty("background", v.color, "important");
            return false;
          }, true);
          bottomBar.appendChild(verBtn);
        });
        
        viewerEl.appendChild(bottomBar);
      }
      
      var tipEl = document.createElement("div");
      tipEl.style.cssText = "position:absolute;bottom:20px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,0.6);font-size:12px;z-index:10;";
      tipEl.textContent = "← → 切换 | ESC 关闭 | 点击空白处关闭";
      viewerEl.appendChild(tipEl);
    }
    
    function close() {
      try {
        if (viewerEl && viewerEl.parentNode) {
          viewerEl.parentNode.removeChild(viewerEl);
        }
      } catch(e) {}
      document.removeEventListener("keydown", keyHandler, true);
      document.body.style.overflow = "";
    }
    
    function keyHandler(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        e.preventDefault();
        close();
      } else if (e.key === "ArrowLeft") {
        e.stopPropagation();
        e.preventDefault();
        currentIdx = (currentIdx - 1 + editorImages.length) % editorImages.length;
        render();
      } else if (e.key === "ArrowRight") {
        e.stopPropagation();
        e.preventDefault();
        currentIdx = (currentIdx + 1) % editorImages.length;
        render();
      }
    }
    
    viewerEl.addEventListener("click", function(e){
      if (e.target === viewerEl) {
        e.stopPropagation();
        e.preventDefault();
        close();
      }
    }, true);
    
    document.body.appendChild(viewerEl);
    document.body.style.overflow = "hidden";
    render();
    document.addEventListener("keydown", keyHandler, true);
  }
  // ===== 富内容可视化编辑器 =====
  function switchRichMode(mode) {
    editorState.richContentMode = mode;
    
    document.querySelectorAll(".erp-rich-mode-btn").forEach(function(btn){
      var active = btn.dataset.mode === mode;
      btn.style.background = active ? "#667eea" : "#fff";
      btn.style.color = active ? "#fff" : "#666";
      btn.style.borderColor = active ? "#667eea" : "#ddd";
    });
    
    if (mode === "visual") {
      try {
        var json = document.getElementById("erp-rich-json-text").value.trim();
        if (json) {
          var parsed = JSON.parse(json);
          if (Array.isArray(parsed)) editorState.richContentBlocks = parsed;
        }
      } catch(e) { console.warn("JSON解析失败:", e); }
      document.getElementById("erp-rich-visual-editor").style.display = "block";
      document.getElementById("erp-rich-json-editor").style.display = "none";
      renderRichVisualEditor();
    } else {
      var json = JSON.stringify(editorState.richContentBlocks, null, 2);
      document.getElementById("erp-rich-json-text").value = json;
      editorState.richContentJson = json;
      document.getElementById("erp-rich-visual-editor").style.display = "none";
      document.getElementById("erp-rich-json-editor").style.display = "block";
    }
  }
  
  function renderRichVisualEditor() {
    var el = document.getElementById("erp-rich-visual-editor");
    if (!el) return;
    
    var html = '<div style="display:flex;gap:4px;margin-bottom:8px;">' +
      '<button onclick="window.__erpAddBlock(\'heading\')" style="flex:1;padding:4px 8px;font-size:10px;background:#f0f5ff;color:#667eea;border:1px solid #c7d2fe;border-radius:4px;cursor:pointer;">+ 标题</button>' +
      '<button onclick="window.__erpAddBlock(\'paragraph\')" style="flex:1;padding:4px 8px;font-size:10px;background:#f0fdf4;color:#16a34a;border:1px solid #86efac;border-radius:4px;cursor:pointer;">+ 段落</button>' +
      '<button onclick="window.__erpAddBlock(\'list\')" style="flex:1;padding:4px 8px;font-size:10px;background:#fef7ff;color:#a855f7;border:1px solid #e9d5ff;border-radius:4px;cursor:pointer;">+ 列表</button>' +
    '</div>';
    
    if (editorState.richContentBlocks.length === 0) {
      html += '<div style="text-align:center;color:#bbb;font-size:11px;padding:20px;border:1px dashed #ddd;border-radius:6px;">点击上方按钮添加内容块</div>';
    } else {
      html += editorState.richContentBlocks.map(function(block, idx){
        return renderRichBlock(block, idx);
      }).join("");
    }
    
    el.innerHTML = html;
    bindRichBlockEvents();
  }
  
  function renderRichBlock(block, idx) {
    var typeIcon = block.type === "heading" ? "🏷️" : (block.type === "list" ? "📋" : "📄");
    var typeName = block.type === "heading" ? "标题" : (block.type === "list" ? "列表" : "段落");
    var typeColor = block.type === "heading" ? "#667eea" : (block.type === "list" ? "#a855f7" : "#16a34a");
    
    var content = "";
    if (block.type === "list") {
      content = '<div class="erp-list-items" data-idx="' + idx + '">';
      (block.items || []).forEach(function(item, i){
        content += '<div style="display:flex;gap:4px;margin-bottom:4px;">' +
          '<input type="text" value="' + escapeHtml(item) + '" data-block="' + idx + '" data-item="' + i + '" class="erp-list-item-input" style="flex:1;padding:4px 6px;border:1px solid #e2e8f0;border-radius:3px;font-size:11px;outline:none;"/>' +
          '<button data-block="' + idx + '" data-item="' + i + '" class="erp-list-item-del" style="padding:2px 6px;font-size:10px;background:#fff2f0;color:#ff4d4f;border:1px solid #ffccc7;border-radius:3px;cursor:pointer;">✕</button>' +
          '</div>';
      });
      content += '<button data-block="' + idx + '" class="erp-list-item-add" style="padding:4px 8px;font-size:10px;background:#f5f5f5;color:#666;border:1px dashed #ddd;border-radius:3px;cursor:pointer;width:100%;">+ 添加项</button>';
      content += '</div>';
    } else {
      content = '<input type="text" value="' + escapeHtml(block.content || "") + '" data-block="' + idx + '" class="erp-block-input" placeholder="' + (block.type === "heading" ? "输入标题..." : "输入段落内容...") + '" style="width:100%;padding:6px 8px;border:1px solid #e2e8f0;border-radius:4px;font-size:11px;outline:none;"/>';
    }
    
    return '<div style="background:#fafafa;border:1px solid #f0f0f0;border-radius:6px;padding:8px;margin-bottom:6px;">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">' +
        '<span style="font-size:10px;font-weight:600;color:' + typeColor + ';">' + typeIcon + ' ' + typeName + '</span>' +
        '<div style="display:flex;gap:2px;">' +
          '<button data-idx="' + idx + '" class="erp-block-up" style="padding:1px 5px;font-size:10px;background:#fff;border:1px solid #ddd;border-radius:3px;cursor:pointer;" title="上移">↑</button>' +
          '<button data-idx="' + idx + '" class="erp-block-down" style="padding:1px 5px;font-size:10px;background:#fff;border:1px solid #ddd;border-radius:3px;cursor:pointer;" title="下移">↓</button>' +
          '<button data-idx="' + idx + '" class="erp-block-del" style="padding:1px 5px;font-size:10px;background:#fff2f0;color:#ff4d4f;border:1px solid #ffccc7;border-radius:3px;cursor:pointer;" title="删除">✕</button>' +
        '</div>' +
      '</div>' +
      content +
    '</div>';
  }
  
  function bindRichBlockEvents() {
    document.querySelectorAll(".erp-block-input").forEach(function(input){
      input.oninput = function(){
        var idx = parseInt(this.dataset.block);
        if (editorState.richContentBlocks[idx]) {
          editorState.richContentBlocks[idx].content = this.value;
        }
      };
    });
    
    document.querySelectorAll(".erp-list-item-input").forEach(function(input){
      input.oninput = function(){
        var bIdx = parseInt(this.dataset.block);
        var iIdx = parseInt(this.dataset.item);
        if (editorState.richContentBlocks[bIdx] && editorState.richContentBlocks[bIdx].items) {
          editorState.richContentBlocks[bIdx].items[iIdx] = this.value;
        }
      };
    });
    
    document.querySelectorAll(".erp-list-item-del").forEach(function(btn){
      btn.onclick = function(){
        var bIdx = parseInt(this.dataset.block);
        var iIdx = parseInt(this.dataset.item);
        if (editorState.richContentBlocks[bIdx] && editorState.richContentBlocks[bIdx].items) {
          editorState.richContentBlocks[bIdx].items.splice(iIdx, 1);
          renderRichVisualEditor();
        }
      };
    });
    
    document.querySelectorAll(".erp-list-item-add").forEach(function(btn){
      btn.onclick = function(){
        var bIdx = parseInt(this.dataset.block);
        if (editorState.richContentBlocks[bIdx]) {
          if (!editorState.richContentBlocks[bIdx].items) {
            editorState.richContentBlocks[bIdx].items = [];
          }
          editorState.richContentBlocks[bIdx].items.push("");
          renderRichVisualEditor();
        }
      };
    });
    
    document.querySelectorAll(".erp-block-up").forEach(function(btn){
      btn.onclick = function(){
        var idx = parseInt(this.dataset.idx);
        if (idx > 0) {
          var tmp = editorState.richContentBlocks[idx];
          editorState.richContentBlocks[idx] = editorState.richContentBlocks[idx-1];
          editorState.richContentBlocks[idx-1] = tmp;
          renderRichVisualEditor();
        }
      };
    });
    
    document.querySelectorAll(".erp-block-down").forEach(function(btn){
      btn.onclick = function(){
        var idx = parseInt(this.dataset.idx);
        if (idx < editorState.richContentBlocks.length - 1) {
          var tmp = editorState.richContentBlocks[idx];
          editorState.richContentBlocks[idx] = editorState.richContentBlocks[idx+1];
          editorState.richContentBlocks[idx+1] = tmp;
          renderRichVisualEditor();
        }
      };
    });
    
    document.querySelectorAll(".erp-block-del").forEach(function(btn){
      btn.onclick = function(){
        var idx = parseInt(this.dataset.idx);
        editorState.richContentBlocks.splice(idx, 1);
        renderRichVisualEditor();
      };
    });
  }
  
  window.__erpAddBlock = function(type) {
    var newBlock = {type: type};
    if (type === "list") newBlock.items = [""];
    else newBlock.content = "";
    editorState.richContentBlocks.push(newBlock);
    renderRichVisualEditor();
  };

  // ===== AI接口：翻译标题 =====
  async function translateTitle() {
    var btn = document.getElementById("erp-btn-translate-title");
    if (!btn || btn.disabled) return;
    
    btn.disabled = true;
    btn.textContent = "⏳ 翻译中...";
    updateEditorStatus("翻译标题...");
    
    try {
      var res = await new Promise(function(resolve) {
        chrome.runtime.sendMessage({
          action: "translateText",
          text: editorProductData.title,
          targetLang: "ru"
        }, resolve);
      });
      
      if (res && res.success && res.data && res.data.translation) {
        editorState.titleRu = res.data.translation;
        document.getElementById("erp-title-ru").value = editorState.titleRu;
        updateEditorStatus("✅ 标题翻译完成");
      } else {
        updateEditorStatus("❌ 标题翻译失败");
        alert("标题翻译失败：" + (res && res.error || "未知错误"));
      }
    } catch(e) {
      updateEditorStatus("❌ 翻译失败");
      alert("翻译失败：" + e.message);
    }
    
    btn.disabled = false;
    btn.textContent = "🌍 AI翻译为俄文";
  }
  
  // ===== AI接口：生成简介 =====
  async function generateDescription() {
    var btn = document.getElementById("erp-btn-generate-desc");
    if (!btn || btn.disabled) return;
    
    btn.disabled = true;
    btn.textContent = "⏳ 生成中...";
    updateEditorStatus("生成简介...");
    
    try {
      var titleRu = document.getElementById("erp-title-ru").value.trim();
      var weight = parseFloat(document.getElementById("erp-pkg-weight").value) || 0;
      
      var res = await new Promise(function(resolve) {
        chrome.runtime.sendMessage({
          action: "generateDescription",
          product: {
            title: titleRu || editorProductData.title,
            processedTitle: titleRu,
            weight: weight,
            dimensions: {
              length: parseFloat(document.getElementById("erp-pkg-length").value) || 0,
              width: parseFloat(document.getElementById("erp-pkg-width").value) || 0,
              height: parseFloat(document.getElementById("erp-pkg-height").value) || 0
            },
            skus: editorProductData.skus,
            styleHint: document.getElementById("erp-style-hint").value || ""
          }
        }, resolve);
      });
      
      if (res && res.success && res.data && res.data.description) {
        editorState.descRu = res.data.description;
        document.getElementById("erp-desc-ru").value = editorState.descRu;
        updateEditorStatus("✅ 简介生成完成");
      } else {
        updateEditorStatus("❌ 简介生成失败");
        alert("简介生成失败：" + (res && res.error || "未知错误"));
      }
    } catch(e) {
      updateEditorStatus("❌ 生成失败");
      alert("生成失败：" + e.message);
    }
    
    btn.disabled = false;
    btn.textContent = "🤖 AI生成俄文简介";
  }
  
  // ===== AI接口：生成标签 =====
  async function generateTags() {
    var btn = document.getElementById("erp-btn-generate-tags");
    if (!btn || btn.disabled) return;
    
    btn.disabled = true;
    btn.textContent = "⏳ 生成中...";
    updateEditorStatus("生成标签...");
    
    try {
      var titleRu = document.getElementById("erp-title-ru").value.trim();
      var descRu = document.getElementById("erp-desc-ru").value.trim();
      
      var res = await new Promise(function(resolve) {
        chrome.runtime.sendMessage({
          action: "generateTags",
          product: {
            title: titleRu || editorProductData.title,
            processedTitle: titleRu
          },
          description: descRu
        }, resolve);
      });
      
      if (res && res.success && res.data && res.data.tags) {
        editorState.tags = Array.isArray(res.data.tags) ? res.data.tags.join(", ") : res.data.tags;
        document.getElementById("erp-tags").value = editorState.tags;
        updateEditorStatus("✅ 标签生成完成");
      } else {
        updateEditorStatus("❌ 标签生成失败");
        alert("标签生成失败：" + (res && res.error || "未知错误"));
      }
    } catch(e) {
      updateEditorStatus("❌ 生成失败");
      alert("生成失败：" + e.message);
    }
    
    btn.disabled = false;
    btn.textContent = "🤖 AI生成俄文标签";
  }
  
  // ===== AI接口：生成富内容 =====
  async function generateRichContent() {
    var btn = document.getElementById("erp-btn-generate-rich");
    if (!btn || btn.disabled) return;
    
    btn.disabled = true;
    btn.textContent = "⏳ 生成中...";
    updateEditorStatus("生成富内容...");
    
    try {
      var titleRu = document.getElementById("erp-title-ru").value.trim();
      var descRu = document.getElementById("erp-desc-ru").value.trim();
      
      var res = await new Promise(function(resolve) {
        chrome.runtime.sendMessage({
          action: "generateRichContent",
          product: {
            title: titleRu || editorProductData.title,
            processedTitle: titleRu
          },
          description: descRu
        }, resolve);
      });
      
      if (res && res.success && res.data && res.data.richContent) {
        var rc = res.data.richContent;
        if (Array.isArray(rc)) {
          editorState.richContentBlocks = rc.map(function(item){
            if (item.type === "list" || item.items) {
              return {type: "list", items: item.items || []};
            } else if (item.type === "heading") {
              return {type: "heading", content: item.content || ""};
            } else {
              return {type: "paragraph", content: item.content || ""};
            }
          });
        }
        editorState.richContentJson = JSON.stringify(editorState.richContentBlocks, null, 2);
        
        if (editorState.richContentMode === "visual") {
          renderRichVisualEditor();
        } else {
          document.getElementById("erp-rich-json-text").value = editorState.richContentJson;
        }
        
        updateEditorStatus("✅ 富内容生成完成");
      } else {
        updateEditorStatus("❌ 富内容生成失败");
        alert("富内容生成失败：" + (res && res.error || "未知错误"));
      }
    } catch(e) {
      updateEditorStatus("❌ 生成失败");
      alert("生成失败：" + e.message);
    }
    
    btn.disabled = false;
    btn.textContent = "🤖 AI生成富内容";
  }
  
  // ===== AI接口：翻译图片 =====
  async function translateImage(idx) {
    if (!editorImages[idx]) return;
    var img = editorImages[idx];
    
    img.status = "translating";
    updateImagePanels();
    updateEditorStatus("翻译图片 " + (idx + 1) + "...");
    
    try {
      var res = await new Promise(function(resolve) {
        chrome.runtime.sendMessage({
          action: "translateImage",
          imageUrl: img.originalUrl,
          styleHint: document.getElementById("erp-style-hint") ? document.getElementById("erp-style-hint").value : ""
        }, resolve);
      });
      
      if (res && res.success && res.data && res.data.url) {
        img.translatedUrl = res.data.url;
        img.status = "translated";
        updateEditorStatus("✅ 图片 " + (idx + 1) + " 翻译完成");
      } else {
        img.status = "original";
        updateEditorStatus("❌ 图片翻译失败");
      }
    } catch(e) {
      img.status = "original";
      updateEditorStatus("❌ " + e.message);
    }
    
    updateImagePanels();
  }
  
  // ===== AI接口：AI改造图片 =====
  async function enhanceImage(idx) {
    if (!editorImages[idx]) return;
    var img = editorImages[idx];
    
    img.status = "enhancing";
    updateImagePanels();
    updateEditorStatus("AI改造图片 " + (idx + 1) + "...");
    
    try {
      var res = await new Promise(function(resolve) {
        chrome.runtime.sendMessage({
          action: "enhanceImage",
          imageUrl: img.originalUrl,
          styleHint: document.getElementById("erp-style-hint") ? document.getElementById("erp-style-hint").value : ""
        }, resolve);
      });
      
      if (res && res.success && res.data && res.data.url) {
        img.enhancedUrl = res.data.url;
        img.status = "enhanced";
        updateEditorStatus("✅ 图片 " + (idx + 1) + " AI改造完成");
      } else {
        img.status = "original";
        updateEditorStatus("❌ AI改造失败");
      }
    } catch(e) {
      img.status = "original";
      updateEditorStatus("❌ " + e.message);
    }
    
    updateImagePanels();
  }
  
    // ===== 加载店铺（增强版）=====
  function loadStores() {
    var el = document.getElementById("erp-store-list");
    if (!el) return;
    
    el.innerHTML = '<div style="color:#999;font-size:11px;padding:6px;">⏳ 加载店铺中...</div>';
    
    chrome.runtime.sendMessage({action:"getStores"}, function(res){
      console.log("📦 [loadStores] 完整响应:", res);
      
      if (!res) {
        el.innerHTML = '<div style="color:#ff4d4f;font-size:11px;padding:6px;">⚠️ 插件无响应</div>';
        return;
      }
      
      if (!res.success) {
        el.innerHTML = '<div style="color:#ff4d4f;font-size:11px;padding:6px;">⚠️ ' + (res.error || "失败") + '</div>';
        return;
      }
      
      // 🔧 兼容多种返回格式
      var stores = null;
      if (res.data && res.data.data && Array.isArray(res.data.data)) {
        stores = res.data.data;
      } else if (res.data && Array.isArray(res.data)) {
        stores = res.data;
      } else if (Array.isArray(res)) {
        stores = res;
      }
      
      console.log("📦 [loadStores] 解析到店铺:", stores);
      
      if (!stores || !stores.length) {
        el.innerHTML = '<div style="color:#ff4d4f;font-size:11px;padding:6px;">⚠️ 暂无店铺，请先去<a href="https://ozonerp.chaowei.online" target="_blank" style="color:#667eea;">后台配置</a></div>';
        return;
      }
      
      el.innerHTML = stores.map(function(s){
        return '<label style="display:flex;align-items:center;gap:6px;padding:4px 0;font-size:11px;cursor:pointer;">' +
          '<input type="checkbox" class="erp-store-cb" value="' + escapeHtml(s.id) + '" checked/>' +
          '<span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escapeHtml(s.name) + '</span>' +
          '</label>';
      }).join("");
    });
  }
  
  // ===== 加载Ozon类目树 =====
  var _cachedCategoryTree = null;
  
  async function loadCategoryTree() {
    var el = document.getElementById("erp-category-tree");
    if (!el) return;
    
    if (_cachedCategoryTree) {
      renderCategoryTree(_cachedCategoryTree);
      return;
    }
    
    el.innerHTML = '<div style="color:#667eea;font-size:11px;text-align:center;padding:10px;">⏳ 加载类目中...</div>';
    
    var urls = [
      "https://cdn.jsdelivr.net/gh/qq155630/leimu@main/ozon_%E7%9C%9F%E5%AE%9E%E4%BD%A3%E9%87%91_%E5%AE%8C%E6%95%B4%E7%89%88%20-%20%E5%89%AF%E6%9C%AC.TSV",
      "https://raw.githubusercontent.com/qq155630/leimu/main/ozon_%E7%9C%9F%E5%AE%9E%E4%BD%A3%E9%87%91_%E5%AE%8C%E6%95%B4%E7%89%88%20-%20%E5%89%AF%E6%9C%AC.TSV"
    ];
    
    var text = null;
    for (var i = 0; i < urls.length; i++) {
      try {
        var res = await fetch(urls[i]);
        if (!res.ok) continue;
        var buffer = await res.arrayBuffer();
        var decoders = ["utf-8", "gbk", "gb2312"];
        for (var d = 0; d < decoders.length; d++) {
          try {
            var decoder = new TextDecoder(decoders[d], {fatal: false});
            var decoded = decoder.decode(buffer);
            var chineseCount = (decoded.substring(0,200).match(/[\u4e00-\u9fa5]/g) || []).length;
            if (chineseCount > 5) { text = decoded; break; }
          } catch(e){}
        }
        if (text) break;
      } catch(e){}
    }
    
    if (!text) {
      el.innerHTML = '<div style="color:#ff4d4f;font-size:11px;text-align:center;padding:10px;">❌ 类目加载失败</div>';
      return;
    }
    
    var firstLine = text.split(/\r?\n/)[0];
    var separator = firstLine.indexOf("\t") >= 0 ? "\t" : ",";
    var lines = text.split(/\r?\n/).filter(Boolean);
    lines.shift();
    
    var tree = {};
    for (var li = 0; li < lines.length; li++) {
      var cols = lines[li].split(separator);
      if (cols.length < 5) continue;
      var c1 = (cols[0]||"").trim();
      var c2 = (cols[1]||"").trim();
      var c3 = (cols[2]||"").trim();
      var catId = (cols[3]||"").trim();
      var typeId = (cols[4]||"").trim();
      if (!c1 || c1.length > 50 || c1 === '"') continue;
      if (!catId || !typeId) continue;
      if (catId.length < 3 || typeId.length < 3) continue;
      if (!/^\d+$/.test(catId) || !/^\d+$/.test(typeId)) continue;
      
      if (!tree[c1]) tree[c1] = {};
      if (!tree[c1][c2]) tree[c1][c2] = [];
      var name = c3 || c2;
      tree[c1][c2].push({name: name, c1: c1, c2: c2, c3: c3, categoryId: catId, typeId: typeId});
    }
    
    _cachedCategoryTree = tree;
    renderCategoryTree(tree);
    
    var searchInput = document.getElementById("erp-category-search");
    if (searchInput) {
      searchInput.oninput = function(){
        filterCategoryTree(this.value);
      };
    }
  }
  
  function renderCategoryTree(tree) {
    var el = document.getElementById("erp-category-tree");
    if (!el) return;
    
    var html = "";
    for (var c1 in tree) {
      html += '<details class="erp-cat-c1" style="margin-bottom:3px;"><summary style="cursor:pointer;font-weight:bold;font-size:11px;color:#333;padding:3px 0;outline:none;">📁 ' + escapeHtml(c1) + '</summary><div style="padding-left:12px;margin-top:2px;">';
      for (var c2 in tree[c1]) {
        html += '<details class="erp-cat-c2" style="margin-bottom:2px;"><summary style="cursor:pointer;font-weight:600;font-size:11px;color:#555;padding:2px 0;outline:none;">📂 ' + escapeHtml(c2) + '</summary><div style="padding-left:12px;margin-top:2px;">';
        tree[c1][c2].forEach(function(item){
          var val = item.categoryId + "|" + item.typeId;
          var searchKey = (item.c1 + " " + item.c2 + " " + item.name).toLowerCase();
          html += '<label class="erp-cat-option" data-search="' + escapeHtml(searchKey) + '" style="display:block;padding:3px 6px;font-size:11px;cursor:pointer;color:#444;border-radius:3px;">' +
            '<input type="radio" name="erp-category" value="' + val + '" data-name="' + escapeHtml(item.name) + '" data-c1="' + escapeHtml(item.c1) + '" data-c2="' + escapeHtml(item.c2) + '" style="margin-right:6px;"/>' +
            '📄 ' + escapeHtml(item.name) +
            '</label>';
        });
        html += '</div></details>';
      }
      html += '</div></details>';
    }
    el.innerHTML = html;

     // 🔧 重新绑定搜索框
    var searchInput = document.getElementById("erp-category-search");
    if (searchInput) {
      searchInput.oninput = function(){
        filterCategoryTree(this.value);
      };
    }
    
    el.addEventListener("change", function(e){
      if (e.target && e.target.name === "erp-category") {
        var parts = e.target.value.split("|");
        editorState.selectedCategory = {
          categoryId: parts[0],
          typeId: parts[1],
          name: e.target.dataset.name,
          c1: e.target.dataset.c1,
          c2: e.target.dataset.c2
        };
        var selDiv = document.getElementById("erp-category-selected");
        if (selDiv) {
          selDiv.innerHTML = "✅ 已选: " + escapeHtml(e.target.dataset.c1) + " > " + escapeHtml(e.target.dataset.c2) + " > " + escapeHtml(e.target.dataset.name);
        }
      }
    });
  }
  
  function filterCategoryTree(keyword) {
    var el = document.getElementById("erp-category-tree");
    if (!el) return;
    keyword = String(keyword || "").toLowerCase().trim();
    
    if (!keyword) {
      el.querySelectorAll(".erp-cat-option").forEach(function(i){i.style.display = "";});
      el.querySelectorAll(".erp-cat-c1, .erp-cat-c2").forEach(function(d){d.style.display = ""; d.open = false;});
      return;
    }
    
    el.querySelectorAll(".erp-cat-option").forEach(function(item){
      var s = (item.dataset.search || "").toLowerCase();
      item.style.display = s.indexOf(keyword) >= 0 ? "" : "none";
    });
    
    el.querySelectorAll(".erp-cat-c2").forEach(function(c2){
      var has = false;
      c2.querySelectorAll(".erp-cat-option").forEach(function(o){if (o.style.display !== "none") has = true;});
      c2.style.display = has ? "" : "none";
      if (has) c2.open = true;
    });
    
    el.querySelectorAll(".erp-cat-c1").forEach(function(c1){
      var has = false;
      c1.querySelectorAll(".erp-cat-c2").forEach(function(c2){if (c2.style.display !== "none") has = true;});
      c1.style.display = has ? "" : "none";
      if (has) c1.open = true;
    });
  }
  
  // ===== 价格预览 =====
  function updatePricePreview() {
    var el = document.getElementById("erp-price-preview");
    if (!el) return;
    
    var skuRadio = document.querySelector('input[name="erp-sku"]:checked');
    var costCny = skuRadio ? parseFloat(skuRadio.dataset.price) || 0 : 0;
    
    if (!costCny) { el.style.display = "none"; return; }
    
    var freight = editorProductData ? editorProductData.freight : 0;
    var totalCost = costCny + freight;
    var profitRate = Math.max(parseFloat(document.getElementById("erp-profit-rate").value) / 100 || 0.25, 0.15);
    var shippingType = document.getElementById("erp-shipping-type").value || "land";
    var weightG = parseFloat(document.getElementById("erp-pkg-weight").value) || 500;
    var dims = {
      length: parseFloat(document.getElementById("erp-pkg-length").value) || 0,
      width: parseFloat(document.getElementById("erp-pkg-width").value) || 0,
      height: parseFloat(document.getElementById("erp-pkg-height").value) || 0
    };
    
    var r = calculatePrice(totalCost, weightG, profitRate, shippingType, null, dims);
    if (!r || r.error) {
      el.style.display = "block";
      el.innerHTML = '<span style="color:#ff4d4f;">⚠️ ' + (r && r.error || '计算失败') + '</span>';
      return;
    }
    
    var channelLabel = shippingType === 'air' ? '空运' : (shippingType === 'air_land' ? '陆空联运' : '陆运');
    el.style.display = "block";
    el.innerHTML = "进价 ¥" + costCny + " + 运费 ¥" + freight + " = ¥" + totalCost.toFixed(2) + "<br>" +
      channelLabel + " " + r.shippingTier + " 运费 ¥" + r.shippingFee.toFixed(2) + "<br>" +
      "→ 售价约 <b style='color:#667eea;font-size:13px;'>" + r.price + " ₽</b>";
  }
  
  // ===== 开始上品 =====
  async function startUpload() {
    var btn = document.getElementById("erp-start-btn");
    if (!btn || btn.disabled) return;
    
    var stored = await new Promise(function(r){chrome.storage.local.get(["erp_token"], r);});
    if (!stored.erp_token) { alert("请先登录超维ERP！"); return; }
    
    var storeIds = Array.from(document.querySelectorAll(".erp-store-cb:checked")).map(function(cb){return cb.value;});
    if (!storeIds.length) { alert("请选择至少一个店铺！"); return; }
    
    if (!editorState.selectedCategory || !editorState.selectedCategory.categoryId) {
      alert("请选择Ozon类目！"); return;
    }
    
    var skuRadio = document.querySelector('input[name="erp-sku"]:checked');
    if (!skuRadio) { alert("请选择一个SKU！"); return; }
    
    var weightG = parseFloat(document.getElementById("erp-pkg-weight").value);
    if (!weightG || weightG <= 0) { alert("请填写包装重量（克）！"); return; }
    
    var titleRu = document.getElementById("erp-title-ru").value.trim();
    if (!titleRu) {
      if (!confirm("俄文标题为空，是否使用中文原标题？\n建议先点击「AI翻译」按钮")) return;
      titleRu = editorProductData.title;
    }
    
    var descRu = document.getElementById("erp-desc-ru").value.trim();
    var tags = document.getElementById("erp-tags").value.trim();
    
    var richContent = "";
    if (editorState.richContentMode === "json") {
      richContent = document.getElementById("erp-rich-json-text").value.trim();
    } else {
      richContent = JSON.stringify(editorState.richContentBlocks);
    }
    
    var allImages = editorImages.map(function(img){
      return img.enhancedUrl || img.translatedUrl || img.originalUrl;
    }).filter(Boolean);
    
    btn.disabled = true; btn.textContent = "⏳ 处理中..."; btn.style.opacity = "0.6";
    document.getElementById("erp-progress-area").style.display = "block";
    renderSteps("scrape", "loading", "切换SKU并抓取数据...");
    
    var skuIdx = parseInt(skuRadio.value);
    var skuResult = await selectSkuAndScrape(skuIdx);
    if (!skuResult || !skuResult.sku) {
      renderSteps("scrape", "error", "SKU切换失败");
      resetBtn(btn);
      return;
    }
    
    var productData = scrapeProductData();
    productData.selectedSku = skuResult.sku;
    productData.images = allImages;
    productData.weight = weightG;
    productData.dimensions = {
      length: parseFloat(document.getElementById("erp-pkg-length").value) || 10,
      width: parseFloat(document.getElementById("erp-pkg-width").value) || 10,
      height: parseFloat(document.getElementById("erp-pkg-height").value) || 10
    };
    
        productData.editorTitleRu = titleRu;
    productData.editorDescRu = descRu;
    productData.editorTags = tags;
    productData.editorRichContent = richContent;
    productData.processedTitle = titleRu;
    
    // 🎬 视频URL（如果有）
    if (editorProductData.video) {
      productData.video = editorProductData.video;
      console.log("🎬 [上品] 包含视频:", editorProductData.video);
    }
    
    var profitRate = Math.max(parseFloat(document.getElementById("erp-profit-rate").value) / 100 || 0.25, 0.15);
    var shippingType = document.getElementById("erp-shipping-type").value || "land";
    var styleHint = document.getElementById("erp-style-hint").value.trim();
    
    renderSteps("ai", "loading", "提交上品任务...");
    
    chrome.runtime.sendMessage({
      action: "aiAutoUpload",
      product: productData,
      config: {
        storeIds: storeIds,
        profitRate: profitRate,
        shippingType: shippingType,
        styleHint: styleHint,
        genDalle: false,
        defaultWeight: weightG / 1000,
        exchangeRate: 13,
        targetCategory: {
          keyword: editorState.selectedCategory.name,
          categoryId: editorState.selectedCategory.categoryId,
          typeId: editorState.selectedCategory.typeId
        }
      }
    }, function(res){
      if (!res || !res.success) {
        renderSteps("ai", "error", (res && res.error) || "提交失败");
        resetBtn(btn);
        return;
      }
      pollProgress(res.taskId, btn);
    });
  }
  
  async function pollProgress(taskId, btn) {
    for (var i = 0; i < 120; i++) {
      await sleep(5000);
      var res = await new Promise(function(resolve){
        chrome.runtime.sendMessage({action:"getTaskProgress", taskId:taskId}, resolve);
      });
      if (!res || !res.success) continue;
      var task = res.task;
      if (task.step) renderSteps(task.step, task.status || "loading", task.message || "");
      
      if (task.status === "done") {
        renderSteps("done", "done", "上品完成！");
        var successCount = (task.results || []).filter(function(r){return r.ok;}).length;
        btn.textContent = "✅ 成功 " + successCount + " 个店铺！点击继续";
        btn.style.background = "linear-gradient(135deg,#52c41a,#389e0d)";
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.onclick = function(){
          btn.textContent = "🚀 开始上品到 Ozon";
          btn.style.background = "linear-gradient(135deg,#667eea,#764ba2)";
          document.getElementById("erp-progress-area").style.display = "none";
          btn.onclick = startUpload;
        };
        return;
      }
      
      if (task.status === "error") {
        renderSteps(task.step || "ai", "error", task.message || "失败");
        resetBtn(btn);
        return;
      }
    }
    renderSteps("upload", "error", "超时");
    resetBtn(btn);
  }
  
  function resetBtn(btn) {
    if (!btn) return;
    btn.disabled = false;
    btn.style.opacity = "1";
    btn.textContent = "🚀 开始上品到 Ozon";
  }

  // ===== 初始化 =====
  function init() {
    injectUploadButton();
    console.log("✅ [1688] AI上品按钮已注入");
  }
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function(){
      setTimeout(init, 1500);
    });
  } else {
    setTimeout(init, 1500);
  }
  
  var lastUrl = location.href;
  setInterval(function(){
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      var oldBtn = document.getElementById("erp-1688-btn");
      if (oldBtn) oldBtn.remove();
      if (panelEl) { panelEl.remove(); panelEl = null; }
      if (maskEl) { maskEl.remove(); maskEl = null; }
      setTimeout(init, 2000);
    }
  }, 1000);

}