
<template>
  <div class="w-full hover:bg-gray-50 min-h-40 border-b p-3 pb-1 flex" v-if="twitItem">
    <div class="w-12 rounded-full border h-min overflow-hidden">
      <img :src="twitItem.byUser.profile_img" alt="">
    </div>
    <div class="flex-initial w-full px-2">
      <div>
        <span class="font-bold">{{ twitItem.byUser.name }}</span>
        <span class="text-gray-400">&nbsp;{{ twitItem.byUser.username }} . {{diffFromNow(twitItem.createdDate)}}</span>
        <span class="float-end">
          <twit-bottom-action data-tooltip-target="tooltip-default"><more-icon class="w-5 h-5 opacity-50"/></twit-bottom-action>
        </span>
      </div>
      <div class="text-sm">
        {{ twitItem.text }}
      </div>
      <div class="mt-3">
        <div class="" v-if="twitItem.repost_id">
          <re-twit-box :twitId="twitItem.repost_id"></re-twit-box>
        </div>
        <img v-else v-bind:src="twitItem.image" class="w-full rounded-2xl object-cover object-center max-h-96 lg:max-h-[500px]" alt="">
      </div>
      <div class="mt-1 flex justify-between text-sm">
        <twit-bottom-action :value="twitItem.number_of_comments??'0'">
          <comment-icon @click="showCommentForm" class="w-5 h-5 opacity-50"/>
        </twit-bottom-action>
        <twit-bottom-action @click="showRepostForm" :color="'success'" :value="twitItem.number_of_repost??'0'">
          <repost-icon class="w-5 h-5 opacity-50"/>
        </twit-bottom-action>
        <twit-bottom-action  @click="addLike" :color="'danger'" :value="twitItem.number_of_likes??'0'">
          <like-icon v-if="twitItem.liked" class="w-5 h-5 opacity-50"/>
          <like-o-icon v-else class="w-5 h-5 opacity-50"/>
        </twit-bottom-action>
        <twit-bottom-action :value="'0'"  data-tooltip-target="tt1">
          <view-icon class="w-5 h-5 opacity-50"/>
        </twit-bottom-action>

        <div class="flex">
          <twit-bottom-action data-tooltip-target="tt2">
            <share-icon class="w-5 h-5 opacity-50"/>
          </twit-bottom-action>
          <twit-bottom-action data-tooltip-target="tt3">
            <book-mark-thin class="w-5 h-5 opacity-50"/>
          </twit-bottom-action>
        </div>
      </div>
    </div>
  </div>

  <ToolTip v-for="ii in 3" :id="`tt${ii}`" :key="ii"><warning-icon class="w-5 h-5 opacity-50" /></ToolTip>
</template>

<script>
import {defineComponent} from 'vue'
import TwitBottomAction from "@/components/middle-content/TwitBottomAction.vue";
import CommentIcon from "@/components/icons/CommentIcon.vue";
import RepostIcon from "@/components/icons/RepostIcon.vue";
import LikeIcon from "@/components/icons/LikeIcon.vue";
import ViewIcon from "@/components/icons/ViewIcon.vue";
import ShareIcon from "@/components/icons/ShareIcon.vue";
import BookMarkThin from "@/components/icons/BookMarkThin.vue";
import MoreIcon from "@/components/icons/MoreIcon.vue";
import LikeOIcon from "@/components/icons/LikeOIcon.vue";
import ReTwitBox from "@/components/middle-content/ReTwitBox.vue";

import moment from "moment";
import ToolTip from "@/components/ToolTip.vue";
import WarningIcon from "@/components/icons/WarningIcon.vue";
import {base_url} from "@/constants/base";

export default defineComponent({
  name: "TwitBox",
  components: {
    WarningIcon,
    ToolTip,
    ReTwitBox,
    LikeOIcon,
    MoreIcon,
    BookMarkThin,
    ShareIcon, ViewIcon, LikeIcon, RepostIcon, CommentIcon, TwitBottomAction
  },
  props: {
    twitItem: Object,
  },
  data(){
    return {twitData:null}
  },
  methods: {
    base_url() {
      return base_url.replace('/api','/')
    },
    diffFromNow(date){
      return moment(date).fromNow()
    },
    addLike(){
      this.$emit('addLike',this.twitItem)
    },
    showCommentForm(){
      return this.$emit('showCommentForm',this.twitItem)
    },
    showRepostForm(){
      return this.$emit('showRepostForm',this.twitItem)
    },
  },
})
</script>