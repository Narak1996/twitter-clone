<script>
import {defineComponent} from 'vue'
import ExploreIcon from "@/components/icons/ExploreIcon.vue";

export default defineComponent({
  name: "SearchInput",
  components: {ExploreIcon},
  props:{
    inputValue:String
  }
})
</script>

<template>
  <div class="flex items-center max-w-sm mx-auto">
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
      <div class="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
        <explore-icon class="w-6 h-6"></explore-icon>
      </div>
      <input type="text" :value="inputValue" @input="$.emit('update:inputValue',$event.target.value)" class="bg-light-500 text-gray-900 border-light text-sm rounded-3xl focus:border-primary focus:ring-0 block w-full ps-14 p-2.5" placeholder="Search" />
    </div>
  </div>
</template>

<style scoped>

</style>