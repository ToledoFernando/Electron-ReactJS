const { app, BrowserWindow, ipcMain, Notification } = require("electron");
app.setName("ElectronPlayer");

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
  //Client de produccion
  // win.loadFile("dist/index.html");

  //Archivos de produccion del client
  // win.loadFile("client/dist/index.html");

  //Servidor de desarrollo del client
  win.loadURL("http://localhost:5173");

  win.setMenu(null);
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
    icon: "ico/icon.png",
  }).show();
  downloadMusicUrl(msg);
});

app.whenReady().then(() => createWindow());

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
