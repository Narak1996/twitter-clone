import {defineStore} from "pinia/dist/pinia";
import {useUserStore} from "@/stores/users";
import axios from "axios";
import {base_url} from "@/constants/base";

export const usePostStore = defineStore('post', {
    state: () => ({
        posts: [],
        liked: [
            //{post_id: '', username: ''}
        ],
        comments: [
            //{id: '',post_id: '', username: '',comment:'',created_at:''}
        ],
    }),
    getters: {

        getMyPosts() {
            let user = useUserStore().auth_user
            let myPosts = []
            this.posts.forEach(function (v) {
                if (user.username === v.username) {
                    v.user_image = user.profile_img
                    myPosts.push(v)
                }
            })
            return myPosts;
        },


    },
    actions: {
        async getPosts() {
            const res = await axios.get(base_url + '/twits', {
                headers: {
                    Authorization: `Bearer ${useUserStore().auth_token}`
                }
            }).catch(function () {
                return []
            })
            return this.posts = res.data;

        },
        async addTwit(obj) {
            const data = await axios.post(`${base_url}/twits`, obj, {
                headers: {
                    Authorization: `Bearer ${useUserStore().auth_token}`
                }
            })

            return {data, statusCode: 200}
        },
        async addLike(twit) {
            let data = await axios.post(`${base_url}/twits/${twit._id}/like`, {}, useUserStore().authHeader)
            return {number_of_likes: data.data.number_of_likes, liked: data.data.liked, statusCode: 200}
        },
        async addComment(comment, post) {
            const data = await axios.post(`${base_url}/twits/${post._id}/comment`,{comment},useUserStore().authHeader)
            return {data:data.data, statusCode: 200}
        },

        async getRePost(twitId) {
            const rePost = await axios.get(`${base_url}/twits/${twitId}`, useUserStore().authHeader).catch(function () {
                return []
            })
            return rePost.data
        }, // when find post when user repost

        async addRepost(text, repost_id) {
            const data = await axios.post(`${base_url}/twits/${repost_id}/repost`,{text},useUserStore().authHeader)
            return {number_of_repost:data.number_of_repost, statusCode: 200}
        },
        async getComments(twitId) {
            const comment = await axios.get(`${base_url}/twits/${twitId}/comment`, useUserStore().authHeader)
            return comment;
        },
    },
    persist: true
})