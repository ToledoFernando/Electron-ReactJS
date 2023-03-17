const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const {
  musicFolder,
  getInfoMusic,
  downloadMusicUrl,
  getBuffer,
} = require("./event");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 1000,
    // resizable: false,
    // maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname + "/preload.js"),
    },
  });
  //Client de produccion
  win.loadFile("dist/index.html");

  //Servidor de desarrollo del client
  // win.loadURL("http://localhost:5173");

  win.setMenu(null);
};

musicFolder();
getBuffer();
getInfoMusic();

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
