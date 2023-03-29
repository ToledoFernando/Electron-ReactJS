const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  Tray,
  Menu,
} = require("electron");
const path = require("path");
const {
  musicFolder,
  getInfoMusic,
  downloadMusicUrl,
  getBuffer,
} = require("./event");

let minWindows;
let tray;

let hide;

const createWindow = () => {
  minWindows = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: "./ico/icon.png",
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname + "/preload.js"),
    },
  });

  minWindows.setMenu(null);

  //Client de produccion
  minWindows.loadFile("dist/index.html");

  //Servidor de desarrollo del client
  // minWindows.loadURL("http://localhost:5173");

  minWindows.on("close", (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      new Notification({
        title: "ElectronPlayer",
        body: "Seguira ejecutandose en segundo plano",
        icon: "ico/icon.png",
      }).show();
      minWindows.hide();
    }
    return false;
  });

  // Crear icono en la bandeja del sistema
  tray = new Tray(path.join(__dirname, "ico", "icon.png"));
  const contextMenu = Menu.buildFromTemplate([
    { label: "Abrir", click: () => minWindows.show() },
    { label: "Salir", click: () => app.quit() },
  ]);

  tray.setContextMenu(contextMenu);

  // Abrir la ventana principal al hacer clic en el icono
  tray.on("click", () => {
    minWindows.show();
  });

  // Prevenir que la aplicación se cierre al hacer clic en el botón de cerrar
  app.on("before-quit", () => {
    app.isQuiting = true;
  });
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

app.whenReady().then(() => {
  createWindow();
});
