const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    resizable: false,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname + "/preload.js"),
    },
  });
  // win.loadFile("dist/index.html");
  win.loadURL("http://localhost:5173");
};

app.whenReady().then(() => createWindow());
