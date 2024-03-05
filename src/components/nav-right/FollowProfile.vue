<script>
import {defineComponent} from 'vue'
import ButtonDefault from "@/components/ButtonDefault.vue";
import TrendItemBox from "@/components/nav-right/TrendItemBox.vue";

export default defineComponent({
  name: "FollowProfile",
  components: {TrendItemBox, ButtonDefault},
  props: {
    user_profile: {
      type: Object, default: () => ({
        name: 'Saravan',
        username: '@saravan',
        profile_img: 'https://source.unsplash.com/random/64x64?cute-boy'
      })
    }
  }
})
</script>

<template>
  <trend-item-box>
    <div class="flex items-center w-full">
      <div class="w-16 rounded-full border overflow-hidden">
        <img :src="user_profile.profile_img" alt="">
      </div>
      <div class="w-full flex-initial px-2">
        <b>{{user_profile.name}}</b>
        <p>{{user_profile.username}}</p>
      </div>
      <div class="">
        <button-default :dark_mode="true" class="px-2">Follow</button-default>
      </div>
    </div>
  </trend-item-box>
</template>

<style scoped>

</style>