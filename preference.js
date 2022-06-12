(async () => {
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
    const locale = await chrome.i18n.getUILanguage();
    document.getElementById('locale').value = locale;
})()