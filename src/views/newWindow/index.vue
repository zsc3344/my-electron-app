<template>
  <div>
    <h1>渲染进程</h1>
    <span>{{ msg }}</span>
  </div>
</template>

<script>
import { defineProps }  from 'vue'

const msg = defineProps (['arg'])

</script>

<style>
h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
}
</style>
