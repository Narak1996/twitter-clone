<script>
import {defineComponent} from 'vue'
import TwitBox from "@/components/middle-content/TwitBox.vue";
import CogIcon from "@/components/icons/CogIcon.vue";
import TwitTextarea from "@/components/middle-content/TwitTextarea.vue";
import TopNavItem from "@/components/middle-content/TopNavItem.vue";
import {mapActions} from "pinia";
import {usePostStore} from "@/stores/posts";
import CommentTextarea from "@/components/middle-content/CommentTextarea.vue";
import ReTwitBox from "@/components/middle-content/ReTwitBox.vue";
import CommentItem from "@/components/middle-content/CommentItem.vue";
import BoxLight from "@/components/nav-right/BoxLight.vue";
import MyModal from "@/components/MyModal.vue";
import TrendItemBox from "@/components/nav-right/TrendItemBox.vue";
import MyLoading from "@/components/MyLoading.vue";
import MyToast from "@/components/MyToast.vue";
import ToastBox from "@/components/profile/ToastBox.vue";

export default defineComponent({
  name: "TwitPage",
  components: {
    ToastBox,
    MyToast,
    MyLoading,
    TrendItemBox,
    MyModal,
    BoxLight,
    CommentItem,
    ReTwitBox,
    CommentTextarea,
    TopNavItem, TwitTextarea, CogIcon, TwitBox
  },
  data() {
    return {
      myTwit: [],
      show_repost_modal: false,
      show_comment_modal: false,
      repost_post_id: 0,
      commentTwit: [],
      isLoading: false,
      showNotification: [],
      post_for_comment: {},
    }
  },
  async mounted() {
    await this.handleGetPost()
  },
  methods: {
    async handleGetPost() {
      this.isLoading = true
      this.myTwit = await this.getPosts()
      this.isLoading = false
    },
    async handleTwit(obj) {
      if (!obj.text) {
        return this.showNotification.push('What is happening ?!')
      }
      const data = await this.addTwit(obj)
      if (data.statusCode === 200) {
        return await this.handleGetPost()
      } else {
        console.log('error')
      }
    },
    async handleLike(twit) {
      const data = await this.addLike(twit)
      twit.number_of_likes = data.number_of_likes
      twit.liked = data.liked
      return twit
    },

    ...mapActions(usePostStore, ['addTwit', 'addLike', 'addRepost', 'addComment', 'getComments', 'getPosts']),

    showRepostForm(twitItem) {
      this.repost_post_id = twitItem._id
      return this.show_repost_modal = true
    },

    async showCommentForm(twitItem) {
      let t = this
      t.post_for_comment = twitItem
      t.show_comment_modal = true

      const cmt = await this.getComments(twitItem._id)
      this.commentTwit = cmt.data


      setTimeout(function () {
        t.scrollBottom()
      }, 100)
    },
    async handleAddComment(comment) {
      let t = this
      const data  = await t.addComment(comment, this.post_for_comment)
      setTimeout(function () {
        t.scrollBottom()
      }, 100)
      const cmt = await t.getComments(this.post_for_comment._id)
      t.commentTwit = cmt.data
      setTimeout(function () {
        t.scrollBottom()
      },100)
      return data.data
    },
    async handleRepost(caption) {
      const data = await this.addRepost(caption, this.repost_post_id)
      this.show_repost_modal = false
      this.post_for_comment.number_of_repost = data.number_of_repost
      await this.handleGetPost()
      return data
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
    <div v-if="isLoading">
      <MyLoading></MyLoading>
    </div>
    <div v-else>
      <twit-box @showRepostForm="showRepostForm" @showCommentForm="showCommentForm"
                @addLike="handleLike(item)"
                v-for="(item,index) in myTwit" :key="index" :twit-item="item"/>
    </div>
  </div>

  <my-modal :show_my_modal="show_repost_modal" @closeModal="handleCloseModal">
    <comment-textarea @handleSubmit="handleRepost">
      <re-twit-box :imgClass="'sm:max-h-80 lg:max-h-[400px]'" :twitId="repost_post_id"></re-twit-box>
    </comment-textarea>
  </my-modal>
  <my-modal :show_my_modal="show_comment_modal" @closeModal="handleCloseModal">
    <comment-textarea @handleSubmit="handleAddComment" btn-text="Add Comment">
      <re-twit-box :imgClass="'sm:max-h-72 lg:max-h-[300px]'" :twitId="post_for_comment._id">
        <box-light :title="'All comment'" class="max-h-[35vh] overscroll-none overflow-y-auto">

          <div v-if="commentTwit.length">
            <comment-item v-for="(cmt,index) in commentTwit" :comment-item="cmt" :key="index"></comment-item>
          </div>
          <div class="" v-else>
            <trend-item-box class=" py-5">No comment yet</trend-item-box>
          </div>
          <div ref="myScroll"></div>
        </box-light>
      </re-twit-box>
    </comment-textarea>
  </my-modal>

  <toast-box v-if="showNotification.length">
    <my-toast v-for="(value,index ) in showNotification" :key="index">{{value}}</my-toast>
  </toast-box>
</template>

<style scoped>

</style>