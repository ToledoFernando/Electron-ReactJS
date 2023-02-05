const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const url = require("url");

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

ipcMain.handle("musicFolder", async (event) => {
  const music = await fs.readdirSync(
    `C:\\Users\\${process.env.USERNAME}\\Music`,
    "utf-8"
  );
  const result = music.map((m) => {
    return {
      name: m,
      ruta: `C:\\Users\\${process.env.USERNAME}\\Music\\${m}`,
    };
  });
  return result;
});

ipcMain.handle("get-music-file-url", (event, ruta) => {
  const filePath = path.join(`C:\\Users\\${process.env.USERNAME}\\Music`, ruta);
  const data = url.format({
    protocol: "file",
    slashes: true,
    pathname: filePath,
  });
  return data;
});
app.whenReady().then(() => createWindow());
