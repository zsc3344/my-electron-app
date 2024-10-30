<template>
  <div class="home">
    <span>主进程</span>
    <el-button @click="openSubPage">打开渲染进程</el-button>
  </div>
</template>
<script setup lang="ts">
import { ipcRenderer } from 'electron'
function openSubPage(){
  console.log('===000===')
  ipcRenderer.send('open-new-window', 'Hello from main window!')
}
</script>
<style lang="scss" scoped>
.home{
  display: flex;
  flex-direction: column;
}
</style>