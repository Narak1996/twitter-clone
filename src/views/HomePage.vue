<template>
  <div class="w-full px-2">
    <div class="flex justify-center">

      <!-- ====================Left Side==================-->
      <div>
        <div class="p-2 h-screen sticky top-0 w-min lg:w-64">
          <div class="px-3">
            <logo-icon class="w-8 mx-auto lg:mx-0"/>
          </div>
          <div class="grid grid-cols-1 mt-5">
            <menu-item :title="'Home'" :go-to="'/'">
              <home-icon class="w-6 mx-auto lg:mx-0"/>
            </menu-item>
            <menu-item :title="'Explore'">
              <explore-icon class="w-6 mx-auto lg:mx-0"/>
            </menu-item>
            <menu-item :title="'Notifications'">
              <notification-icon class="w-6 mx-auto lg:mx-0"/>
            </menu-item>
            <menu-item :title="'Messages'">
              <message-icon class="w-6 mx-auto lg:mx-0"/>
            </menu-item>
            <menu-item :title="'Lists'">
              <list-icon class="w-6 mx-auto lg:mx-0"/>
            </menu-item>
            <menu-item :title="'Bookmarks'">
              <bookmark-icon class="w-6 mx-auto lg:mx-0"/>
            </menu-item>
            <menu-item :title="'Communities'">
              <community-icon class="w-6 mx-auto lg:mx-0"/>
            </menu-item>
            <menu-item :title="'Premium'">
              <logo-icon class="w-6 mx-auto lg:mx-0"/>
            </menu-item>
            <menu-item :title="'Profile'" :go-to="'/profile'">
              <profile-icon class="w-6 mx-auto lg:mx-0" />
            </menu-item>
            <menu-item :title="'More'">
              <more-icon-o class="w-6 mx-auto lg:mx-0"/>
            </menu-item>
          </div>
          <button-primary class="mt-5 hidden lg:block">Post</button-primary>
          <div class="h-48"></div>
          <menu-item :title="auth_user.name" :subtitle="auth_user.username" class="relative ">
            <div class="w-12 rounded-full border overflow-hidden">
              <img :src="auth_user.profile_img" alt="">
            </div>
            <button-default @click="handleLogout" :dark_mode="true" class="lg:absolute right-2 w-min px-2 z-20">
              <sign-out-icon :my_color="'rgba(236, 240, 241,1.0)'" class="w-6"></sign-out-icon>
            </button-default>
          </menu-item>
        </div>
      </div>


      <!-- ==================== Middle ==================-->
      <div class=" border min-w-80 w-4/6 max-w-2xl">
        <router-view></router-view>
      </div>

      <!-- ====================Right Side==================-->
      <div class=" w-96 pt-1 ps-6 space-y-5 hidden lg:block ">
        <div class="sticky bg-white top-0 py-2">
          <search-input/>
        </div>

        <box-light :title="'Subscribe to Premium'">
          <div class="px-4">
            <div>
              Subscribe to unlock new features and if eligible, receive a share of ads revenue.
            </div>
            <div class="py-2 ">
              <button-default class="md:w-32" :dark_mode="true">Subscribe</button-default>
            </div>
          </div>
        </box-light>

        <box-light :title="'Trends for you'">
          <trend-item :title="'Phnom Penh'" :subtitle="'Trending in Cambodia'"></trend-item>
          <trend-item :title="'Saitama'" :subtitle="'Anime · Trending'" :post="'17.7K posts'"></trend-item>
          <trend-item :title="'#GenderEquality'" :subtitle="'Trending'" :post="'276K posts'"></trend-item>
          <trend-item :title="'#winmetawin'" :subtitle="'Entertainment · Trending'" :post="'270K posts'"></trend-item>
          <trend-item-box class="text-primary rounded-b-2xl py-5">Show more</trend-item-box>
        </box-light>

        <box-light :title="'Who to follow'">

          <follow-profile v-for="(item,index) in users.slice(4)" :user_profile="item" :key="index"/>

          <trend-item-box class="text-primary rounded-b-2xl py-5">Show more</trend-item-box>
        </box-light>
      </div>

    </div>
  </div>
</template>

<script>

import {useUserStore} from "@/stores/users";
import {mapActions, mapState} from "pinia";
import LogoIcon from "@/components/LogoIcon.vue";
import HomeIcon from "@/components/icons/HomeIcon.vue";
import MenuItem from "@/components/nav-left/MenuItem.vue";
import ExploreIcon from "@/components/icons/ExploreIcon.vue";
import NotificationIcon from "@/components/icons/NotificationIcon.vue";
import MessageIcon from "@/components/icons/MessageIcon.vue";
import ListIcon from "@/components/icons/ListIcon.vue";
import BookmarkIcon from "@/components/icons/BookmarkIcon.vue";
import CommunityIcon from "@/components/icons/CommunityIcon.vue";
import ProfileIcon from "@/components/icons/ProfileIcon.vue";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import SearchInput from "@/components/nav-right/SearchInput.vue";
import BoxLight from "@/components/nav-right/BoxLight.vue";
import ButtonDefault from "@/components/ButtonDefault.vue";
import TrendItem from "@/components/nav-right/TrendItem.vue";
import TrendItemBox from "@/components/nav-right/TrendItemBox.vue";
import FollowProfile from "@/components/nav-right/FollowProfile.vue";
import MoreIconO from "@/components/icons/MoreIconO.vue";
import SignOutIcon from "@/components/icons/SignOutIcon.vue";

export default {
  name: "HomePage",
  components: {
    SignOutIcon,
    MoreIconO,
    FollowProfile,
    TrendItemBox,
    TrendItem,
    ButtonDefault,
    BoxLight,
    SearchInput,
    ButtonPrimary,
    ProfileIcon,
    CommunityIcon,
    BookmarkIcon,
    ListIcon,
    MessageIcon,
    NotificationIcon,
    ExploreIcon,
    MenuItem,
    HomeIcon,
    LogoIcon
  },
  data() {
    return {
      auth_user:{}
    }
  },
  methods: {
    ...mapActions(useUserStore, ['logMeOut','getAuth']),
    handleLogout() {
      let data = this.logMeOut()
      if (data.statusCode === 200) return this.$router.push('/login')
    },
    async getAuthUser(){
      return this.auth_user = await this.getAuth()
    }

  },
  computed: {
    ...mapState(useUserStore, ['auth_user','auth_token', 'users']), // get from auth_user state
  },
  async created() {
    const gg = await this.getAuthUser()

    if (!gg.name) {
      return this.$router.push('/login')
    }
  },


}
</script>