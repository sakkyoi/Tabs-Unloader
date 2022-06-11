import unloader from './lib/unloader.js';

// Item of Menu Options
const menuItems = ['unloadSelected', 'unloadAllExceptThis', 'unloadAll', 'unloadAllFromThisWindowExceptThis', 'unloadAllFromThisWindow'];

// Create element of popup page
const menu = document.getElementById('menu');

for (let menuItem of menuItems) {
    const menuOption = document.createElement('a');
    menuOption.classList.add("item");
    menuOption.textContent = chrome.i18n.getMessage(menuItem);
    menuOption.addEventListener('click', async () => {
        unloader(menuItem);
        window.close();
    });
    menu.appendChild(menuOption);
}

const divider = document.createElement('div');
divider.classList.add('ts-divider');

menu.appendChild(divider);

const preferenceButton = document.createElement('a');
preferenceButton.classList.add('item');
preferenceButton.textContent = chrome.i18n.getMessage('preferenceButton');
preferenceButton.addEventListener('click', async () => {
    chrome.tabs.create({ 'url': `extension://${chrome.runtime.id}/preferences.html` });
});

menu.appendChild(preferenceButton);