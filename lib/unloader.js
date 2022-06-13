const unloader = async (action) => {
    switch (action) {
        case 'unloadSelected': {
            const tabs = await chrome.tabs.query({ highlighted: true, currentWindow: true });
            for (let tab of tabs) {
                chrome.tabs.discard(tab.id);
            }
            break;
        }
        case 'unloadAllExceptSelected': {
            const tabs = await chrome.tabs.query({ discarded: false });
            const tabSelected = (await chrome.tabs.query({ highlighted: true, currentWindow: true })).map((tab) => { return tab.id });
            for (let tab of tabs) {
                if (tabSelected.includes(tab.id)) continue;
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
        case 'unloadAllFromThisWindowExceptSelected': {
            const tabs = await chrome.tabs.query({ discarded: false, currentWindow: true });
            const tabSelected = (await chrome.tabs.query({ highlighted: true, currentWindow: true })).map((tab) => { return tab.id });
            for (let tab of tabs) {
                if (tabSelected.includes(tab.id)) continue;
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