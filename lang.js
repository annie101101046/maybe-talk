(function () {
  var stored = null;
  try { stored = localStorage.getItem("lang"); } catch (e) {}
  var lang;
  if (stored === "zh" || stored === "en") {
    lang = stored;
  } else {
    var list = navigator.languages;
    var first = list && list.length ? list[0] : "";
    var tag = String(first || navigator.language || "");
    lang = tag.toLowerCase().indexOf("zh") === 0 ? "zh" : (tag ? "en" : "zh");
  }
  document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  if (lang === "en") document.documentElement.classList.add("i18n-pending");
  window.__siteLang = lang;
})();
