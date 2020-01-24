// Item of Menu Options
const item = [
    ["unloadThis", chrome.i18n.getMessage("unloadSelected")],
    ["unloadAllExceptThis", chrome.i18n.getMessage("unloadAllExceptThis")],
    ["unloadAll", chrome.i18n.getMessage("unloadAll")],
    ["unloadAllFromThisWindowExceptThis", chrome.i18n.getMessage("unloadAllFromThisWindowExceptThis")],
    ["unloadAllFromThisWindow", chrome.i18n.getMessage("unloadAllFromThisWindow")]
];

// Create element of popup page
let menu = document.createElement("div");
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    menu.className = "menu-dark";
} else {
    menu.className = "menu-light";
}
let menuOptions = document.createElement("ul");
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    menuOptions.className = "menu-dark-options";
} else {
    menuOptions.className = "menu-light-options";
}
item.forEach((item) => {
    let menuOption = document.createElement("li");
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        menuOption.className = "menu-dark-option";
    } else {
        menuOption.className = "menu-light-option";
    }
    menuOption.id = item[0];
    menuOption.textContent = item[1];
    menuOption.addEventListener("click", (target) => {
        unloader(target.target.id);
    });
    menuOptions.appendChild(menuOption);
});
menu.appendChild(menuOptions);
document.body.appendChild(menu);

// Listener for menuOption
let unloader = (id) => {

    switch (id) {

        case "unloadThis":
            chrome.tabs.query({highlighted: true, currentWindow: true}, function(tabs) {

                tabs.forEach((tab) => {
                    let currTab = tab.id;
                    chrome.tabs.discard(currTab);
                });

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

    window.close();

};

