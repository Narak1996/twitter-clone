import {defineStore} from "pinia/dist/pinia";
import axios from "axios";
import {base_url} from "@/constants/base";

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [
            {
                'username': '@narak',
                'name': 'Narak KH',
                bio: 'Utilities for controlling how flex and grid items are positioned along a container main axis.',
                location: 'Cambodia',
                dob: '01-09-2982',
                'password': '@narak',
                'email': 'rak@gmail.com',
                'phone': '099223344',
                'profile_img': 'https://source.unsplash.com/random/64x64?man',
                'bg_image': 'https://source.unsplash.com/random/800x400?great-view'
            },
            {
                'username': '@karan',
                'name': 'Karan HK',
                bio: 'Utilities for controlling how flex and grid items are positioned along a container main axis.',
                location: 'Cambodia',
                dob: '01-09-2982',
                'password': 'karan',
                'email': 'ka@gmail.com',
                'phone': '099223355',
                'profile_img': 'https://source.unsplash.com/random/64x64?teen'
            },
            {
                'username': '@thida999',
                'name': 'Ma Thida',
                bio: 'Utilities for controlling how flex and grid items are positioned along a container main axis.',
                location: 'Cambodia',
                dob: '01-09-2982',
                'password': '123',
                'email': 'ka@gmail.com',
                'phone': '099223355',
                'profile_img': 'https://source.unsplash.com/random/64x64?anime-girl'
            },
            {
                'username': '@koka',
                'name': 'Ko Raka',
                bio: 'Utilities for controlling how flex and grid items are positioned along a container main axis.',
                location: 'Cambodia',
                dob: '01-09-2982',
                'password': '123',
                'email': 'ka@gmail.com',
                'phone': '099223355',
                'profile_img': 'https://source.unsplash.com/random/64x64?car'
            },
            {
                'username': '@lopez',
                'name': 'Lezpo',
                bio: 'Utilities for controlling how flex and grid items are positioned along a container main axis.',
                location: 'Cambodia',
                dob: '01-09-2982',
                'password': '123',
                'email': 'ka@gmail.com',
                'phone': '099223355',
                'profile_img': 'https://source.unsplash.com/random/64x64?singer'
            },
            {
                'username': '@nokia',
                'name': 'Niako',
                bio: 'Utilities for controlling how flex and grid items are positioned along a container main axis.',
                location: 'Cambodia',
                dob: '01-09-2982',
                'password': '123',
                'email': 'ka@gmail.com',
                'phone': '099223355',
                'profile_img': 'https://source.unsplash.com/random/64x64?phone'
            },
            {
                'username': '@ploy',
                'name': 'Ploy Plok',
                bio: 'Utilities for controlling how flex and grid items are positioned along a container main axis.',
                location: 'Cambodia',
                dob: '01-09-2982',
                'password': '123',
                'email': 'ka@gmail.com',
                'phone': '099223355',
                'profile_img': 'https://source.unsplash.com/random/64x64?boxer'
            },
        ],
        auth_user: {'username': '', 'password': '', 'name': '', 'email': '', 'phone': '', 'profile_img': ''},
        auth_token:'',
        following: [
            {following: '', follower: ''}
        ],
    }),
    persist: true,
    getters: {
        getUser() {
            return this.users;
        },
        authHeader(){
            return {
                headers:{
                    Authorization:`Bearer ${useUserStore().auth_token}`
                }
            }
        }
    },
    actions: {
        async login(user_obj) {
            const res = await axios.post(base_url+'/auth/login',user_obj)
            if (res.data.token) {
                this.setAuthToken(res.data.token)
            }
            return res;
        },
        async register(user_obj) {
            let data = await axios.post(base_url+`/auth/register`, user_obj)
            if (data.data.token) {
                this.setAuthToken(data.data.token)
            }
            return data
        },
        setAuthToken(token) {
            return this.auth_token = token
        },
        async getAuth() {
            const user =  await axios.get(base_url+'/users/get-one',{
                headers:{
                    Authorization: `Bearer ${useUserStore().auth_token}`
                }
            }).catch(function () {
                return {}
            });
            return this.auth_user = user.data?user.data:{}
        },
        logMeOut() {
            this.auth_user = {};
            this.auth_token = ''
            return {'data': {}, statusCode: 200}
        },
        findUser(username) {
            let user = {}
            this.users.forEach(function (u) {
                if (u.username === username) {
                    user = u
                }
            })
            return user
        },
        async updateProfile(user_obj) {
            let t = this
            let auth = t.auth_user;

            const user = await axios.put(`${base_url}/users/${auth._id}`,user_obj,{
                headers:{
                    Authorization:`Bearer ${this.auth_token}`
                }
            })
            this.auth_user = user.data
            return {'data': user, statusCode: 200}
        },
        async getMyTwits(){
            const data = await axios.get(`${base_url}/users/me/twits`,{
                headers:{
                    Authorization:`Bearer ${this.auth_token}`
                }
            }).catch(function (){
                console.log('error')
            })
            console.log('get data')
            return data.data
        },
        async check_db(){
            try {
                const check = await axios.get(`${base_url}/check-connection`)
                return check
            }catch (e) {
                return e
            }
        }
    },
})