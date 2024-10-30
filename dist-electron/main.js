"use strict";
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
let devtools;
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 关闭上下文隔离
      contextIsolation: false,
      // 为页面集成 Node.js 环境
      nodeIntegration: true,
      // 打开remote模块
      enableRemoteModule: true,
      preload: path.join(app.getAppPath(), "preload.js")
      // 预加载文件
    }
  });
  devtools = new BrowserWindow();
  {
    const elePath = path.join(__dirname, "./node_modules/electron");
    require("electron-reload")("../", {
      electron: require(elePath)
    });
    mainWindow.loadURL("http://localhost:8888");
    mainWindow.webContents.setDevToolsWebContents(devtools.webContents);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
  ipcMain.on("open-new-window", (event, arg) => {
    console.log("===111 arg===", arg);
    const win2 = new BrowserWindow({
      width: 600,
      height: 400,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        enableRemoteModule: true
      }
    });
    win2.loadURL("http://localhost:8888/newWindow");
  });
}
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    console.log("===111===");
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
