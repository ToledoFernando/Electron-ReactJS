const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("musicFolder", async (ruta) => {
  const music = await ipcRenderer.invoke("musicFolder", ruta);
  return music;
});

contextBridge.exposeInMainWorld("getMusicInfo", async (url) => {
  const data = await ipcRenderer.invoke("getMusicInfo", url);
  return data;
});

contextBridge.exposeInMainWorld("downloadVideoURL", async (url) => {
  const info = await ipcRenderer.invoke("downloadVideoURL", url);
  return info;
});

contextBridge.exposeInMainWorld("send", (event, msg) => {
  return ipcRenderer.send(event, msg);
});

contextBridge.exposeInMainWorld("received", (event, callback) => {
  return ipcRenderer.on(event, callback);
});
