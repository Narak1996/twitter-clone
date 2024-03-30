<template>
  <div class="flex flex-col md:flex-row items-center h-screen">
    <div class="basis-1/6 md:basis-1/3 lg:basis-1/2 flex">
      <logo-icon class="w-1/4 md:w-1/2 m-auto"></logo-icon>
    </div>
    <div class="basis-1/2 md:basis-2/3 lg:basis-1/2 sm:mx-auto1 px-5">
      <div class="font-bold text-6xl">Happening Now</div>
      <div class="font-bold text-3xl mt-10">Join today.</div>
      <div class="mt-10 w-full md:w-2/3 lg:w-2/3 xl:w-1/3 grid grid-cols-1 space-y-2">
        <button-default class="flex place-content-center gap-2" @click="signInWithGoogle">
          <google-icon></google-icon>
          Sign Up with Google
        </button-default>
        <button-default class="flex place-content-center gap-2">
          <apple-icon></apple-icon>
          Sign Up with Apple
        </button-default>

        <divider-rule>or</divider-rule>

        <button-default class="bg-primary hover:bg-primary-o text-light" @click="showModalReg">Create account
        </button-default>

        <div class="text-[10px]">
          By signing up, you agree to the <span class="text-primary">Terms of Service</span> and <span
            class="text-primary">Privacy Policy</span>, including <span class="text-primary">Cookie Use</span>.
        </div>
        <div>
          <div class="mt-14">
            Already have an account?
          </div>
          <button-default class="mt-5 text-primary relative" @click="showModal">Sign in

           <span class="absolute right-3">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                    d="M8.4 13.8C8.4 13.8 9.75 15.6 12 15.6C14.25 15.6 15.6 13.8 15.6 13.8M14.7 9.3H14.709M9.3 9.3H9.309M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM15.15 9.3C15.15 9.54853 14.9485 9.75 14.7 9.75C14.4515 9.75 14.25 9.54853 14.25 9.3C14.25 9.05147 14.4515 8.85 14.7 8.85C14.9485 8.85 15.15 9.05147 15.15 9.3ZM9.75 9.3C9.75 9.54853 9.54853 9.75 9.3 9.75C9.05147 9.75 8.85 9.54853 8.85 9.3C8.85 9.05147 9.05147 8.85 9.3 8.85C9.54853 8.85 9.75 9.05147 9.75 9.3Z"
                    :stroke="(db_check?'rgba(46, 204, 113,1.0)':'rgba(231, 76, 60,1.0)')" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </g>
            </svg>
           </span>
          </button-default>
        </div>
      </div>
    </div>

    <!--    ===============================Login========================-->
    <div class="fixed h-screen w-full bg-shadow z-50 flex justify-center animate-fade" v-if="showModalState">
      <div
          class="w-full h-screen lg:h-auto lg:w-2/5 xl:w-1/3 lg:rounded-2xl xl:rounded-2xl bg-white px-10 lg:py-20 xl:py-10 self-center relative grid place-items-center">
        <div class="absolute left-4 top-4">
          <ButtonTransparent class="cursor-pointer" @click="closeModal">
            <close-icon></close-icon>
          </ButtonTransparent>
        </div>

        <div class="container w-full lg:w-5/6 xl:w-2/3 mx-auto -mt-14 lg:mt-0 xl:mt-0 ">
          <logo-icon class="w-1/6 mx-auto "></logo-icon>
          <div class="text-2xl font-bold my-8">Sign in to X</div>
          <form @submit.prevent="handleLogin(user_obj)">
            <div class="grid grid-cols-1 space-y-5">
              <button-default class="flex place-content-center gap-2 text-">
                <google-icon></google-icon>
                Sign In with Google
              </button-default>
              <button-default class="flex place-content-center gap-2">
                <apple-icon></apple-icon>
                Sign In with Apple
              </button-default>
              <divider-rule>or</divider-rule>
              <div>
                <input-float v-model="user_obj.username" :title="'Username'" name="'username'"
                             :class="{'border-red-500':user_login_error.username}"/>
                <error-text :msg="user_login_error.username"/>
              </div>
              <div>
                <input-float v-model="user_obj.password" :title="'Password'" name="'password'" :type="'password'"
                             :class="{'border-red-500':user_login_error.password}"/>
                <error-text :msg="user_login_error.password"/>
              </div>

              <button-default :dark_mode="true" type="submit">Sign In</button-default>
              <button-default>Forgot password ?</button-default>
              <div>
                Don't have an account? <a href="#" class="text-p">Sign up</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>


    <!--    ===============================register========================-->

    <div class="fixed h-screen w-full bg-shadow z-50 flex justify-center animate-fade" v-if="showModalRegister">
      <div
          class="w-full h-screen lg:h-auto lg:w-2/5 xl:w-1/3 lg:rounded-2xl xl:rounded-2xl bg-white px-10 lg:py-20 xl:py-10 self-center relative grid place-items-center">
        <div class="absolute left-4 top-4">
          <ButtonTransparent class="cursor-pointer" @click="closeModal">
            <close-icon></close-icon>
          </ButtonTransparent>
        </div>

        <div class="container w-full lg:w-5/6 xl:w-2/3 mx-auto -mt-14 lg:mt-0 xl:mt-0 ">
          <logo-icon class="w-1/6 mx-auto "></logo-icon>
          <div class="text-2xl font-bold my-8">Register</div>
          <form @submit.prevent="handleRegister(user_reg_obj)">
            <div class="grid grid-cols-1 space-y-5">
              <div>
                <input-float v-model="user_reg_obj.name" :title="'Name'" name="'name'"
                             :class="{'border-red-500':user_reg_error.name}"/>
                <ErrorText :msg="user_reg_error.name"/>
              </div>
              <div>
                <input-float v-model="user_reg_obj.email" :title="'Email'" name="'email'"
                             :class="{'border-red-500':user_reg_error.email}"/>
                <ErrorText :msg="user_reg_error.email"/>
              </div>
              <div>
                <small>Date of birth</small>
                <vueDatePicker v-model="user_reg_obj.dob" :class="{'border-red-500':user_reg_error.dob}"/>
                <ErrorText :msg="user_reg_error.dob"/>
              </div>
              <div>
                <input-float v-model="user_reg_obj.username" :title="'Username'" name="'username'"
                             :class="{'border-red-500':user_reg_error.username}"/>
                <ErrorText :msg="user_reg_error.username"/>
              </div>
              <div>
                <input-float v-model="user_reg_obj.password" :title="'Password'" name="'password'" :type="'password'"
                             :class="{'border-red-500':user_reg_error.password}"/>
                <ErrorText :msg="user_reg_error.password"/>
              </div>
              <div>
                <input-float v-model="user_reg_obj.confirm_password" :title="'Confirm Password'"
                             name="'confirm_password'" :type="'password'"
                             :class="{'border-red-500':user_reg_error.confirm_password}"/>
                <ErrorText :msg="user_reg_error.confirm_password"/>
              </div>
              <button-default :dark_mode="true" type="submit">Register</button-default>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogoIcon from "@/components/LogoIcon";
import ButtonDefault from "@/components/ButtonDefault";
import DividerRule from "@/components/DividerRule";
import GoogleIcon from "@/components/GoogleIcon";
import AppleIcon from "@/components/AppleIcon";
import CloseIcon from "@/components/CloseIcon";
import InputFloat from "@/components/InputFloat";
import ButtonTransparent from "@/components/ButtonTransparent.vue";

import {mapActions} from "pinia";
import {useUserStore} from "@/stores/users";
import {mapState} from "pinia";
import ErrorText from "@/components/ErrorText.vue";
import {getErrorMsg} from "@/helper/helper"

export default {
  name: "LoginPage",
  components: {
    ErrorText,
    ButtonTransparent, InputFloat, CloseIcon, AppleIcon, GoogleIcon, DividerRule, ButtonDefault, LogoIcon
  },
  async created() {
    const gg = await this.getAuthUser()
    const check = await this.check_db()
    this.db_check = check.status === 200 ? 1 : 0
    if (gg.name) {
      return this.$router.push('/')
    }
  },
  data() {
    return {
      db_check: 0,
      showModalState: false,
      showModalRegister: false,
      user_obj: {
        username: '',
        password: '',
      },
      user_reg_obj: {
        username: '',
        password: '',
      },
      user_reg_error: {},
      user_login_error: {},
      loading: null
    }
  },
  methods: {
    ...mapActions(useUserStore, ['login', 'register', 'getAuth', 'check_db']),
    async handleLogin(user_obj) {
      this.showLoading()

      let data = await this.login(user_obj)

      if (data.data.token) {
        this.hideLoading()
        return this.$router.push('/')
      }


      const error = data.data.error;

      this.user_login_error.username = await getErrorMsg(error, 'username')
      this.user_login_error.password = await getErrorMsg(error, 'password')
      this.hideLoading()
    },
    async handleRegister(user_obj) {
      this.showLoading()
      let data = await this.register(user_obj)
      if (data.data.token) {
        this.hideLoading()
        return this.$router.push('/')
      }

      const error = data.data.error;

      this.user_reg_error.name = await getErrorMsg(error, 'name')
      this.user_reg_error.email = await getErrorMsg(error, 'email')
      this.user_reg_error.dob = await getErrorMsg(error, 'dob')
      this.user_reg_error.username = await getErrorMsg(error, 'username')
      this.user_reg_error.password = await getErrorMsg(error, 'password')
      this.user_reg_error.confirm_password = await getErrorMsg(error, 'confirm_password')
      this.hideLoading()
    },
    async getAuthUser() {
      return this.auth_user = await this.getAuth()
    },
    showLoading() {
      this.loading = this.$loading.show({
        // Optional parameters
        loader: 'bars',
        backgroundColor: 'rgba(52, 73, 94,0.7)',
        color: 'rgba(236, 240, 241,1.0)'
      });
    },
    hideLoading() {
      this.loading.hide()
    },
    showModal() {
      this.showModalState = true
    },
    showModalReg() {
      this.showModalRegister = true
    },
    closeModal() {
      this.showModalState = false
      this.showModalRegister = false
      this.user_reg_error = {}
      this.user_login_error = {}
    },
    signInWithGoogle() {
      window.location.href = 'http://localhost:3000/api/auth/google-login'
    }
  },
  computed: {
    ...mapState(useUserStore, ['auth_user', 'auth_token'])
  },
}
</script>

<style scoped>

</style>