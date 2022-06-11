import unloader from './lib/unloader.js';

// On installed
/*
chrome.runtime.onInstalled.addListener((details) => {

    switch (details.reason) {

        case "install":
            if (confirm(chrome.i18n.getMessage("onInstalled"))) {
                //window.open("https://github.com/sakkyoi/Chrome-Tabs-Unloader");
            } else {
                // Nothing
            }
            break;
        case "update":
            if (chrome.runtime.getManifest().version !== details.previousVersion) {
                if (confirm(chrome.i18n.getMessage("onUpdated"))) {
                    //window.open("https://github.com/sakkyoi/Chrome-Tabs-Unloader");
                } else {
                    // Nothing
                }
            }
            break;

    }

});
*/

// Initialization Contextmenu
const contextMenuItems = ['unloadThis', 'unloadAllExceptThis', 'unloadAll', 'unloadAllFromThisWindowExceptThis', 'unloadAllFromThisWindow'];
for (let contextMenuItem of contextMenuItems) {
    chrome.contextMenus.create({ 'id': contextMenuItem, 'title': chrome.i18n.getMessage(contextMenuItem), 'contexts': [ 'page', 'action' ] });
}
chrome.contextMenus.create({ 'id': '_', 'type': 'separator', 'contexts': [ 'page', 'action' ] });
chrome.contextMenus.create({ 'id': '_preference', 'title': chrome.i18n.getMessage('preferenceButton'), 'contexts': [ 'page', 'action' ] });

// Listener for contextmenu
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    unloader(info.menuItemId);
    if (info.menuItemId === '_preference') chrome.tabs.create({ 'url': `extension://${chrome.runtime.id}/preferences.html` });
});

// Listener for action
chrome.action.onClicked.addListener(async () => {
    unloader('unloadThis');
});