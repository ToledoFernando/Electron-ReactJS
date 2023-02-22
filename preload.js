const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("require", (module) => {
//   return require(module);
// });

contextBridge.exposeInMainWorld("__dirname", __dirname);

//Busca musicas de una carpeta
contextBridge.exposeInMainWorld("musicFolder", async (ruta) => {
  const music = await ipcRenderer.invoke("musicFolder", ruta);
  return music;
});

//obtener musica en base64
contextBridge.exposeInMainWorld("music", async (archivo) => {
  const musicBase64 = await ipcRenderer.invoke("get-music-file-url", archivo);

  return musicBase64;
});
