<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "MyLoading",
})
</script>

<template>
  <div class="flex items-center justify-center w-full mt-3">

    <div class='flex space-x-1 justify-center mt-3'>
      <span class='sr-only'>Loading...</span>
      <div class='h-3 w-3 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div class='h-3 w-3 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div class='h-3 w-3 bg-gray-300 rounded-full animate-bounce'></div>
    </div>

  </div>
</template>

<style scoped>

</style>