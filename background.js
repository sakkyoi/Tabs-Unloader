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

// On startup
chrome.runtime.onStartup.addListener(async () => {
    // startup unload
    if (!(await chrome.storage.sync.get(['startup-unload']))['startup-unload']) unloader('unloadAll');
});

// Initialization Contextmenu
(async () => {
    await chrome.contextMenus.removeAll(); // avoid error
    const contextMenuItems = ['unloadSelected', 'unloadAllExceptSelected', 'unloadAll', 'unloadAllFromThisWindowExceptSelected', 'unloadAllFromThisWindow'];
    for (let contextMenuItem of contextMenuItems) {
        chrome.contextMenus.create({ 'id': contextMenuItem, 'title': chrome.i18n.getMessage(contextMenuItem), 'contexts': [ 'page', 'action' ] });
    }
    chrome.contextMenus.create({ 'id': '_', 'type': 'separator', 'contexts': [ 'page', 'action' ] });
    chrome.contextMenus.create({ 'id': '_preference', 'title': chrome.i18n.getMessage('preference'), 'contexts': [ 'page', 'action' ] });
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