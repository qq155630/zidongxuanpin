document.addEventListener("DOMContentLoaded", function() {

  function safeEl(id) { return document.getElementById(id); }

  function renderPopup() {
    chrome.storage.local.get(["erp_token", "erp_user"], function(res) {
      var token = res.erp_token;
      var user = res.erp_user;
      var isLogged = !!(token && user && typeof user === "object");
      var name = isLogged ? (user.username || "用户") : "用户";

      var userInfo = safeEl("userInfo");
      var notLogged = safeEl("notLogged");
      var userName = safeEl("userName");

      if (userInfo) userInfo.style.display = isLogged ? "block" : "none";
      if (notLogged) notLogged.style.display = isLogged ? "none" : "block";
      if (userName) userName.textContent = name;
    });
  }

  renderPopup();

  // 防抖监听
  var renderTimer = null;
  chrome.storage.onChanged.addListener(function(changes, area) {
    if (area !== "local") return;
    if (changes.erp_token || changes.erp_user) {
      clearTimeout(renderTimer);
      renderTimer = setTimeout(renderPopup, 100);
    }
  });

  // 跳转并关闭
  var goBtn = safeEl("goWebsite");
  if (goBtn) {
    goBtn.addEventListener("click", function() {
      chrome.tabs.create({ url: "https://ozonerp.chaowei.online" });
      window.close();
    });
  }

});