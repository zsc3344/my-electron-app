const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"), // 预加载文件
    },
  });
    // 注意：
  //  因为我们加载的是Vue 构建后的dist 目录，所以我们需要改一下， load
  //  的文件地址。
  // win.loadFile("dist/index.html");
  // 配置热更新 
  let env = 'dev'

  if (env == 'dev') {
    const elePath = path.join(__dirname, './node_modules/electron')
    require('electron-reload')('../', {
      electron: require(elePath),
    })
    // 热更新监听窗口
    mainWindow.loadURL('http://localhost:8888')
    // 打开开发工具
    // mainWindow.webContents.openDevTools()
  } else {
    // 生产环境中要加载文件，打包的版本
    // Menu.setApplicationMenu(null)
    // 加载 index.html
    mainWindow.loadFile(path.resolve(__dirname, './dist/index.html')) // 新增
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
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