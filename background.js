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
chrome.contextMenus.create({"id": "unload", "title": chrome.i18n.getMessage("unload")});
chrome.contextMenus.create({"id": "unloadThis", "parentId": "unload", "title": chrome.i18n.getMessage("unloadThis")});
chrome.contextMenus.create({"id": "unloadAllExceptThis", "parentId": "unload", "title": chrome.i18n.getMessage("unloadAllExceptThis")});
chrome.contextMenus.create({"id": "unloadAll", "parentId": "unload", "title": chrome.i18n.getMessage("unloadAll")});
chrome.contextMenus.create({"id": "unloadAllFromThisWindowExceptThis", "parentId": "unload", "title": chrome.i18n.getMessage("unloadAllFromThisWindowExceptThis")});
chrome.contextMenus.create({"id": "unloadAllFromThisWindow", "parentId": "unload", "title": chrome.i18n.getMessage("unloadAllFromThisWindow")});

// Listener for contextmenu
chrome.contextMenus.onClicked.addListener((info, tab) => {

    switch (info.menuItemId) {

        case "unloadThis":
        case "unload":
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

                let currTab = tabs[0].id;
                chrome.tabs.discard(currTab);

            });
            break;
        case "unloadAllExceptThis":
            chrome.tabs.query({discarded: false}, function(tabs) {

                chrome.tabs.query({active: true, currentWindow: true}, function(tabThis) {

                    let currTab = tabThis[0].id;

                    let tabIds = [];
                    tabs.forEach((tab) => {
                        tabIds.push(tab.id);
                    });

                    tabIds.splice(tabIds.indexOf(currTab), 1);

                    tabIds.forEach((id) => {
                        chrome.tabs.discard(id);
                    });

                });

            });
            break;
        case "unloadAll":
            chrome.tabs.query({discarded: false}, function(tabs) {


                let tabIds = [];
                tabs.forEach((tab) => {
                    tabIds.push(tab.id);
                });

                tabIds.forEach((id) => {
                    chrome.tabs.discard(id);
                });

            });
            break;
        case "unloadAllFromThisWindowExceptThis":
            chrome.tabs.query({discarded: false, currentWindow: true}, function(tabs) {

                chrome.tabs.query({active: true, currentWindow: true}, function(tabThis) {

                    let currTab = tabThis[0].id;

                    let tabIds = [];
                    tabs.forEach((tab) => {
                        tabIds.push(tab.id);
                    });

                    tabIds.splice(tabIds.indexOf(currTab), 1);

                    tabIds.forEach((id) => {
                        chrome.tabs.discard(id);
                    });

                });

            });
            break;
        case "unloadAllFromThisWindow":
            chrome.tabs.query({discarded: false, currentWindow: true}, function(tabs) {

                let tabIds = [];
                tabs.forEach((tab) => {
                    tabIds.push(tab.id);
                });

                tabIds.forEach((id) => {
                    chrome.tabs.discard(id);
                });

            });
            break;

    }

});
