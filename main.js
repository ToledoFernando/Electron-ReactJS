const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

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
  win.loadURL("http://localhost:5173");
};

ipcMain.handle("musicFolder", async (event, url) => {
  let directory;
  if (url) {
    let ruta = "\\";
    url?.forEach((element) => {
      ruta += `${element}\\`;
    });
    directory = `C:\\Users\\${process.env.USERNAME}\\Music\\${ruta}`;
  } else {
    directory = `C:\\Users\\${process.env.USERNAME}\\Music\\`;
  }
  const data = fs.readdirSync(`${directory}`);

  let mp3File = [];
  let folders = [];

  await Promise.all(
    data.map(async (file) => {
      try {
        const data = await fs.promises.stat(path.join(directory, file));
        if (data.isDirectory()) {
          folders.push({ name: file });
        } else if (path.extname(`${directory}\\${file}`) === ".mp3") {
          mp3File.push({ name: file });
        }
      } catch (err) {
        console.log(err.message);
      }
    })
  );

  for (let a = 0; a < mp3File.length; a++) {
    const buff = fs.readFileSync(path.join(directory, mp3File[a].name));
    mp3File[a].buff = buff;
  }

  return { mp3File, folders };
});

ipcMain.handle("get-music-file-url", (event, ruta) => {
  return "Musica Base 64";
});
app.whenReady().then(() => createWindow());
