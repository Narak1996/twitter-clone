<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ProfileInfoItem",
  components: {},
  props:{
    title:String
  }
})
</script>

<template>
  <div class="flex">
    <slot></slot>
    <div class="ps-1">{{title}}</div>
  </div>
</template>

<style scoped>

</style>