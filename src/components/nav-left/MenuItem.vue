<script>
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    title: String,
    subtitle: {type: String,
      default: ''
    },
    goTo:{
      type:String,
      default: '#'
    }
    },
  name: "MenuItem",
})
</script>

<template>
  <router-link
      class="grid grid-cols-1 lg:grid-cols-4 items-center hover:bg-gray-100 py-2.5 px-1 md:px-3 rounded-3xl text-lg"
      :to="goTo">
    <slot></slot>
    <span class="col-span-3 hidden lg:block relative">
      {{ title }}
      <br v-if="subtitle">
      {{ subtitle }}
    </span>
  </router-link>
</template>

<style scoped>

</style>