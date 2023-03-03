const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const fs = require("fs");
const {
  musicFolder,
  getInfoMusic,
  // downloadVideoURL,
  downloadMusicUrl,
} = require("./event");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname + "/preload.js"),
    },
  });
  // win.loadFile("dist/index.html");
  win.loadFile("client/dist/index.html");
  // win.loadURL("http://localhost:5173");
};

musicFolder();
getInfoMusic();

// ipcMain.on("downloadVideo", (event, msg) => {
//   new Notification({
//     title: "Descargando Video",
//     body: msg.title,
//   }).show();
//   downloadVideoURL(msg);
// });

ipcMain.on("downloadMusic", (event, msg) => {
  new Notification({
    title: "Descargando Musica",
    body: msg.title,
  }).show();
  downloadMusicUrl(msg);
});

app.whenReady().then(() => createWindow());
