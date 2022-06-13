import i18n from "../lib/i18nHtml.js";
const manifest = await chrome.runtime.getManifest();

(async () => {
    i18n();
    const preferences = ['anti-mistouch', 'startup-unload'];
    for (let preference of preferences) {
        const value = (await chrome.storage.sync.get([preference]))[preference];
        if (!(value === undefined || value === false)) {
            document.getElementById(preference).click();
        }
        document.getElementById(preference).addEventListener('change', (ev) => {
            const preferenceObj = {};
            preferenceObj[preference] = ev.target.checked;
            chrome.storage.sync.set(preferenceObj);
        });
    }
    document.getElementById('locale').value = (await chrome.i18n.getAcceptLanguages()).includes(await chrome.i18n.getUILanguage()) ? await chrome.i18n.getUILanguage() : manifest.default_locale;
    document.getElementById('available-locale').textContent = (await chrome.i18n.getAcceptLanguages()).join(', ');
})()