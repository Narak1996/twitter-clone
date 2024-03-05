<template>
  <div class="w-full hover:bg-gray-50 min-h-40 border rounded-2xl overflow-hidden" v-if="twitItem">

    <div class="flex-initial w-full">

      <div class="p-3">
        <div class="flex items-center mb-1">
          <div class="w-8 rounded-full border h-min overflow-hidden">
            <img :src="twitItem.user_image" alt="">
          </div>

          <div class="ms-2">
            <span class="font-bold">{{ twitItem.name }}</span>
            <span class="text-gray-400">&nbsp;{{ twitItem.username }} . {{diffFromNow(twitItem.created_at)}}</span>
          </div>
        </div>

        <div class="text-sm">
          {{ twitItem.caption }}
        </div>
      </div>

      <div class="mt-3 ">
        <img :src="twitItem.image" class="w-full object-cover object-center max-h-60 " :class="imgClass" alt="">
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import {usePostStore} from "@/stores/posts";
import {mapActions} from "pinia";
import moment from "moment/moment";

export default defineComponent({
  name: "ReTwitBox",
  props: {
    twitId: Number,
    imgClass:{type:String,default:'sm:max-h-96 lg:max-h-[500px]'}
  },
  data() {
    return {twitItem: {}}
  },
  methods: {
    ...mapActions(usePostStore, ['getRePost']),
    diffFromNow(date){
      return moment(date).fromNow()
    },
  },
  mounted() {
    this.twitItem = this.getRePost(this.$props.twitId)
  }
})
</script>