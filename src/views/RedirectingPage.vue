<script>
import {defineComponent} from 'vue'
import {mapActions} from "pinia";
import {useUserStore} from "@/stores/users";

export default defineComponent({
  name: "RedirectingPage",
  data(){
    return {loading:''}
  },
  methods:{
    ...mapActions(useUserStore,['getAuth','setAuthToken'])
  },
  async created() {
    this.loading = this.$loading.show({
      // Optional parameters
      loader:'dots',
      backgroundColor:'rgba(52, 73, 94,0.2)',
      color:'rgba(44, 62, 80,1.0)'
    });
    this.setAuthToken(this.$route.query.token)
    const auth = await this.getAuth()
    if(auth){
      this.$router.push('/');
    }else{
      this.$router.push('/login');
    }

  },
  unmounted() {
    this.loading.hide()
  }
})
</script>
<template>
  <div>Redirect</div>
</template>

<style scoped>

</style>