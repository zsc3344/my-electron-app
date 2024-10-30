const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let devtools

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
      preload: path.join(app.getAppPath(), "preload.js"), // 预加载文件
    },
  });
    // 注意：
  //  因为我们加载的是Vue 构建后的dist 目录，所以我们需要改一下， load
  //  的文件地址。
  // win.loadFile("dist/index.html");
  // 配置热更新 
  let env = 'dev'
  devtools = new BrowserWindow()
  if (env == 'dev') {
    const elePath = path.join(__dirname, './node_modules/electron')
    require('electron-reload')('../', {
      electron: require(elePath),
    })
    // 热更新监听窗口
    mainWindow.loadURL('http://localhost:8888')
    // 解决 Windows 无法正常打开开发者工具的问题 ↓
    mainWindow.webContents.setDevToolsWebContents(devtools.webContents)
    // 打开开发工具
    mainWindow.webContents.openDevTools({mode:'detach'})
  } else {
    // 生产环境中要加载文件，打包的版本
    // Menu.setApplicationMenu(null)
    // 加载 index.html
    mainWindow.loadFile(path.resolve(__dirname, './dist/index.html')) // 新增
  }
  // 监听从渲染进程发来的消息
  ipcMain.on('open-new-window', (event, arg) => {
    // 创建一个新的浏览器窗口
    console.log('===111===')
    const win2 = new BrowserWindow({
      width: 600,
      height: 400,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        enableRemoteModule: true
      }
    })

    // 加载应用的newWindow.html并传递参数
    win2.loadURL('http://localhost:8888/newWindow')
  })
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    console.log('===111===')
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