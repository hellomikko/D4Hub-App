const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1450,
        height: 800,
        frame: true,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadFile(path.join(__dirname, 'public', 'index.html'));

    mainWindow.webContents.on('did-finish-load', () => {
        const mainMenuTemplate = [
            {
                label: 'File',
                submenu: [
                    { role: 'quit' }
                ]
            },
            {
                label: 'D4 Tools',
                submenu: [
                    { label: 'Maxroll', click() { mainWindow.loadURL('https://maxroll.gg/d4') } },
                    { label: 'Diablo Twitter', click() { mainWindow.loadURL('https://x.com/Diablo') } },
                    { label: 'Diablo4Life', click() { mainWindow.loadURL('https://diablo4.life/') } },
                    { label: 'Event Timers', click() { mainWindow.loadURL('https://diablo4.life/trackers/overview') } }
                ]
            },
            {
                label: 'Dev Tools',
                submenu: [
                    { label: 'Developers', click() { mainWindow.loadURL('https://github.com/nolvuscodes/D4Hub-App/blob/main/README.md#contributing') } },
                    { label: 'Documentation', click() { mainWindow.loadURL('https://github.com/nolvuscodes/D4Hub-App/wiki') } },
                    { label: 'Community Discussions', click() { mainWindow.loadURL('https://github.com/nolvuscodes/D4Hub-App/discussions') } },
                    { label: 'Search Issues', click() { mainWindow.loadURL('https://github.com/nolvuscodes/D4Hub-App/issues') } },
                    { label: 'Check for Latest Version', click() { mainWindow.loadURL('https://github.com/nolvuscodes/D4Hub-App/releases') } }
                ]
            }
        ];

        if (mainWindow.webContents.getURL() !== `file://${path.join(__dirname, 'public', 'index.html')}`) {
            mainMenuTemplate.push({
                label: 'Navigation',
                submenu: [
                    { label: 'Back', click() { if (mainWindow.webContents.canGoBack()) { mainWindow.webContents.goBack(); } } },
                    { label: 'Forward', click() { if (mainWindow.webContents.canGoForward()) { mainWindow.webContents.goForward(); } } }
                ]
            });
        }

        const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
        mainWindow.setMenu(mainMenu);
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
