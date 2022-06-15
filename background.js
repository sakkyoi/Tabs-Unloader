import unloader from './lib/unloader.js';

// On installed
chrome.runtime.onInstalled.addListener(async (details) => {
    // traditional quick access (set status on extenxion install, update, reload...)
    chrome.action.setPopup({ 'popup': (await chrome.storage.sync.get(['traditional-quick-access']))['traditional-quick-access'] ? 'popup.html' : '' });
    switch (details.reason) {

        case "install":
            chrome.tabs.create({ 'url': 'https://sakkyoi.github.io/Tabs-Unloader/welcome.html' });
            break;
        case "update":
            chrome.tabs.create({ 'url': 'https://sakkyoi.github.io/Tabs-Unloader/welcome.html' });
            break;

    }

});

// On startup
chrome.runtime.onStartup.addListener(async () => {
    // traditional quick access (set status on startup)
    chrome.action.setPopup({ 'popup': (await chrome.storage.sync.get(['traditional-quick-access']))['traditional-quick-access'] ? 'popup.html' : '' });
    // Startup unload
    if (!(await chrome.storage.sync.get(['startup-unload']))['startup-unload']) return;
    const tabs = await chrome.tabs.query({ highlighted: false });
    for (let tab of tabs) {
        chrome.tabs.discard(tab.id);
    }
});

// On storage changed
chrome.storage.onChanged.addListener(async () => {
    // traditional quick access (set status on preference change)
    chrome.action.setPopup({ 'popup': (await chrome.storage.sync.get(['traditional-quick-access']))['traditional-quick-access'] ? 'popup.html' : '' });
});

// On contextmenu clicked
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    unloader(info.menuItemId);
    if (info.menuItemId === '_preference') chrome.tabs.create({ 'url': chrome.runtime.getURL('preference/preference.html') });
});

// on action clicked
chrome.action.onClicked.addListener(async () => {
    // anti mistouch
    if (!(await chrome.storage.sync.get(['anti-mistouch']))['anti-mistouch']) unloader('unloadSelected');
});

// Initialization Contextmenu
(async () => {
    await chrome.contextMenus.removeAll(); // avoid error
    const contextMenuItems = ['unloadSelected', 'unloadAllExceptSelected', 'unloadAll', 'unloadAllFromThisWindowExceptSelected', 'unloadAllFromThisWindow'];
    for (let contextMenuItem of contextMenuItems) {
        chrome.contextMenus.create({ 'id': contextMenuItem, 'title': chrome.i18n.getMessage(contextMenuItem), 'contexts': [ 'all' ] });
    }
    chrome.contextMenus.create({ 'id': '_', 'type': 'separator', 'contexts': [ 'all' ] });
    chrome.contextMenus.create({ 'id': '_preference', 'title': chrome.i18n.getMessage('preference'), 'contexts': [ 'all' ] });
})()