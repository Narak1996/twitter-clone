<script>
import {defineComponent} from 'vue'
import CloseIcon from "@/components/CloseIcon.vue";
import ButtonTransparent from "@/components/ButtonTransparent.vue";

export default defineComponent({
  name: "MyModal",
  components: {ButtonTransparent, CloseIcon},
  props:{
    title:String,
    show_my_modal:{
      type:Boolean,default:false
    }
  },
  methods:{
    closeModal(){
      return this.$emit('closeModal',false)
    }
  }
})
</script>

<template>
  <div class="fixed h-screen w-full bg-black bg-opacity-20 z-50 flex justify-center animate-fade top-0 left-0 " v-if="show_my_modal">

    <div class="w-full  h-screen lg:h-auto  lg:w-2/5  lg:rounded-2xl xl:rounded-2xl bg-white px-3 py-1 self-start lg:top-10 relative grid place-items-center ">
      <div class="flex justify-between w-full p-3 items-center">
        <ButtonTransparent class="cursor-pointer" @click="closeModal">
          <close-icon></close-icon>
        </ButtonTransparent>
        <div class="text-lg font-bold">
          {{title}}
        </div>
        <div>
          <slot name="rightSlot"></slot>
        </div>
      </div>

      <div class="w-full mx-auto">
       <slot></slot>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>