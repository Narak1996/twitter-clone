<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "TabBarItem",
  props:{
    active:Boolean
  }
})
</script>

<template>
  <li>
    <div class="inline-block py-4 px-5 text-lg text-gray-500 hover:bg-light-500 relative">
      <slot></slot>
      <div v-if="active" class="absolute left-1 bottom-0 w-10/12 h-1.5 bg-primary rounded-2xl"></div>
    </div>
  </li>
</template>

<style scoped>

</style>