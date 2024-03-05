<script>
import {defineComponent} from 'vue'
import MoreIcon from "@/components/icons/MoreIcon.vue";
import TwitBottomAction from "@/components/middle-content/TwitBottomAction.vue";
import TrendItemBox from "@/components/nav-right/TrendItemBox.vue";

export default defineComponent({
  name: "TrendItem",
  components: {TrendItemBox, TwitBottomAction, MoreIcon},
  props:{
    title:String,
    subtitle:String,
    post:String
  }
})
</script>

<template>
  <trend-item-box>
    <div class="float-end">
      <twit-bottom-action>
        <more-icon class="w-5 h-5 opacity-50"/>
      </twit-bottom-action>
    </div>
    <div>
      <p>{{subtitle}}</p>
      <b>{{title}}</b>
      <p v-if="post">{{post}}</p>
    </div>
  </trend-item-box>
</template>

<style scoped>

</style>