const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("require", (module) => {
  return require(module);
});

contextBridge.exposeInMainWorld("__dirname", __dirname);
