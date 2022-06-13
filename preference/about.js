import i18n from "../lib/i18nHtml.js";
const manifest = await chrome.runtime.getManifest();

(async () => {
    i18n();
    document.getElementById('version').textContent = manifest.version;
})()