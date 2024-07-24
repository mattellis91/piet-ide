const {app, BrowserWindow} = require('electron')
    const url = require("url");
    const path = require("path");

    let mainWindow

    function createWindow () {
      mainWindow = new BrowserWindow({
        width: 1680,
        height: 1050,
        frame: true,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        }
      })

      mainWindow.setMenu(null)

      // mainWindow.loadURL(
      //   url.format({
      //     pathname: path.join(__dirname, `/dist/logic-sim/browser/index.html`),
      //     protocol: "file:",
      //     slashes: true
      //   })
      // );

      mainWindow.loadFile('dist/logic-sim/index.html')

      // Open the DevTools.
      mainWindow.webContents.openDevTools()

      mainWindow.on('closed', function () {
        mainWindow = null
      })
    }

    app.on('ready', createWindow)

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', function () {
      if (mainWindow === null) createWindow()
    })