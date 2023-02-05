const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("require", (module) => {
  return require(module);
});

contextBridge.exposeInMainWorld("__dirname", __dirname);

contextBridge.exposeInMainWorld("musicFolder", async () => {
  const music = await ipcRenderer.invoke("musicFolder");
  return music;
});

contextBridge.exposeInMainWorld("music", async (archivo) => {
  const xd = await ipcRenderer.invoke("get-music-file-url", archivo);
  const audio = new Audio(xd);
  return audio;

  //  (event, fileUrl) => {
  // })
});

contextBridge.exposeInMainWorld("send", (event) => {
  const response = ipcRenderer.send(event);
  return response;
});
