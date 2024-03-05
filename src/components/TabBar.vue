<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "TabBar"
})
</script>

<template>
  <div class="mb-4 border-b border-gray-200 dark:border-gray-700 ">
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center justify-between" >
      <slot></slot>
    </ul>
  </div>
</template>

<style scoped>

</style>