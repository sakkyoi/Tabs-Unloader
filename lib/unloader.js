const unloader = async (action) => {
    switch (action) {
        case 'unloadThis': {
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
            chrome.tabs.discard(tabs[0].id);
            break;
        }
        case 'unloadSelected': {
            const tabs = await chrome.tabs.query({ highlighted: true, currentWindow: true });
            for (let tab of tabs) {
                chrome.tabs.discard(tab.id);
            }
            break;
        }
        case 'unloadAllExceptThis': {
            const tabs = await chrome.tabs.query({ discarded: false });
            const tabThis = (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
            for (let tab of tabs) {
                if (tab.id === tabThis.id) continue;
                chrome.tabs.discard(tab.id);
            }
            break;
        }
        case 'unloadAll': {
            const tabs = await chrome.tabs.query({ discarded: false });
            for (let tab of tabs) {
                chrome.tabs.discard(tab.id);
            }
            break;
        }
        case 'unloadAllFromThisWindowExceptThis': {
            const tabs = await chrome.tabs.query({ discarded: false, currentWindow: true });
            const tabThis = (await chrome.tabs.query({ active: true, currentWindow: true }))[0]
            for (let tab of tabs) {
                if (tab.id === tabThis.id) continue;
                chrome.tabs.discard(tab.id);
            }
            break;
        }
        case 'unloadAllFromThisWindow': {
            const tabs = await chrome.tabs.query({ discarded: false, currentWindow: true });
            for (let tab of tabs) {
                chrome.tabs.discard(tab.id);
            }
            break;
        }
    }
}

export default unloader;