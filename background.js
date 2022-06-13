import unloader from './lib/unloader.js';

// On installed
chrome.runtime.onInstalled.addListener(async (details) => {
    switch (details.reason) {

        case "install":
            break;
        case "update":
            break;

    }

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

// Listener for contextmenu
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    unloader(info.menuItemId);
    if (info.menuItemId === '_preference') chrome.tabs.create({ 'url': `extension://${chrome.runtime.id}/preferences.html` });
});

// Listener for action
chrome.action.onClicked.addListener(async () => {
    // anti mistouch
    if (!(await chrome.storage.sync.get(['anti-mistouch']))['anti-mistouch']) unloader('unloadThis');
});

// Startup unload
chrome.runtime.onStartup.addListener(async () => {
    if (!(await chrome.storage.sync.get(['startup-unload']))['startup-unload']) return;
    const tabs = await chrome.tabs.query({ highlighted: false });
    for (let tab of tabs) {
        chrome.tabs.discard(tab.id);
    }
});