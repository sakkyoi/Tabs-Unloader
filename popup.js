import unloader from './lib/unloader.js';

// Item of Menu Options
const menuItems = ['unloadSelected', 'unloadAllExceptThis', 'unloadAll', 'unloadAllFromThisWindowExceptThis', 'unloadAllFromThisWindow'];

// Create element of popup page
let menu = document.createElement('div');
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    menu.className = 'menu-dark';
} else {
    menu.className = 'menu-light';
}
let menuOptions = document.createElement('ul');
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    menuOptions.className = 'menu-dark-options';
} else {
    menuOptions.className = 'menu-light-options';
}

for (let menuItem of menuItems) {
    let menuOption = document.createElement('li');
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        menuOption.className = 'menu-dark-option';
    } else {
        menuOption.className = 'menu-light-option';
    }
    menuOption.id = menuItem;
    menuOption.textContent = chrome.i18n.getMessage(menuItem);
    menuOption.addEventListener('click', (target) => {
        unloader(target.target.id);
        window.close();
    });
    menuOptions.appendChild(menuOption);
}

menu.appendChild(menuOptions);
document.body.appendChild(menu);