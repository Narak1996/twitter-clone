<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ErrorText",
  props:{
    msg:String
  }
})
</script>

<template>
  <span class="text-danger text-xs" v-if="msg">{{msg}}</span>
</template>

<style scoped>

</style>