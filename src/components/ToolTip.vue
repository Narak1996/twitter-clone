<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ToolTip",
  props:{
    id:{type:String,default:'tooltip-default'}
  }
})
</script>

<template>
  <div :id="id" role="tooltip" class="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity duration-300 bg-danger rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
    <slot></slot>
    <div class="tooltip-arrow" data-popper-arrow></div>
  </div>
</template>

<style scoped>

</style>