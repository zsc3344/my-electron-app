import { ipcRenderer } from 'electron'
window.ipcRenderer = ipcRenderer

window.addEventListener("DOMContentLoaded", () => {
  console.log(' Hello Electron');
});