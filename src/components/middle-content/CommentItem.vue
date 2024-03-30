<script>
import {defineComponent} from 'vue'
import MoreIcon from "@/components/icons/MoreIcon.vue";
import TwitBottomAction from "@/components/middle-content/TwitBottomAction.vue";
import ViewIcon from "@/components/icons/ViewIcon.vue";
import ShareIcon from "@/components/icons/ShareIcon.vue";
import CommentIcon from "@/components/icons/CommentIcon.vue";
import RepostIcon from "@/components/icons/RepostIcon.vue";
import moment from "moment/moment";
import LikeOIcon from "@/components/icons/LikeOIcon.vue";

export default defineComponent({
  name: "CommentItem",
  components: {
    LikeOIcon,
    RepostIcon,
    CommentIcon,
    ShareIcon,
    ViewIcon,
    TwitBottomAction, MoreIcon
  },
  props: {
    commentItem: {
      type: Object, default: () => ({
        name: 'Saravan',
        username: '@saravan',
        user_image: 'https://source.unsplash.com/random/64x64?cute-boy',
        caption: 'https://source.unsplash.com/random/64x64?cute-boy',
        created_at: '2024-01-03 22:15:31'
      })
    }
  },
  methods:{
    diffFromNow(date){
      return moment(date).fromNow()
    },
  }
})
</script>

<template>
    <div class="w-full hover:bg-gray-50 border-t p-3 pb-1 flex">
      <div class="w-12 rounded-full border h-min overflow-hidden">
        <img :src="commentItem.byUser.profile_img" alt="">
      </div>
      <div class="flex-initial w-full px-2">
        <div>
          <span class="font-bold">{{ commentItem.byUser.name }}</span>
          <span class="text-gray-400">&nbsp;{{ commentItem.byUser.username }} . {{ diffFromNow(commentItem.created_at) }}</span>
          <span class="float-end">
          <twit-bottom-action><more-icon class="w-5 h-5 opacity-50"/></twit-bottom-action>
        </span>
        </div>
        <div class="text-sm break-all">
          {{ commentItem.comment }}
        </div>
        <div class="mt-1 flex justify-between text-sm">
          <twit-bottom-action :value="0">
            <comment-icon class="w-5 h-5 opacity-50"/>
          </twit-bottom-action>
          <twit-bottom-action :color="'success'" :value="0">
            <repost-icon class="w-5 h-5 opacity-50"/>
          </twit-bottom-action>
          <twit-bottom-action :color="'danger'" :value="0">
            <like-o-icon class="w-5 h-5 opacity-50"/>
          </twit-bottom-action>
          <twit-bottom-action :value="0">
            <view-icon class="w-5 h-5 opacity-50"/>
          </twit-bottom-action>
          <twit-bottom-action>
            <share-icon :color="'primary'" class="w-5 h-5 opacity-50"/>
          </twit-bottom-action>

        </div>
      </div>
    </div>

</template>

<style scoped>

</style>