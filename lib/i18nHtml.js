const i18n = () => {
    const html = document.getElementsByTagName('html');
    for (let obj of html) {
        obj.innerHTML = obj.innerHTML.toString().replace(/__MSG_(\w+)__/g, (i18nString, i18nKey) => {
            return i18nKey && chrome.i18n.getMessage(i18nKey) ? chrome.i18n.getMessage(i18nKey) : i18nString;
        })
    }
}

export default i18n;