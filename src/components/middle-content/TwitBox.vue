
<template>
  <div class="w-full hover:bg-gray-50 min-h-40 border-b p-3 pb-1 flex" v-if="twitItem">
    <div class="w-12 rounded-full border h-min overflow-hidden">
      <img :src="twitItem.user_image" alt="">
    </div>
    <div class="flex-initial w-full px-2">
      <div>
        <span class="font-bold">{{ twitItem.name }}</span>
        <span class="text-gray-400">&nbsp;{{ twitItem.username }} . {{diffFromNow(twitItem.created_at)}}</span>
        <span class="float-end">
          <twit-bottom-action><more-icon class="w-5 h-5 opacity-50"/></twit-bottom-action>
        </span>
      </div>
      <div class="text-sm">
        {{ twitItem.caption }}
      </div>
      <div class="mt-3">
        <div class="" v-if="twitItem.repost_id">
          <re-twit-box :twitId="twitItem.repost_id"></re-twit-box>
        </div>
        <img v-else :src="twitItem.image" class="w-full rounded-2xl object-cover object-center max-h-96 lg:max-h-[500px]" alt="">
      </div>
      <div class="mt-1 flex justify-between text-sm">
        <twit-bottom-action :value="twitItem.comment_number??0">
          <comment-icon @click="showCommentForm" class="w-5 h-5 opacity-50"/>
        </twit-bottom-action>
        <twit-bottom-action @click="showRepostForm" :color="'success'" :value="twitItem.repost_number??0">
          <repost-icon class="w-5 h-5 opacity-50"/>
        </twit-bottom-action>
        <twit-bottom-action @click="addLike" :color="'danger'" :value="twitItem.likes??0">
          <like-icon v-if="isLiked" class="w-5 h-5 opacity-50"/>
          <like-o-icon v-else class="w-5 h-5 opacity-50"/>
        </twit-bottom-action>
        <twit-bottom-action :value="'24K'">
          <view-icon class="w-5 h-5 opacity-50"/>
        </twit-bottom-action>

        <div class="flex">
          <twit-bottom-action>
            <share-icon :color="'primary'" class="w-5 h-5 opacity-50"/>
          </twit-bottom-action>
          <twit-bottom-action>
            <book-mark-thin :color="'primary'" class="w-5 h-5 opacity-50"/>
          </twit-bottom-action>
        </div>

      </div>
    </div>
  </div>

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
import {mapState} from "pinia";
import {usePostStore} from "@/stores/posts";
import LikeOIcon from "@/components/icons/LikeOIcon.vue";
import ReTwitBox from "@/components/middle-content/ReTwitBox.vue";

import moment from "moment";

export default defineComponent({
  name: "TwitBox",
  components: {
    ReTwitBox,
    LikeOIcon,
    MoreIcon,
    BookMarkThin,
    ShareIcon, ViewIcon, LikeIcon, RepostIcon, CommentIcon, TwitBottomAction
  },
  props: {
    twitItem: Object
  },
  data(){
    return {isLiked : false,twitData:null}
  },
  computed:{
    ...mapState(usePostStore,["liked"]),

  },
  methods: {
    diffFromNow(date){
      return moment(date).fromNow()
    },
    addLike(){
      this.$emit('addLike',this.twitItem)
      this.checkLike()
    },
    showCommentForm(){
      return this.$emit('showCommentForm',this.twitItem)
    },
    showRepostForm(){
      return this.$emit('showRepostForm',this.twitItem)
    },
    checkLike(){
      let t = this
      t.isLiked = false
      let prop = this.$props.twitItem


      this.liked.forEach(function (v) {
        if(v.post_id===prop.id&&v.username===prop.username) {
          t.isLiked = true
        }
      })
      return  (t.isLiked)
    }
  },
  mounted() {
    this.checkLike()
  },
})
</script>