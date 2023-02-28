const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("musicFolder", async (ruta) => {
  const music = await ipcRenderer.invoke("musicFolder", ruta);
  return music;
});

contextBridge.exposeInMainWorld("music", async (archivo) => {
  const musicBase64 = await ipcRenderer.invoke("get-music-file-url", archivo);

  return musicBase64;
});
