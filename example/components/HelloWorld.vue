<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)

import TestMdComp from './test1/test.md'

</script>

<template>
  <h1>{{ msg }}</h1>

  <div>
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>

  <TestMdComp />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
