<template>
  <div :class="['mdp-demo', height.value > 0 && 'is-expanded']">
    <div class="mdp-demo__preview">
      <slot />
    </div>
    <div class="mdp-demo__toolbar">
      <div class="mdp-demo__btn mdp-demo__btn-copy" @click="copyCode">
        <!-- 复制后的图标 -->
        <svg
          v-if="copied"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          height="20"
          width="20"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4"
          />
        </svg>
        <!-- 复制图标 -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          height="20"
          width="20"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"
          />
        </svg>
      </div>
      <div class="mdp-demo__btn mdp-demo__btn-code" @click="toggleCode">
        <!-- 代码图标 -->
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="46"
            d="M160 368L32 256l128-112M352 368l128-112-128-112M304 96l-96 320"
          />
        </svg>
      </div>
    </div>
    <div
      class="demo__code"
      :style="{ height: height + 'px', visibility: height > 0 ? 'visible' : 'hidden' }"
    >
      <div ref="codeEl">
        <pre>
          <code v-html="highlightCode" class="code-hightlight"></code>
        </pre>
      </div>

    </div>
  </div>
</template>

<script setup>
import hljs from 'highlight.js'
import 'highlight.js/styles/stackoverflow-light.css'
import { ref, defineProps, computed } from 'vue'
const props = defineProps({
  code: { type: String, required: true }
})

const sourceCode = computed(() => {
  return decodeURIComponent(props.code)
})

const highlightCode = computed(() => {
  return hljs.highlightAuto(sourceCode.value).value
})


const codeEl = ref()
const height = ref(0)
const copied = ref(false)
const toggleCode = () => {
  const targetHeight = codeEl.value ? codeEl.value.offsetHeight : 0
  height.value = height.value === 0 ? targetHeight : 0
}
const copyCode = () => {
  if (!copied.value) {
    try {
      navigator.clipboard.writeText(sourceCode.value)
    } catch (err) {
      console.log(err)
    }
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1000)
  }
}
</script>
<style>
:root {
  --border-color: var(--vp-c-divider-light-2, rgba(60, 60, 60, 0.12));
  --btn-bg-hover: var(--vp-c-gray-light-5, #f2f2f2);
}
.dark {
  --border-color: var(--vp-c-divider-dark-2, rgba(84, 84, 84, 0.48));
  --btn-bg-hover: var(--vp-c-gray-dark-3, #3a3a3a);
}
.mdp-demo {
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}
.mdp-demo__preview {
  padding: 1rem;
}
.mdp-demo__toolbar {
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid var(--border-color);
}
.mdp-demo__btn {
  width: 38px;
  height: 100%;
  align-items: center;
  text-align: center;
  margin-left: 4px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  user-select: none;
}
.mdp-demo__btn:hover {
  background-color: var(--btn-bg-hover);
}

.mdp-demo__toolbar svg {
  width: 1rem;
  height: 1rem;
}

.mdp-demo.is-expanded {
  .mdp-demo__code {
    border-top: 1px solid var(--border-color);
  }
} 
.mdp-demo__code div[class*='language-'] {
  margin: 0;
  border-radius: 0;
}
.mdp-demo__code pre {
  margin: 0;
}
.mdp-demo__code .shiki {
  padding: 1rem;
}
.code-hightlight {
  display: block;
  text-align: left;
}
</style>
