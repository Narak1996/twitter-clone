<template>
  <button :type="'button'" class="text-sm w-full border rounded-3xl py-3 m-1 transition duration-200 font-bold hover:bg-primary-o bg-primary text-light" ><slot></slot></button>

</template>

<script>
export default {
  name: "ButtonPrimary",
  props:{
    dark_mode:{type:Boolean,default:false},
  }
}
</script>

<style scoped>

</style>