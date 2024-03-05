<script>
import {defineComponent} from 'vue'
import TwitBox from "@/components/middle-content/TwitBox.vue";
import CogIcon from "@/components/icons/CogIcon.vue";
import TwitTextarea from "@/components/middle-content/TwitTextarea.vue";
import TopNavItem from "@/components/middle-content/TopNavItem.vue";
import {mapActions, mapState} from "pinia";
import {usePostStore} from "@/stores/posts";
import CommentTextarea from "@/components/middle-content/CommentTextarea.vue";
import ReTwitBox from "@/components/middle-content/ReTwitBox.vue";
import CommentItem from "@/components/middle-content/CommentItem.vue";
import BoxLight from "@/components/nav-right/BoxLight.vue";
import MyModal from "@/components/MyModal.vue";
import TrendItemBox from "@/components/nav-right/TrendItemBox.vue";

export default defineComponent({
  name: "TwitPage",
  components: {
    TrendItemBox,
    MyModal,
    BoxLight,
    CommentItem,
    ReTwitBox,
    CommentTextarea,
    TopNavItem, TwitTextarea, CogIcon, TwitBox},
  data(){
    return {
      myTwit: '',
      show_repost_modal: false,
      show_comment_modal: false,
      repost_post_id: 0,
      post_for_comment: {},
    }
  },
  computed:{
    ...mapState(usePostStore, ['getPosts']),
    getCmt() {
      return this.getComments(this.post_for_comment.id)
    }
  },
  methods:{
    handleTwit(param) {
      this.addTwit( param)
    },
    handleLike(twit, ind) {
      return this.addLike(twit, ind)
    },

    ...mapActions(usePostStore, ['addTwit', 'addLike', 'addRepost', 'addComment', 'getComments']),
    showRepostForm(twitItem) {
      this.repost_post_id = twitItem.id
      return this.show_repost_modal = true
    },
    showCommentForm(twitItem) {
      let t = this
      t.post_for_comment = twitItem
      t.show_comment_modal = true
      setTimeout(function () {
        t.scrollBottom()
      }, 100)
    },
    handleRepost(caption) {
      this.addRepost(caption, this.repost_post_id)
      return this.show_repost_modal = false
    },
    handleAddComment(comment) {
      let t = this
      t.addComment(comment, this.post_for_comment)
      setTimeout(function () {
        t.scrollBottom()
      }, 100)
    },
    handleCloseModal(stat) {
      this.show_comment_modal = stat
      return this.show_repost_modal = stat
    },
    scrollBottom() {
      const el = this.$refs.myScroll;

      if (el) {
        // Use el.scrollIntoView() to instantly scroll to the element
        el.scrollIntoView({behavior: 'smooth'});
      }
    }
  }
})
</script>

<template>
  <div class="w-full flex border-b backdrop-blur-lg bg-white bg-opacity-70 sticky top-0 z-10">
    <top-nav-item class="flex-initial w-1/2">For you</top-nav-item>
    <top-nav-item class="flex-initial w-1/2">Following</top-nav-item>
    <top-nav-item class="w-12">
      <cog-icon class="w-full"/>
    </top-nav-item>
  </div>
  <div>
    <twit-textarea @handleSubmit="handleTwit"/>
  </div>
  <div class="mb-20">
    <twit-box @showRepostForm="showRepostForm" @showCommentForm="showCommentForm"
              @addLike="handleLike(item,(getPosts.length - index-1))"
              v-for="(item,index) in getPosts.slice().reverse()" :key="index" :twit-item="item"/>
  </div>


  <my-modal :show_my_modal="show_repost_modal" @closeModal="handleCloseModal">
    <comment-textarea @handleSubmit="handleRepost">
      <re-twit-box :imgClass="'sm:max-h-80 lg:max-h-[400px]'" :twitId="repost_post_id"></re-twit-box>
    </comment-textarea>
  </my-modal>


  <my-modal :show_my_modal="show_comment_modal" @closeModal="handleCloseModal">
    <comment-textarea @handleSubmit="handleAddComment" btn-text="Add Comment">
      <re-twit-box :imgClass="'sm:max-h-72 lg:max-h-[300px]'" :twitId="post_for_comment.id">
        <box-light :title="'All comment'" class="max-h-[35vh] overscroll-none overflow-y-auto">
          <div v-if="getCmt.length">
            <comment-item v-for="(cmt,index) in getCmt" :comment-item="cmt" :key="index"></comment-item>
          </div>
          <div class="" v-else>
            <trend-item-box class=" py-5">No comment yet</trend-item-box>
          </div>
          <div ref="myScroll"></div>
        </box-light>
      </re-twit-box>
    </comment-textarea>
  </my-modal>
</template>

<style scoped>

</style>