<template>
  <div>
    <h1>Counter</h1>
    <button @click="onClick">Count is: {{ count }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)
const onClick = () => {
  count.value++
}
</script>

<style scoped>
button {
  font-weight: bold;
}
</style>