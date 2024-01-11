const { app, BrowserWindow, session } = require('electron')
const { installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')
const os = require('node:os')
const { path } = require('node:path')


const reactDevToolsPath = path.join(
    os.homedir(),
    'Users/prodnyansky/AppData',
    'Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi'
)

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    win.loadFile(path.join(__dirname, 'index.html'))
}
app.whenReady().then(() => {
    installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
});


app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.whenReady().then(async () => {
    await session.defaultSession.loadExtension(reactDevToolsPath)
})