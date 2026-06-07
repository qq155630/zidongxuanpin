console.log("✅ [1688] 超维ERP AI上品已加载");

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
  function normalizeText(s){return String(s||"").replace(/\s+/g,"").trim();}
  function findClickableByTexts(texts,root){root=root||document;var els=Array.from(root.querySelectorAll("button,a,div,span"));for(var i=0;i<els.length;i++){var txt=normalizeText(els[i].innerText||els[i].textContent||"");for(var j=0;j<texts.length;j++){if(txt.includes(normalizeText(texts[j])))return els[i].closest("button,a,[role='button'],div,span")||els[i];}}return null;}
  function setInputValue(input,text){if(!input)return false;try{input.focus();if(input.tagName==="TEXTAREA"||input.tagName==="INPUT"){input.value=text;input.dispatchEvent(new Event("input",{bubbles:true}));input.dispatchEvent(new Event("change",{bubbles:true}));return true;}if(input.isContentEditable||input.tagName==="PRE"){input.innerHTML="";input.textContent=text;input.dispatchEvent(new Event("input",{bubbles:true}));input.dispatchEvent(new InputEvent("input",{bubbles:true,inputType:"insertText",data:text}));return true;}}catch(e){}return false;}
  function findChatInput(root){root=root||document;return root.querySelector('pre.edit[contenteditable="true"]')||root.querySelector("textarea")||root.querySelector('[contenteditable="true"]')||root.querySelector('[role="textbox"]');}
  function clickSendMessage(root){root=root||document;var btn=findClickableByTexts(["发送","Send"],root)||root.querySelector('button[type="submit"]');if(btn){btn.click();return true;}var input=findChatInput(root);if(input){input.focus();input.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:true}));return true;}return false;}

  // ===== 检测页面版本 =====
  function detectPageVersion(){
    if(document.querySelectorAll(".sku-filter-button").length>0) return "new_button";
    if(document.querySelectorAll(".expand-view-item").length>0) return "old_table";
    return "unknown";
  }

  // ===== 抓取所有SKU =====
  function scrapeAllSkus(){
    var version=detectPageVersion();
    var skus=[];
    if(version==="old_table"){
      document.querySelectorAll(".expand-view-item").forEach(function(item,idx){
        var label=item.querySelector(".item-label");
        var img=item.querySelector("img");
        var text=item.textContent||"";
        var pm=text.match(/¥\s*(\d+\.?\d*)/);
        var sm=text.match(/库存\s*(\d+)/);
        skus.push({index:idx,name:(label?label.textContent.trim():"SKU"+idx),price:pm?parseFloat(pm[1]):0,stock:sm?parseInt(sm[1]):0,image:img?(img.src||"").replace(/\.webp$/,"").replace(/_sum\.jpg$/,".jpg"):"",element:item,version:"old_table"});
      });
    }else if(version==="new_button"){
      document.querySelectorAll(".sku-filter-button").forEach(function(btn,idx){
        var img=btn.querySelector("img");
        skus.push({index:idx,name:btn.textContent.trim(),price:0,stock:0,image:img?(img.src||"").replace(/\.webp$/,"").replace(/_sum\.jpg$/,".jpg"):"",element:btn,version:"new_button"});
      });
    }
    return skus;
  }

  // ===== 从window.context抓包装数据 =====
  function scrapeSkuPackInfo(){
    var packInfo=[];
    try{
      var ctxStr=JSON.stringify(window.context);
      var regex=/\{[^{}]*"skuId"\s*:\s*\d+[^{}]*"weight"\s*:\s*\d+[^{}]*\}/g;
      var matches=ctxStr.match(regex);
      if(matches){
        matches.forEach(function(m){
          try{var obj=JSON.parse(m);if(obj.skuId&&obj.weight){packInfo.push({skuId:obj.skuId,sku1:obj.sku1||"",weight:obj.weight,length:obj.length||0,width:obj.width||0,height:obj.height||0});}}catch(e){}
        });
      }
      console.log("📦 [1688] 从context抓到",packInfo.length,"个SKU包装数据");
    }catch(e){}
    return packInfo;
  }

  // ===== 抓取包装信息表格 =====
  function scrapePackTable(){
    var packData=[];
    try{
      document.querySelectorAll("[class*='pack'] table tr, [class*='Pack'] table tr").forEach(function(tr){
        var cells=tr.querySelectorAll("td");
        if(cells.length>=6){
          var name=(cells[0].textContent||"").trim();
          var length=parseFloat(cells[1].textContent)||0;
          var width=parseFloat(cells[2].textContent)||0;
          var height=parseFloat(cells[3].textContent)||0;
          var volume=parseFloat(cells[4].textContent)||0;
          var weight=parseFloat(cells[5].textContent)||0;
          if(name&&weight>0) packData.push({name:name,length:length,width:width,height:height,weight:weight});
        }
      });
    }catch(e){}
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

  // ===== 抓取详情文字（过滤广告）=====
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

  // ===== 抓取商品完整数据 =====
  function scrapeProductData(){
    var data={offerId:getOfferId(),url:location.href,title:"",images:[],skus:[],detailImages:[],video:null,freight:scrapeFreight(),pageVersion:detectPageVersion(),productAttributes:scrapeProductAttributes(),detailText:scrapeDetailText(),skuPackInfo:scrapeSkuPackInfo(),packData:scrapePackTable(),scrapedAt:new Date().toISOString()};
    // 标题
    try{
      var titleEl=document.querySelector(".title-text")||document.querySelector("[class*='title'][class*='detail']")||document.querySelector("[class*='offerTitle']")||document.querySelector(".module-pdInfo h1")||document.querySelector(".detail-header-title")||document.querySelector(".title-content");
      if(titleEl)data.title=titleEl.textContent.trim();
      if(!data.title){var companyWords=["有限公司","有限责任","工厂","厂家","贸易","实业","科技有限","商行","经营部"];var h1s=Array.from(document.querySelectorAll("h1"));var cands=h1s.map(function(h){return h.textContent.trim();}).filter(function(t){if(!t||t.length<4)return false;for(var i=0;i<companyWords.length;i++){if(t.includes(companyWords[i]))return false;}return true;});if(cands.length>0){cands.sort(function(a,b){return b.length-a.length;});data.title=cands[0];}else if(h1s.length>0)data.title=h1s[0].textContent.trim();}
      if(!data.title){var og=document.querySelector('meta[property="og:title"]');if(og)data.title=(og.getAttribute("content")||"").trim();}
      if(!data.title)data.title=document.title.replace(/-.*$/,"").replace(/\|.*$/,"").trim();
    }catch(e){}
    // 主图
    try{
      document.querySelectorAll(".ant-image-img.preview-img").forEach(function(img){var src=img.getAttribute("src")||"";src=src.replace(/\.webp$/,"").replace(/\.jpg_.*$/,".jpg");if(src&&!data.images.includes(src))data.images.push(src);});
      if(data.images.length===0)document.querySelectorAll(".detail-gallery-turn-item img, .gallery-turn-scroll img").forEach(function(img){var src=img.getAttribute("src")||img.getAttribute("data-src")||"";src=src.replace(/\.webp$/,"").replace(/\.jpg_.*$/,".jpg");if(src&&!data.images.includes(src))data.images.push(src);});
    }catch(e){}
    // SKU列表
    data.skus=scrapeAllSkus();
    // 详情图（过滤小图和广告）
    try{
      document.querySelectorAll(".detail-desc img, [class*='detail'] img, .module-detail img").forEach(function(img){
        var src=img.getAttribute("src")||img.getAttribute("data-src")||"";if(!src||data.detailImages.includes(src))return;
        var width=img.naturalWidth||img.width||0;if(width>0&&width<200)return;
        var srcLower=src.toLowerCase();if(srcLower.includes("qrcode")||srcLower.includes("wechat")||srcLower.includes("weixin"))return;
        src=src.replace(/\.webp$/,"").replace(/\.jpg_.*$/,".jpg");data.detailImages.push(src);
      });
    }catch(e){}
    // 视频
    try{
      var videoUrl=null;
      var videoEl=document.querySelector("video");if(videoEl)videoUrl=videoEl.src||videoEl.currentSrc||videoEl.getAttribute("src");
      if(!videoUrl){var ogV=document.querySelector('meta[property="og:video"]');if(ogV)videoUrl=ogV.getAttribute("content");}
      if(!videoUrl){var html=document.documentElement.outerHTML;var vm=html.match(/https?:\/\/[^"'\s]+\.mp4[^"'\s]*/);if(vm)videoUrl=vm[0];}
      if(videoUrl){data.video=videoUrl.replace(/\\u002F/g,"/").replace(/\\\//g,"/");console.log("🎬 找到视频:",data.video);}
    }catch(e){}
    return data;
  }

  // ===== 模拟点击SKU并抓取数据 =====
  async function selectSkuAndScrape(skuIndex){
    var skus=scrapeAllSkus();
    if(skuIndex>=skus.length)return null;
    var sku=skus[skuIndex];
    var version=detectPageVersion();
    console.log("🖱️ [1688] 选择SKU:",sku.name,"版本:",version);

    // 点击SKU
    sku.element.click();
    await sleep(2000);

    if(version==="new_button"){
      // 先归零
      for(var mi=0;mi<10;mi++){var minusBtn=document.querySelector(".anticon-minus.enable");if(!minusBtn)break;minusBtn.click();await sleep(300);}
      // 点1次+号
      var plusBtn=document.querySelector(".anticon-plus.enable");
      if(plusBtn){plusBtn.click();await sleep(1500);}
      // 抓价格
      var priceEl=document.querySelector(".expand-view-item");
      if(priceEl){var pm=(priceEl.textContent||"").match(/¥\s*(\d+\.?\d*)/);if(pm)sku.price=parseFloat(pm[1]);}
      // 归零
      for(var mi2=0;mi2<10;mi2++){var minusBtn2=document.querySelector(".anticon-minus.enable");if(!minusBtn2)break;minusBtn2.click();await sleep(300);}
    }

    // 重新抓主图集
    var freshImages=[];
    document.querySelectorAll(".ant-image-img.preview-img").forEach(function(img){var src=img.getAttribute("src")||"";src=src.replace(/\.webp$/,"").replace(/\.jpg_.*$/,".jpg");if(src&&!freshImages.includes(src))freshImages.push(src);});
    if(freshImages.length===0)document.querySelectorAll(".detail-gallery-turn-item img, .gallery-turn-scroll img").forEach(function(img){var src=img.getAttribute("src")||img.getAttribute("data-src")||"";src=src.replace(/\.webp$/,"").replace(/\.jpg_.*$/,".jpg");if(src&&!freshImages.includes(src))freshImages.push(src);});

    // 详情图
    var detailImgs=[];
    try{document.querySelectorAll(".detail-desc img, [class*='detail'] img, .module-detail img").forEach(function(img){var src=img.getAttribute("src")||img.getAttribute("data-src")||"";if(!src||detailImgs.includes(src))return;var width=img.naturalWidth||img.width||0;if(width>0&&width<200)return;var srcLower=src.toLowerCase();if(srcLower.includes("qrcode")||srcLower.includes("wechat"))return;src=src.replace(/\.webp$/,"").replace(/\.jpg_.*$/,".jpg");detailImgs.push(src);});}catch(e){}

    return{sku:sku,images:freshImages,detailImages:detailImgs,freight:scrapeFreight()};
  }

  // ===== 获取重量尺寸（5级分级策略）=====
  async function getWeightAndDimensions(productData){
    var skuName=productData.selectedSku?productData.selectedSku.name:"";
    var weight=0,dimensions=null,source="";

    // 第1级：联系商家询问
    console.log("📞 [重量] 第1级：联系商家询问");
    renderSteps("weight","waiting","正在联系商家询问重量...");
    var msgResult=await sendMessageToShop(productData);
    if(msgResult.ok){
      renderSteps("weight","waiting","等待商家回复（最长20分钟）...");
      var reply=await waitForShopReply(productData.offerId,20*60*1000);
      if(reply.ok&&reply.weight){
        weight=reply.weight;dimensions=reply.dimensions;source="商家回复";
        console.log("✅ [重量] 商家回复:",weight,"g");
        return{ok:true,weight:weight,dimensions:dimensions,source:source};
      }
      console.log("⚠️ [重量] 商家未回复或未识别");
    }

    // 第2级：window.context包装数据
    if(skuName&&productData.skuPackInfo&&productData.skuPackInfo.length>0){
      var pack=productData.skuPackInfo.find(function(p){return p.sku1===skuName;});
      if(pack&&pack.weight>0){
        weight=pack.weight;dimensions={length:pack.length,width:pack.width,height:pack.height};source="context数据";
        console.log("✅ [重量] 第2级：context数据",weight,"g");
        return{ok:true,weight:weight,dimensions:dimensions,source:source};
      }
    }

    // 第3级：包装信息表格
    if(productData.packData&&productData.packData.length>0){
      var packRow=productData.packData.find(function(p){return p.name===skuName||skuName.includes(p.name)||p.name.includes(skuName);});
      if(packRow&&packRow.weight>0){
        weight=packRow.weight;dimensions={length:packRow.length,width:packRow.width,height:packRow.height};source="包装表";
        console.log("✅ [重量] 第3级：包装表",weight,"g");
        return{ok:true,weight:weight,dimensions:dimensions,source:source};
      }
    }

    // 第4级：商品属性表重量
    var attrs=productData.productAttributes||{};
    for(var k in attrs){
      if(k.includes("重量")||k.includes("净重")||k.includes("毛重")){
        var v=parseFloat(String(attrs[k]).replace(/[^\d.]/g,""));
        if(v>0){
          if(v<=100)weight=Math.round(v*1000);else weight=Math.round(v);
          source="属性表";
          console.log("✅ [重量] 第4级：属性表",weight,"g");
          return{ok:true,weight:weight,dimensions:null,source:source};
        }
      }
    }

    // 第5级：跳过
    console.log("❌ [重量] 所有来源均无数据，跳过");
    return{ok:false,reason:"无法获取重量（商家未回复，页面无数据）"};
  }

  // ===== 发消息给商家 =====
  async function sendMessageToShop(productData){
    try{
      var skuName=(productData.selectedSku&&productData.selectedSku.name)||"";
      var askText=skuName?"您好，麻烦发下「"+skuName+"」这个规格包装后的重量(kg)和外箱尺寸(长×宽×高cm)，谢谢":"您好，麻烦发下这个商品包装后的重量(kg)和外箱尺寸(长×宽×高cm)，谢谢";
      await chrome.storage.local.set({pending_shop_message:{offerId:productData.offerId,title:productData.title||"",productUrl:productData.url||location.href,askText:askText,createdAt:Date.now(),sent:false}});
      var serviceBtn=null;
      var sideBar=document.getElementById("es9y1w4s5if");
      if(sideBar)serviceBtn=Array.from(sideBar.querySelectorAll(".action-item")).find(function(el){return normalizeText(el.innerText||"").includes("客服");});
      if(!serviceBtn){var allEls=Array.from(document.querySelectorAll("a,button,div,span"));serviceBtn=allEls.find(function(el){var txt=normalizeText(el.innerText||el.textContent||"");return txt==="联系客服"||txt==="咨询"||txt==="客服"||txt==="咨询商家";});}
      if(!serviceBtn)serviceBtn=document.querySelector("[class*='contact'],[class*='kefu'],[class*='chat'],[class*='service'],[class*='consult']");
      if(!serviceBtn)serviceBtn=document.querySelector('[aria-label*="客服"],[aria-label*="咨询"],[title*="客服"],[title*="咨询"]');
      if(!serviceBtn){var offerId=productData.offerId;if(offerId)window.open("https://im.1688.com/home?channel=5&bizType=5&offerId="+offerId,"_blank");return{ok:true};}
      serviceBtn.click();
      setTimeout(function(){tryHandleChatInCurrentPage();},2000);
      setTimeout(function(){tryHandleChatInCurrentPage();},4000);
      setTimeout(function(){tryHandleChatInCurrentPage();},8000);
      setTimeout(function(){tryHandleChatInCurrentPage();},12000);
      return{ok:true};
    }catch(e){return{ok:false,error:e.message};}
  }

  async function tryHandleChatInCurrentPage(){
    try{
      var webBtn=findClickableByTexts(["继续使用网页版","网页版","继续使用"]);if(webBtn){webBtn.click();await sleep(1500);}
      var stored=await new Promise(function(r){chrome.storage.local.get("pending_shop_message",r);});var pending=stored.pending_shop_message;if(!pending||pending.sent)return;
      var chatDoc=null;
      for(var k=0;k<30;k++){
        if(document.querySelector(".odDetail-sendBtn")){chatDoc=document;break;}
        var iframes=document.querySelectorAll("iframe");
        for(var fi=0;fi<iframes.length;fi++){try{var doc=iframes[fi].contentDocument;if(doc&&doc.querySelector(".odDetail-sendBtn")){chatDoc=doc;break;}}catch(e){}}
        if(chatDoc)break;await sleep(1000);
      }
      if(chatDoc){var linkBtn=chatDoc.querySelector(".odDetail-sendBtn");if(linkBtn){linkBtn.click();await sleep(2000);}var sendBtn1=findClickableByTexts(["发送","Send"],chatDoc);if(sendBtn1){sendBtn1.click();await sleep(1500);}}
      var input=null,searchDoc=document;
      for(var j=0;j<10;j++){
        var docs=[document];document.querySelectorAll("iframe").forEach(function(f){try{var d=f.contentDocument;if(d)docs.push(d);}catch(e){}});
        for(var di=0;di<docs.length;di++){input=findChatInput(docs[di]);if(input){searchDoc=docs[di];break;}}
        if(input)break;await sleep(500);
      }
      if(input&&setInputValue(input,pending.askText)){
        await sleep(800);var sendBtn2=findClickableByTexts(["发送","Send"],searchDoc);if(sendBtn2)sendBtn2.click();else clickSendMessage(searchDoc);
        await chrome.storage.local.set({pending_shop_message:Object.assign({},pending,{sent:true,sentAt:Date.now()})});
        console.log("✅ [1688] 已发送商品链接+询问消息");
      }
    }catch(e){console.warn("[1688] 聊天处理失败:",e.message);}
  }

  function waitForShopReply(offerId,timeoutMs){return new Promise(function(resolve){var startTime=Date.now();var timer=setInterval(function(){chrome.storage.local.get("shop_reply_"+offerId,function(stored){var reply=stored["shop_reply_"+offerId];if(reply){clearInterval(timer);chrome.storage.local.remove("shop_reply_"+offerId);resolve({ok:true,weight:reply.weight,dimensions:reply.dimensions});return;}if(Date.now()-startTime>=timeoutMs){clearInterval(timer);resolve({ok:false});}});},10000);});}

  // ===== 进度步骤 =====
  var steps=[{key:"scrape",label:"抓取商品数据"},{key:"weight",label:"获取包装重量"},{key:"ai",label:"AI 处理内容"},{key:"image",label:"生成爆款图"},{key:"upload",label:"上传到 Ozon"},{key:"done",label:"完成"}];
  function renderSteps(currentKey,status,message){var el=document.getElementById("erp-progress-steps");if(!el)return;var currentIdx=steps.findIndex(function(s){return s.key===currentKey;});el.innerHTML=steps.map(function(step,idx){var icon,color;if(idx<currentIdx){icon="✅";color="#52c41a";}else if(idx===currentIdx){if(status==="error"){icon="❌";color="#ff4d4f";}else if(status==="waiting"){icon="⏳";color="#fa8c16";}else if(status==="done"){icon="✅";color="#52c41a";}else{icon="⏳";color="#1677ff";}}else{icon="⬜";color="#ccc";}var extra=(idx===currentIdx&&message)?'<div style="font-size:11px;color:'+color+';margin-top:3px;padding-left:28px;">'+escapeHtml(message)+'</div>':"";return '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;"><span style="font-size:16px;flex-shrink:0;">'+icon+'</span><span style="font-size:12px;color:'+color+';font-weight:'+(idx===currentIdx?"600":"normal")+';">'+escapeHtml(step.label)+'</span></div>'+extra;}).join("");}

  // ===== 悬浮按钮+面板 =====
  function injectUploadButton(){if(document.getElementById("erp-1688-btn"))return;var btn=document.createElement("div");btn.id="erp-1688-btn";btn.style.cssText="position:fixed;top:50%;right:0;transform:translateY(-50%);background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:12px 0 0 12px;padding:12px 10px;cursor:pointer;z-index:999997;font-family:Arial;font-size:12px;font-weight:bold;text-align:center;box-shadow:-4px 0 16px rgba(102,126,234,.4);writing-mode:vertical-rl;letter-spacing:2px;transition:all .2s;";btn.textContent="🤖 AI上品";btn.addEventListener("mouseenter",function(){btn.style.padding="12px 14px";});btn.addEventListener("mouseleave",function(){btn.style.padding="12px 10px";});btn.addEventListener("click",restoreUploadPanel);document.body.appendChild(btn);}
  function showFloatingButton(){var b=document.getElementById("erp-1688-btn");if(b)b.style.display="block";}
  function hideFloatingButton(){var b=document.getElementById("erp-1688-btn");if(b)b.style.display="none";}
  var panelEl=null,maskEl=null;
  function openDefaultPanel(){injectUploadButton();checkAutoPickMode();if(localStorage.getItem(PANEL_MIN_KEY)==="1"){showFloatingButton();return;}showUploadPanel();}
  function restoreUploadPanel(){localStorage.setItem(PANEL_MIN_KEY,"0");showUploadPanel();}
  function hideUploadPanel(){localStorage.setItem(PANEL_MIN_KEY,"1");if(panelEl){panelEl.style.right="-480px";setTimeout(function(){if(panelEl)panelEl.style.display="none";},320);}showFloatingButton();}

  // ===== 价格预览+物流商列表 =====
  function updateCarrierList(){
    var el=document.getElementById("erp-carrier-list");if(!el)return;
    var skuRadio=document.querySelector('input[name="erp-sku"]:checked');var price=skuRadio?parseFloat(skuRadio.dataset.price)||100:100;
    var freight=scrapeFreight();var totalCost=price+freight;var estPrice=totalCost*2;
    var shipSel=document.getElementById("erp-shipping-type");var shippingType=(shipSel&&shipSel.value)||"land";
    var wEl=document.getElementById("erp-default-weight");var weightG=Math.round((parseFloat(wEl&&wEl.value)||0.5)*1000);
    var list=getCarrierList(estPrice,weightG,shippingType);
    if(!list.length){el.innerHTML='<span style="font-size:10px;color:#bbb;">无物流商</span>';return;}
    var prevSelected=el.dataset.selected||'';var tier=getShippingTier(estPrice,weightG);
    el.innerHTML='<div style="width:100%;font-size:10px;color:#005bff;font-weight:600;margin-bottom:4px;">档位: '+tier+'</div>'+list.map(function(c){var isActive=c.name===prevSelected;return '<button class="erp-carrier-btn" data-name="'+c.name+'" data-fee="'+c.fee+'" style="padding:5px 10px;border:1.5px solid '+(isActive?'#005bff':'#d1d5db')+';border-radius:8px;background:'+(isActive?'linear-gradient(135deg,#005bff,#0040cb)':'#fff')+';color:'+(isActive?'#fff':'#374151')+';font-size:11px;font-weight:600;cursor:pointer;text-align:center;min-width:65px;"><div style="font-size:10px;font-weight:700;">'+c.name+'</div><div style="font-size:11px;font-weight:900;">¥'+c.fee.toFixed(1)+'</div></button>';}).join("");
    el.querySelectorAll(".erp-carrier-btn").forEach(function(btn){btn.addEventListener("click",function(){el.dataset.selected=this.dataset.name;el.querySelectorAll(".erp-carrier-btn").forEach(function(b){var active=b.dataset.name===el.dataset.selected;b.style.borderColor=active?'#005bff':'#d1d5db';b.style.background=active?'linear-gradient(135deg,#005bff,#0040cb)':'#fff';b.style.color=active?'#fff':'#374151';});updatePricePreview();});});
    if(!prevSelected&&list.length>0){el.dataset.selected=list[0].name;var firstBtn=el.querySelector(".erp-carrier-btn");if(firstBtn){firstBtn.style.borderColor='#005bff';firstBtn.style.background='linear-gradient(135deg,#005bff,#0040cb)';firstBtn.style.color='#fff';}}
  }

  function updatePricePreview(){
    var el=document.getElementById("erp-price-preview");if(!el)return;
    var skuRadio=document.querySelector('input[name="erp-sku"]:checked');var costCny=skuRadio?parseFloat(skuRadio.dataset.price)||0:0;
    if(!costCny){el.style.display="none";return;}
    var freight=scrapeFreight();var totalCost=costCny+freight;
    var profitRate=Math.max(parseFloat(document.getElementById("erp-profit-rate")&&document.getElementById("erp-profit-rate").value)/100||0.25,0.15);
    var shippingType=(document.getElementById("erp-shipping-type")&&document.getElementById("erp-shipping-type").value)||"land";
    var weightG=Math.round((parseFloat(document.getElementById("erp-default-weight")&&document.getElementById("erp-default-weight").value)||0.5)*1000);
    var carrierEl=document.getElementById("erp-carrier-list");var selectedCarrier=carrierEl?carrierEl.dataset.selected:'';
    var r1=calculatePrice(totalCost,weightG,profitRate,shippingType,selectedCarrier);
    if(!r1||r1.error){el.style.display="block";el.innerHTML='<span style="color:#ff4d4f;">⚠️ '+(r1&&r1.error||'计算失败')+'</span>';return;}
    var channelLabel=shippingType==='air'?'空运':(shippingType==='air_land'?'陆空联运':'陆运');
    el.style.display="block";
    el.innerHTML="进价 ¥"+costCny+" + 运费 ¥"+freight+" = 总成本 ¥"+totalCost.toFixed(2)+"<br>"+channelLabel+" | 物流商: "+(selectedCarrier||"自动")+" | 运费: ¥"+r1.shippingFee.toFixed(2)+"<br>→ 售价约 <b>¥"+r1.price+"</b>";
  }

  // ===== 面板 =====
  function showUploadPanel(){
    localStorage.setItem(PANEL_MIN_KEY,"0");injectUploadButton();
    if(panelEl){panelEl.style.display="flex";panelEl.style.right="0";hideFloatingButton();loadProductPreview();return;}
    maskEl=document.createElement("div");maskEl.style.cssText="display:none;";
    panelEl=document.createElement("div");panelEl.id="erp-1688-panel";
    panelEl.style.cssText="position:fixed;top:0;right:-480px;width:460px;height:100vh;background:#f8f9fb;z-index:999998;box-shadow:-8px 0 30px rgba(0,0,0,.15);transition:right .3s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;font-family:Arial,sans-serif;font-size:13px;color:#333;overflow:hidden;";
    var ss="width:100%;padding:8px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:12px;outline:none;background:#fff;box-sizing:border-box;";
    panelEl.innerHTML=[
      '<div style="background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;"><div><div style="font-size:18px;font-weight:bold;">🤖 AI 自动上品</div><div style="font-size:11px;opacity:.8;margin-top:3px;">1688 → Ozon 全自动</div></div><div style="display:flex;align-items:center;gap:8px;"><div id="erp-panel-min" style="width:30px;height:30px;background:rgba(255,255,255,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;line-height:1;">—</div><div id="erp-panel-close" style="width:30px;height:30px;background:rgba(255,255,255,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;">✕</div></div></div>',
      '<div id="erp-product-preview" style="background:#fff;border-bottom:1px solid #f0f0f0;padding:14px 20px;flex-shrink:0;"><div style="font-size:11px;color:#999;margin-bottom:6px;">当前商品 <span id="erp-page-version" style="background:#e6f4ff;color:#1677ff;padding:1px 6px;border-radius:4px;font-size:10px;"></span></div><div id="erp-preview-title" style="font-size:13px;font-weight:600;color:#333;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">加载中...</div><div style="display:flex;gap:8px;margin-top:8px;overflow-x:auto;" id="erp-preview-images"></div><div id="erp-preview-info" style="margin-top:8px;font-size:11px;color:#666;"></div></div>',
      '<div style="flex:1;overflow-y:auto;padding:16px 20px;">',
        '<div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:14px;margin-bottom:12px;"><div style="font-size:12px;font-weight:700;color:#555;margin-bottom:10px;">📦 选择要上传的SKU</div><div id="erp-sku-list"><div style="color:#999;font-size:12px;">⏳ 加载SKU...</div></div></div>',
        '<div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:14px;margin-bottom:12px;"><div style="font-size:12px;font-weight:700;color:#555;margin-bottom:10px;">🏪 上传到哪些店铺</div><div id="erp-store-list"><div style="color:#999;font-size:12px;">⏳ 加载店铺...</div></div></div>',
        '<div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:14px;margin-bottom:12px;"><div style="font-size:12px;font-weight:700;color:#555;margin-bottom:10px;">📦 Ozon 类目</div><div id="erp-category-select"><div style="color:#999;font-size:12px;">⏳ 加载类目...</div></div></div>',
        '<div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:14px;margin-bottom:12px;"><div style="font-size:12px;font-weight:700;color:#555;margin-bottom:10px;">💰 定价设置</div><div style="margin-bottom:8px;"><label style="display:block;font-size:11px;color:#666;margin-bottom:4px;">目标利润率 %（最低15）</label><input id="erp-profit-rate" type="number" value="25" min="15" style="'+ss+'" /></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:8px;"><div><label style="display:block;font-size:11px;color:#666;margin-bottom:4px;">物流方式</label><select id="erp-shipping-type" style="'+ss+'"><option value="land">陆运</option><option value="air_land">陆空联运</option><option value="air">空运</option></select></div><div><label style="display:block;font-size:11px;color:#666;margin-bottom:4px;">预估重量kg（价格预览用）</label><input id="erp-default-weight" type="number" value="0.5" min="0.1" step="0.1" style="'+ss+'" /></div></div><div style="margin-bottom:8px;"><label style="display:block;font-size:11px;color:#666;margin-bottom:4px;">物流商（点击选择）</label><div id="erp-carrier-list" style="display:flex;flex-wrap:wrap;gap:6px;padding:8px;background:#f9fafb;border-radius:8px;min-height:40px;"><span style="font-size:10px;color:#bbb;">选择物流方式后显示</span></div></div><div id="erp-price-preview" style="background:#f0f5ff;border:1px solid #c7d2fe;border-radius:6px;padding:8px;font-size:11px;color:#667eea;line-height:1.8;display:none;"></div><div style="font-size:10px;color:#aaa;margin-top:4px;">佣金17% | 退货2% | 提现1.2% | 尾程5% | 贴单¥2 | 1688运费自动抓</div></div>',
        '<div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:14px;margin-bottom:12px;"><div style="font-size:12px;font-weight:700;color:#555;margin-bottom:10px;">🤖 AI 设置</div><div style="margin-bottom:8px;"><label style="display:block;font-size:11px;color:#666;margin-bottom:4px;">商品风格（可选）</label><input id="erp-style-hint" type="text" placeholder="例如：时尚女性、家居实用..." style="'+ss+'" /></div><div style="display:flex;align-items:center;gap:8px;"><input type="checkbox" id="erp-gen-dalle" checked style="margin:0;" /><label for="erp-gen-dalle" style="font-size:12px;color:#555;cursor:pointer;">DALL-E 3 生成爆款图</label></div></div>',
        '<div style="background:#fff7e6;border:1px solid #ffd591;border-radius:10px;padding:12px 14px;margin-bottom:16px;"><div style="font-size:12px;font-weight:700;color:#fa8c16;margin-bottom:6px;">⚖️ 重量获取策略</div><div style="font-size:11px;color:#666;line-height:1.8;">① 先联系商家询问（最准确）<br>② 商家没回复 → 用页面包装数据<br>③ 页面也没有 → 用属性表重量<br>④ 都没有 → <b style="color:#ff4d4f;">跳过</b></div></div>',
        '<button id="erp-start-btn" style="width:100%;padding:14px;border:none;border-radius:12px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;font-size:16px;font-weight:bold;cursor:pointer;">🚀 开始 AI 上品</button>',
        '<div id="erp-progress-area" style="display:none;margin-top:16px;background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:14px;"><div style="font-size:12px;font-weight:700;color:#555;margin-bottom:10px;">📊 上品进度</div><div id="erp-progress-steps"></div></div>',
      '</div>'
    ].join("");
    document.body.appendChild(maskEl);document.body.appendChild(panelEl);
    document.getElementById("erp-panel-min").onclick=hideUploadPanel;
    document.getElementById("erp-panel-close").onclick=hideUploadPanel;
    document.getElementById("erp-start-btn").onclick=startUpload;
    var profitInput=document.getElementById("erp-profit-rate");if(profitInput)profitInput.addEventListener("input",function(){updateCarrierList();updatePricePreview();});
    var shipSelect=document.getElementById("erp-shipping-type");if(shipSelect)shipSelect.addEventListener("change",function(){updateCarrierList();updatePricePreview();});
    var weightInput=document.getElementById("erp-default-weight");if(weightInput)weightInput.addEventListener("input",function(){updateCarrierList();updatePricePreview();});
    setTimeout(function(){if(panelEl)panelEl.style.right="0";hideFloatingButton();},10);
    loadProductPreview();loadStores();loadCategories();loadSkuList();
    setTimeout(function(){updateCarrierList();},800);
  }

  function loadSkuList(){
    var el=document.getElementById("erp-sku-list");if(!el)return;
    var skus=scrapeAllSkus();var version=detectPageVersion();var freight=scrapeFreight();
    if(!skus.length){el.innerHTML='<div style="color:#ff4d4f;font-size:12px;">未找到SKU</div>';return;}
    el.innerHTML='<div style="font-size:10px;color:#005bff;margin-bottom:6px;">版本:'+version+' | 运费:¥'+freight+' | SKU:'+skus.length+'个</div>'+'<div style="max-height:200px;overflow-y:auto;border:1px solid #e2e8f0;border-radius:8px;padding:6px;background:#fafafa;">'+skus.map(function(sku,i){return '<label style="display:flex;align-items:center;padding:6px 8px;font-size:11px;cursor:pointer;border-bottom:1px solid #f0f0f0;"><input type="radio" name="erp-sku" value="'+i+'" data-price="'+sku.price+'" data-name="'+escapeHtml(sku.name)+'"'+(i===0?' checked':'')+' style="margin-right:8px;" />'+(sku.image?'<img src="'+escapeHtml(sku.image)+'" style="width:30px;height:30px;object-fit:cover;border-radius:4px;margin-right:8px;" />':'')+'<span style="flex:1;">'+escapeHtml(sku.name)+'</span>'+(sku.price>0?'<span style="color:#ff4d4f;font-weight:700;">¥'+sku.price+'</span>':'<span style="color:#999;font-size:10px;">待获取</span>')+'</label>';}).join("")+'</div><div style="font-size:10px;color:#999;margin-top:6px;">选哪个SKU就用它的价格/图片/属性上传</div>';
    el.addEventListener("change",function(){updateCarrierList();updatePricePreview();});
  }

  function loadProductPreview(){
    var data=scrapeProductData();
    var versionEl=document.getElementById("erp-page-version");if(versionEl)versionEl.textContent=data.pageVersion;
    var titleEl=document.getElementById("erp-preview-title");if(titleEl)titleEl.textContent=data.title||"未找到标题";
    var imgsEl=document.getElementById("erp-preview-images");if(imgsEl)imgsEl.innerHTML=data.images.length>0?data.images.slice(0,6).map(function(src){return '<img src="'+escapeHtml(src)+'" style="width:56px;height:56px;object-fit:cover;border-radius:6px;border:1px solid #e2e8f0;flex-shrink:0;" />';}).join(""):'<div style="font-size:11px;color:#999;">暂无图片</div>';
    var infoEl=document.getElementById("erp-preview-info");if(infoEl)infoEl.innerHTML=data.skus.length+" 个SKU | 运费:¥"+data.freight+" | 属性:"+Object.keys(data.productAttributes).length+"个"+(data.video?" | 🎬有视频":"")+" | 包装数据:"+data.skuPackInfo.length+"个";
    setTimeout(function(){updateCarrierList();updatePricePreview();},500);
  }

  function loadStores(){chrome.runtime.sendMessage({action:"getStores"},function(res){var el=document.getElementById("erp-store-list");if(!el)return;if(!res||!res.success||!res.data||!res.data.data||!res.data.data.length){el.innerHTML='<div style="color:#999;font-size:12px;">暂无店铺</div>';return;}el.innerHTML=res.data.data.map(function(s){return '<label style="display:flex;align-items:center;gap:8px;padding:5px 0;font-size:12px;cursor:pointer;"><input type="checkbox" class="erp-store-cb" value="'+escapeHtml(s.id)+'" checked /><span>'+escapeHtml(s.name)+'</span></label>';}).join("");});}

  async function loadCategories(){
  var el=document.getElementById("erp-category-select");if(!el)return;
  el.innerHTML='<div style="color:#667eea;font-size:12px;">⏳ 加载类目中...</div>';
  
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
      
      // 尝试多种编码
      var decoders = ["utf-8", "gbk", "gb2312", "big5"];
      for (var d = 0; d < decoders.length; d++) {
        try {
          var decoder = new TextDecoder(decoders[d], { fatal: false });
          var decoded = decoder.decode(buffer);
          var sample = decoded.substring(0, 200);
          var chineseCount = (sample.match(/[\u4e00-\u9fa5]/g) || []).length;
          if (chineseCount > 5) {
            text = decoded;
            console.log("✅ [1688] 类目编码:", decoders[d]);
            break;
          }
        } catch(e) {}
      }
      if (text) break;
    } catch(e) {}
  }
  
  if (!text) {
    el.innerHTML='<div style="color:#ff4d4f;font-size:12px;">❌ 类目加载失败</div>';
    return;
  }
  
  // 自动检测分隔符
  var firstLine = text.split(/\r?\n/)[0];
  var separator = firstLine.indexOf("\t") >= 0 ? "\t" : ",";
  
  var lines = text.split(/\r?\n/).filter(Boolean);
  lines.shift();
  
  var tree = {};
  for (var i = 0; i < lines.length; i++) {
    var cols = lines[i].split(separator);
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
    tree[c1][c2].push({ name: name, c1: c1, c2: c2, c3: c3, categoryId: catId, typeId: typeId });
  }
  
  if (Object.keys(tree).length === 0) {
    el.innerHTML='<div style="color:#ff4d4f;font-size:12px;">类目数据为空</div>';
    return;
  }
  
  el.innerHTML="";
  var searchInput=document.createElement("input");
  searchInput.type="text";
  searchInput.placeholder="🔍 搜索类目...";
  searchInput.style.cssText="width:100%;padding:8px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:12px;outline:none;margin-bottom:8px;box-sizing:border-box;";
  el.appendChild(searchInput);
  
  var treeWrap=document.createElement("div");
  treeWrap.style.cssText="max-height:250px;overflow-y:auto;border:1px solid #e2e8f0;border-radius:8px;background:#fafafa;padding:6px;";
  
  for(var c1 in tree){
    var c1El=document.createElement("details");
    c1El.className="erp-cat-c1";
    c1El.style.marginBottom="4px";
    var c1Sum=document.createElement("summary");
    c1Sum.style.cssText="cursor:pointer;font-weight:bold;font-size:12px;color:#333;padding:4px 0;";
    c1Sum.textContent="📁 "+c1;
    c1El.appendChild(c1Sum);
    var c1Body=document.createElement("div");
    c1Body.style.cssText="padding-left:14px;margin-top:4px;";
    for(var c2 in tree[c1]){
      var c2El=document.createElement("details");
      c2El.className="erp-cat-c2";
      c2El.style.marginBottom="3px";
      var c2Sum=document.createElement("summary");
      c2Sum.style.cssText="cursor:pointer;font-weight:600;font-size:11px;color:#555;padding:3px 0;";
      c2Sum.textContent="📂 "+c2;
      c2El.appendChild(c2Sum);
      var c2Body=document.createElement("div");
      c2Body.style.cssText="padding-left:14px;margin-top:2px;";
      tree[c1][c2].forEach(function(item){
        var label=document.createElement("label");
        label.className="erp-cat-option";
        label.setAttribute("data-search",(item.c1+" > "+item.c2+" > "+item.name).toLowerCase());
        label.style.cssText="display:block;padding:5px 6px;font-size:11px;cursor:pointer;border-bottom:1px solid #f0f0f0;color:#444;border-radius:4px;";
        var radio=document.createElement("input");
        radio.type="radio";
        radio.name="erp-category";
        radio.value=item.categoryId+"|"+item.typeId;
        radio.setAttribute("data-name",item.name);
        radio.style.marginRight="6px";
        label.appendChild(radio);
        label.appendChild(document.createTextNode("📄 "+item.name));
        c2Body.appendChild(label);
      });
      c2El.appendChild(c2Body);
      c1Body.appendChild(c2El);
    }
    c1El.appendChild(c1Body);
    treeWrap.appendChild(c1El);
  }
  el.appendChild(treeWrap);
  
  var selectedDiv=document.createElement("div");
  selectedDiv.id="erp-cat-selected";
  selectedDiv.style.cssText="margin-top:6px;font-size:11px;color:#667eea;";
  el.appendChild(selectedDiv);
  
  el.addEventListener("change",function(e){
    if(e.target&&e.target.name==="erp-category")
      selectedDiv.textContent="✅ 已选："+e.target.getAttribute("data-name");
  });
  
  searchInput.addEventListener("input",function(){
    var kw=this.value.toLowerCase().trim();
    if(!kw){
      el.querySelectorAll(".erp-cat-option").forEach(function(i){i.style.display="";});
      el.querySelectorAll(".erp-cat-c1,.erp-cat-c2").forEach(function(d){d.style.display="";d.open=false;});
      return;
    }
    el.querySelectorAll(".erp-cat-option").forEach(function(item){
      var s=(item.getAttribute("data-search")||"").toLowerCase();
      item.style.display=s.indexOf(kw)>=0?"":"none";
    });
    el.querySelectorAll(".erp-cat-c2").forEach(function(c2){
      var has=false;
      c2.querySelectorAll(".erp-cat-option").forEach(function(o){if(o.style.display!=="none")has=true;});
      c2.style.display=has?"":"none";
      if(has)c2.open=true;
    });
    el.querySelectorAll(".erp-cat-c1").forEach(function(c1){
      var has=false;
      c1.querySelectorAll(".erp-cat-c2").forEach(function(c2){if(c2.style.display!=="none")has=true;});
      c1.style.display=has?"":"none";
      if(has)c1.open=true;
    });
  });
  
  console.log("✅ [1688] 类目加载成功:", Object.keys(tree).length, "个一级类目");
}

  // ===== 开始上品 =====
  async function startUpload(){
    var btn=document.getElementById("erp-start-btn");if(!btn||btn.disabled)return;
    var stored=await new Promise(function(r){chrome.storage.local.get(["erp_token"],r);});if(!stored.erp_token){alert("请先登录超维ERP！");return;}
    var storeIds=Array.from(document.querySelectorAll(".erp-store-cb:checked")).map(function(cb){return cb.value;});if(!storeIds.length){alert("请选择至少一个店铺！");return;}
    var categoryRadio=document.querySelector('input[name="erp-category"]:checked');if(!categoryRadio){alert("请选择一个Ozon类目！");return;}
    var catParts=categoryRadio.value.split("|");var targetCategory={keyword:categoryRadio.getAttribute("data-name")||"",categoryId:catParts[0]||"",typeId:catParts[1]||""};
    var skuRadio=document.querySelector('input[name="erp-sku"]:checked');if(!skuRadio){alert("请选择一个SKU！");return;}
    var skuIdx=parseInt(skuRadio.value);
    var profitRate=Math.max(parseFloat(document.getElementById("erp-profit-rate").value)/100||0.25,0.15);
    var shippingType=document.getElementById("erp-shipping-type").value||"land";
    var styleHint=document.getElementById("erp-style-hint").value.trim();
    var genDalle=document.getElementById("erp-gen-dalle").checked;

    btn.disabled=true;btn.textContent="⏳ 处理中...";btn.style.opacity="0.6";
    document.getElementById("erp-progress-area").style.display="block";
    renderSteps("scrape","loading","正在抓取商品数据...");

    // 模拟点击选中SKU → 切换图片和价格
    var skuResult=await selectSkuAndScrape(skuIdx);
    if(!skuResult||!skuResult.sku){renderSteps("scrape","error","SKU切换失败");resetBtn(btn);return;}

    var productData=scrapeProductData();
    productData.selectedSku=skuResult.sku;
    // 合并主图+详情图（最多15张）
    var mainImages=skuResult.images.length>0?skuResult.images:productData.images;
    var detailImgs=skuResult.detailImages||productData.detailImages||[];
    var allImages=[];var seenImg={};
    mainImages.concat(detailImgs).forEach(function(src){if(!seenImg[src]&&allImages.length<15){seenImg[src]=true;allImages.push(src);}});
    productData.images=allImages;
    productData.title=productData.title+" - "+skuResult.sku.name;
    productData.skuPrice=skuResult.sku.price;
    productData.freight=skuResult.freight;
    console.log("📦 SKU:",skuResult.sku.name,"¥"+skuResult.sku.price,"运费¥"+skuResult.freight,"图片"+allImages.length+"张");

    if(!productData.title||productData.images.length===0){renderSteps("scrape","error","未找到商品标题或图片");resetBtn(btn);return;}

    // 获取重量（5级分级策略）
    renderSteps("weight","loading","正在获取重量...");
    var weightResult=await getWeightAndDimensions(productData);
    if(!weightResult.ok){renderSteps("weight","error",weightResult.reason);resetBtn(btn);return;}
    productData.weight=weightResult.weight;productData.dimensions=weightResult.dimensions;
    console.log("📦 重量:",weightResult.weight,"g 来源:",weightResult.source);

    renderSteps("ai","loading","AI 正在处理...");
    chrome.runtime.sendMessage({action:"aiAutoUpload",product:productData,config:{storeIds:storeIds,profitRate:profitRate,shippingType:shippingType,styleHint:styleHint,genDalle:genDalle,targetCategory:targetCategory}},function(res){
      if(!res||!res.success){renderSteps("ai","error",(res&&res.error)||"处理失败");resetBtn(btn);return;}
      pollProgress(res.taskId,btn);
    });
  }

  async function pollProgress(taskId,btn){for(var i=0;i<120;i++){await sleep(5000);var res=await new Promise(function(resolve){chrome.runtime.sendMessage({action:"getTaskProgress",taskId:taskId},resolve);});if(!res||!res.success)continue;var task=res.task;if(task.step)renderSteps(task.step,task.status||"loading",task.message||"");if(task.status==="done"){renderSteps("done","done","上品完成！");btn.textContent="✅ 成功！再来一个";btn.style.background="linear-gradient(135deg,#52c41a,#389e0d)";btn.disabled=false;btn.style.opacity="1";btn.onclick=function(){btn.textContent="🚀 开始 AI 上品";btn.style.background="linear-gradient(135deg,#667eea,#764ba2)";document.getElementById("erp-progress-area").style.display="none";btn.onclick=startUpload;};return;}if(task.status==="error"){renderSteps(task.step||"ai","error",task.message||"失败");resetBtn(btn);return;}}renderSteps("upload","error","超时");resetBtn(btn);}
  function resetBtn(btn){if(!btn)return;btn.disabled=false;btn.style.opacity="1";btn.textContent="🚀 开始 AI 上品";}

  // ===== 自动选品 =====
  function isSearchPage(){return location.href.includes("s.1688.com")||location.href.includes("offer_search")||location.href.includes("search.1688.com");}
  function isDetailPage(){return location.href.includes("detail.1688.com")||/1688\.com\/offer\/\d+/.test(location.href);}
  function normalizeOfferUrl(href){href=String(href||"").trim();if(!href)return"";if(href.startsWith("//"))return location.protocol+href;if(href.startsWith("/"))return location.origin+href;return href;}

  function scrapeSearchResults(config){var result=[],seen={};var cards=Array.from(document.querySelectorAll(".offer-list-row .offer-item,.sm-offer-item,[class*='offerItem'],.grid-offer .offer,.offer-card"));if(!cards.length)cards=Array.from(document.querySelectorAll("a[href*='detail.1688.com'],a[href*='/offer/']")).map(function(a){return a.closest("div")||a;});cards.forEach(function(card){try{var lk=card.querySelector("a[href*='detail.1688.com'],a[href*='/offer/']")||card.querySelector("a");if(!lk)return;var href=normalizeOfferUrl(lk.href||lk.getAttribute("href")||"");if(!href||(href.indexOf("detail.1688.com")===-1&&href.indexOf("/offer/")===-1))return;if(seen[href])return;seen[href]=1;var te=card.querySelector(".title,[class*='title'],.offer-title,h2,h3,h4")||lk;var title=String(te.textContent||"").trim();if(!title)return;var pe=card.querySelector(".price-text,.price,[class*='price'],.sm-offer-priceNum");var price=parseFloat(String(pe?pe.textContent:"").replace(/[^\d.]/g,""))||0;if(config.minPrice&&price<parseFloat(config.minPrice))return;if(config.maxPrice&&price>parseFloat(config.maxPrice))return;if(price<=0)return;var ie=card.querySelector("img");result.push({href:href,title:title,price:price,image:ie?(ie.src||ie.getAttribute("data-src")||""):""});}catch(e){}});return result;}

  async function runAutoPickOnSearchPage(){if(window.__chaoweiAutoPickSearchStarted)return;window.__chaoweiAutoPickSearchStarted=true;var stored=await new Promise(function(r){chrome.storage.local.get(["auto_pick_status","auto_pick_config","auto_pick_current_category","auto_pick_category_index"],r);});var status=stored.auto_pick_status;var config=stored.auto_pick_config;var cc=stored.auto_pick_current_category;var ci=stored.auto_pick_category_index||0;if(!status||!status.running||!config||!cc)return;await sleep(3500);window.scrollTo(0,document.body.scrollHeight*0.35);await sleep(1200);var items=scrapeSearchResults(config);var mc=parseInt(config.maxCount)||5;var tp=items.slice(0,mc);if(!tp.length){chrome.runtime.sendMessage({action:"autoPickProgress",data:{type:"category_empty",title:cc.keyword,current:"类目无符合商品",processed:status.processed||0,success:status.success||0,failed:status.failed||0}});await sleep(800);chrome.runtime.sendMessage({action:"autoPickNextCategory",nextIndex:ci+1});return;}await chrome.storage.local.set({auto_pick_queue:tp,auto_pick_queue_index:0});chrome.runtime.sendMessage({action:"autoPickProgress",data:{type:"category_ready",title:cc.keyword,count:tp.length,current:"找到"+tp.length+"个商品"}});await sleep(1000);await processNextInQueue();}

  async function processNextInQueue(){var stored=await new Promise(function(r){chrome.storage.local.get(["auto_pick_queue","auto_pick_queue_index","auto_pick_counters","auto_pick_status","auto_pick_current_category","auto_pick_category_index"],r);});var queue=stored.auto_pick_queue||[];var index=stored.auto_pick_queue_index||0;var counters=stored.auto_pick_counters||{processed:0,success:0,failed:0};var status=stored.auto_pick_status||{};var cc=stored.auto_pick_current_category;var ci=stored.auto_pick_category_index||0;if(!status.running)return;if(index>=queue.length){chrome.runtime.sendMessage({action:"autoPickProgress",data:{type:"category_done",title:cc?cc.keyword:"当前类目",current:"类目完成",processed:counters.processed,success:counters.success,failed:counters.failed}});await sleep(1000);chrome.runtime.sendMessage({action:"autoPickNextCategory",nextIndex:ci+1});return;}var item=queue[index];chrome.runtime.sendMessage({action:"autoPickProgress",data:{type:"found",title:item.title,current:"准备打开："+item.title,processed:counters.processed,success:counters.success,failed:counters.failed}});await sleep(800);location.href=item.href;}

  async function runAutoPickOnDetailPage(){if(window.__chaoweiAutoPickDetailStarted)return;window.__chaoweiAutoPickDetailStarted=true;var stored=await new Promise(function(r){chrome.storage.local.get(["auto_pick_status","auto_pick_config","auto_pick_current_category","auto_pick_queue","auto_pick_queue_index","auto_pick_counters","erp_token"],r);});var status=stored.auto_pick_status;var config=stored.auto_pick_config;var cc=stored.auto_pick_current_category;var queue=stored.auto_pick_queue||[];var index=stored.auto_pick_queue_index||0;var counters=stored.auto_pick_counters||{processed:0,success:0,failed:0};if(!status||!status.running||!config||!cc)return;if(index>=queue.length)return;if(!stored.erp_token)return;var qi=queue[index];await sleep(3500);
    var skuResult=await selectSkuAndScrape(0);var pd=scrapeProductData();
    if(!pd.title||!pd.images||!pd.images.length){counters.processed++;counters.failed++;await chrome.storage.local.set({auto_pick_queue_index:index+1,auto_pick_counters:counters});chrome.runtime.sendMessage({action:"autoPickProgress",data:{type:"failed",title:qi.title||"抓取失败",current:"抓取失败跳过",processed:counters.processed,success:counters.success,failed:counters.failed}});await sleep(1500);await processNextInQueue();return;}
    if(skuResult&&skuResult.sku){pd.selectedSku=skuResult.sku;var mainImgs=skuResult.images.length>0?skuResult.images:pd.images;var detImgs=skuResult.detailImages||pd.detailImages||[];var allImgs=[];var seenI={};mainImgs.concat(detImgs).forEach(function(src){if(!seenI[src]&&allImgs.length<15){seenI[src]=true;allImgs.push(src);}});pd.images=allImgs;pd.title=pd.title+" - "+skuResult.sku.name;pd.skuPrice=skuResult.sku.price;pd.freight=skuResult.freight;}
    chrome.runtime.sendMessage({action:"autoPickProgress",data:{type:"uploading",title:pd.title,current:"获取重量："+pd.title,processed:counters.processed,success:counters.success,failed:counters.failed}});
    var wr=await getWeightAndDimensions(pd);
    if(!wr.ok){counters.processed++;counters.failed++;await chrome.storage.local.set({auto_pick_queue_index:index+1,auto_pick_counters:counters});chrome.runtime.sendMessage({action:"autoPickProgress",data:{type:"failed",title:pd.title,current:"⏭ 跳过（"+(wr.reason||"无重量")+"）",processed:counters.processed,success:counters.success,failed:counters.failed}});await sleep(2000);await processNextInQueue();return;}
    pd.weight=wr.weight;pd.dimensions=wr.dimensions||null;
    chrome.runtime.sendMessage({action:"autoPickProgress",data:{type:"uploading",title:pd.title,current:"✅ 重量"+wr.weight+"g("+wr.source+")，开始上品",processed:counters.processed,success:counters.success,failed:counters.failed}});
    var ur=await new Promise(function(resolve){chrome.runtime.sendMessage({action:"aiAutoUpload",product:pd,config:{storeIds:config.storeIds||[],styleHint:config.styleHint||"",genDalle:config.genDalle!==false,profitRate:Math.max(config.profitRate||0.25,0.15),shippingType:config.shippingType||"land",targetCategory:{keyword:cc.keyword,categoryId:cc.categoryId,typeId:cc.typeId}}},resolve);});
    var success=false;if(ur&&ur.success&&ur.taskId){for(var i=0;i<90;i++){await sleep(5000);var tr=await new Promise(function(resolve){chrome.runtime.sendMessage({action:"getTaskProgress",taskId:ur.taskId},resolve);});if(!tr||!tr.success||!tr.task)continue;if(tr.task.status==="done"){success=true;break;}if(tr.task.status==="error")break;}}
    counters.processed++;if(success)counters.success++;else counters.failed++;
    await chrome.storage.local.set({auto_pick_queue_index:index+1,auto_pick_counters:counters});
    chrome.runtime.sendMessage({action:"autoPickProgress",data:{type:success?"success":"failed",title:pd.title,current:(success?"✅ 成功：":"❌ 失败：")+pd.title,processed:counters.processed,success:counters.success,failed:counters.failed}});
    await sleep(2500);await processNextInQueue();
  }

  async function checkAutoPickMode(){var stored=await new Promise(function(r){chrome.storage.local.get(["auto_pick_status","auto_pick_config"],r);});if(!stored.auto_pick_status||!stored.auto_pick_status.running)return;if(!stored.auto_pick_config)return;if(isSearchPage())setTimeout(runAutoPickOnSearchPage,1000);else if(isDetailPage())setTimeout(runAutoPickOnDetailPage,1000);}

  // ===== 初始化 =====
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){setTimeout(openDefaultPanel,2000);});
  else setTimeout(openDefaultPanel,2000);

  var lastUrl=location.href;
  setInterval(function(){if(location.href!==lastUrl){lastUrl=location.href;window.__chaoweiAutoPickSearchStarted=false;window.__chaoweiAutoPickDetailStarted=false;var ob=document.getElementById("erp-1688-btn");if(ob)ob.remove();if(panelEl){panelEl.remove();panelEl=null;}if(maskEl){maskEl.remove();maskEl=null;}setTimeout(openDefaultPanel,2000);}},1000);
}