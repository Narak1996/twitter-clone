<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ToastBox"
})
</script>

<template>
<div class="fixed bottom-5 right-5 lg:min-w-80 space-y-2">
  <slot></slot>
</div>
</template>

<style scoped>

</style>