<script>
import {defineComponent} from 'vue'
import BackIcon from "@/components/icons/BackIcon.vue";
import {mapActions, mapState} from "pinia";
import {useUserStore} from "@/stores/users";
import TwitBottomAction from "@/components/middle-content/TwitBottomAction.vue";
import ButtonDefault from "@/components/ButtonDefault.vue";
import LocationIcon from "@/components/icons/LocationIcon.vue";
import ProfileInfoItem from "@/components/profile/ProfileInfoItem.vue";
import BirthIcon from "@/components/icons/BirthIcon.vue";
import CalendarIcon from "@/components/icons/CalendarIcon.vue";
import TabBar from "@/components/TabBar.vue";
import TabBarItem from "@/components/profile/TabBarItem.vue";
import {usePostStore} from "@/stores/posts";
import TwitBox from "@/components/middle-content/TwitBox.vue";
import MyModal from "@/components/MyModal.vue";
import CommentTextarea from "@/components/middle-content/CommentTextarea.vue";
import ReTwitBox from "@/components/middle-content/ReTwitBox.vue";
import CommentItem from "@/components/middle-content/CommentItem.vue";
import BoxLight from "@/components/nav-right/BoxLight.vue";
import TrendItemBox from "@/components/nav-right/TrendItemBox.vue";
import InputFloat from "@/components/InputFloat.vue";

export default defineComponent({
  name: "ProfilePage",
  components: {
    InputFloat,
    TrendItemBox, BoxLight, CommentItem, ReTwitBox, CommentTextarea,
    MyModal,
    TwitBox,
    TabBarItem,
    TabBar, CalendarIcon, BirthIcon, ProfileInfoItem, LocationIcon, ButtonDefault, TwitBottomAction, BackIcon
  },
  data() {
    return {
      myTwit: '',
      show_repost_modal: false,
      show_comment_modal: false,
      show_edit_profile: false,
      repost_post_id: 0,
      post_for_comment: {},
      update_user: {
        name: '',
        bio: '',
        location: '',
        dob: '',
      }
    }
  },
  computed: {
    getCmt() {
      return this.getComments(this.post_for_comment.id)
    },
    ...mapState(useUserStore, ['auth_user']),
    ...mapState(usePostStore, ['getMyPosts'])
  },
  methods: {
    handleTwit(param) {
      this.addTwit(param)
    },
    handleLike(twit, ind) {
      return this.addLike(twit, ind)
    },
    ...mapActions(useUserStore, ['updateProfile']),
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
      this.show_edit_profile = stat
      return this.show_repost_modal = stat
    },
    scrollBottom() {
      const el = this.$refs.myScroll;

      if (el) {
        el.scrollIntoView({behavior: 'smooth'});
      }
    },
    handleUpdateProfile() {
      this.updateProfile(this.update_user)
      return this.handleCloseModal(false)
    },
    showEditProfile() {
      let t = this.auth_user
      this.update_user = {
        name: t.name,
        bio: t.bio,
        location: t.location,
        dob: t.dob,
      };
      return this.show_edit_profile = true
    }
  },
})
</script>

<template>
  <div>
    <div class="w-full flex border-b backdrop-blur-lg bg-white bg-opacity-70 sticky top-0 z-10 py-2 px-5">
      <div class="px-3">
        <twit-bottom-action>
          <back-icon class=""></back-icon>
        </twit-bottom-action>
      </div>
      <div class="">
        <div class="text-lg font-bold ">{{ auth_user.name }}</div>
        <div class="text-sm">{{ getMyPosts.length }} posts</div>
      </div>
    </div>
    <div class="">
      <div class="z-10">
        <img :src="auth_user.bg_image" class="w-full max-h-64 object-cover object-center " alt="">
      </div>
      <div class="ms-5">
        <div class="flex z-20 w-full">
          <div class="rounded-full overflow-hidden w-32 border-white border-4 -mt-16 ">
            <img class="w-full" :src="auth_user.profile_img" alt="">
          </div>
          <div class="grow text-right place-self-center pe-3">
            <button-default class=" w-min text-nowrap px-3" @click="showEditProfile()">Edit profile
            </button-default>
          </div>
        </div>
        <div class="mt-5 space-y-3 text-gray-500">
          <div>
            <div class="text-xl text-black font-bold">{{ auth_user.name }}</div>
            <div class="">
              {{ auth_user.username }}
            </div>
          </div>
          <div class="text-lg text-black">
            {{ auth_user.bio }}
          </div>
          <div class="flex space-x-5">
            <ProfileInfoItem :title="auth_user.location">
              <location-icon/>
            </ProfileInfoItem>
            <ProfileInfoItem :title="auth_user.dob">
              <birth-icon/>
            </ProfileInfoItem>
            <ProfileInfoItem :title="'Joined March 2015'">
              <calendar-icon/>
            </ProfileInfoItem>
          </div>
          <div class="flex space-x-5">
            <ProfileInfoItem :title="'Following'"><span class="font-bold text-black">10</span></ProfileInfoItem>
            <ProfileInfoItem :title="'Follower'"><span class="font-bold text-black">20</span></ProfileInfoItem>
          </div>

        </div>
        <div class="mt-4">
          <tab-bar>
            <tab-bar-item :active="true">Posts</tab-bar-item>
            <tab-bar-item>Replies</tab-bar-item>
            <tab-bar-item>Highlights</tab-bar-item>
            <tab-bar-item>Articles</tab-bar-item>
            <tab-bar-item>Media</tab-bar-item>
            <tab-bar-item>Like</tab-bar-item>
          </tab-bar>
        </div>
      </div>
      <div class="mb-20">
        <div v-if="getMyPosts.length">
          <twit-box @showRepostForm="showRepostForm" @showCommentForm="showCommentForm"
                    @addLike="handleLike(item,(getMyPosts.length - index-1))"
                    v-for="(item,index) in getMyPosts.slice().reverse()" :key="index" :twit-item="item"/>
        </div>
        <div v-else>
          <div class="w-full h-96 text-gray-300 font-bold text-xl border-b flex items-center justify-center">You dont
            have any post yet.
          </div>
        </div>
      </div>
    </div>
  </div>

  <my-modal :show_my_modal="show_edit_profile" :title="'Edit Profile'" @closeModal="handleCloseModal">
    <template v-slot:rightSlot>
      <button-default :dark_mode="true" @click="handleUpdateProfile" class="px-5">Save</button-default>
    </template>
    <div>
      <div class="z-10">
        <img :src="auth_user.bg_image" class="w-full max-h-40 object-cover object-center " alt="">
      </div>
      <div class="ms-5">
        <div class="flex z-20 w-full">
          <div class="rounded-full overflow-hidden w-24 border-white border-4 -mt-12 ">
            <img class="w-full" :src="auth_user.profile_img" alt="">
          </div>
        </div>
      </div>
      <div class="mx-5 space-y-10 my-5">
        <input-float :title="'Name'" :name="'name'" v-model="update_user.name"/>
        <input-float :title="'Bio'" :name="'bio'" v-model="update_user.bio"/>
        <input-float :title="'Location'" :name="'Location'" v-model="update_user.location"/>
        <input-float :title="'Date of birth'" :name="'dob'" v-model="update_user.dob"/>
      </div>
      <div class="h-10"></div>
    </div>
  </my-modal>


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