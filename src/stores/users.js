import {defineStore} from "pinia/dist/pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        users :[
            {'username':'@narak','name':'Narak KH', bio: 'Utilities for controlling how flex and grid items are positioned along a container main axis.',location: 'Cambodia',dob: '01-09-2982','password':'narak','email':'rak@gmail.com','phone':'099223344','profile_img':'https://source.unsplash.com/random/64x64?man','bg_image':'https://source.unsplash.com/random/800x400?great-view'},
            {'username':'@karan','name':'Karan HK', bio: 'Utilities for controlling how flex and grid items are positioned along a container main axis.',location: 'Cambodia',dob: '01-09-2982','password':'karan','email':'ka@gmail.com','phone':'099223355','profile_img':'https://source.unsplash.com/random/64x64?teen'},
            {'username':'@thida999','name':'Ma Thida', bio: 'Utilities for controlling how flex and grid items are positioned along a container main axis.',location: 'Cambodia',dob: '01-09-2982','password':'123','email':'ka@gmail.com','phone':'099223355','profile_img':'https://source.unsplash.com/random/64x64?anime-girl'},
            {'username':'@koka','name':'Ko Raka', bio: 'Utilities for controlling how flex and grid items are positioned along a container main axis.',location: 'Cambodia',dob: '01-09-2982','password':'123','email':'ka@gmail.com','phone':'099223355','profile_img':'https://source.unsplash.com/random/64x64?car'},
            {'username':'@lopez','name':'Lezpo', bio: 'Utilities for controlling how flex and grid items are positioned along a container main axis.',location: 'Cambodia',dob: '01-09-2982','password':'123','email':'ka@gmail.com','phone':'099223355','profile_img':'https://source.unsplash.com/random/64x64?singer'},
            {'username':'@nokia','name':'Niako', bio: 'Utilities for controlling how flex and grid items are positioned along a container main axis.',location: 'Cambodia',dob: '01-09-2982','password':'123','email':'ka@gmail.com','phone':'099223355','profile_img':'https://source.unsplash.com/random/64x64?phone'},
            {'username':'@ploy','name':'Ploy Plok', bio: 'Utilities for controlling how flex and grid items are positioned along a container main axis.',location: 'Cambodia',dob: '01-09-2982','password':'123','email':'ka@gmail.com','phone':'099223355','profile_img':'https://source.unsplash.com/random/64x64?boxer'},
        ],
        auth_user:{'username':'','password':'','name':'','email':'','phone':'','profile_img':''},
        following:[
            {following:'',follower:''}
        ],
    }),
    persist: true,
    getters: {
        getAuth(){
            return this.auth_user;
        },
        getUser(){
            return this.users;
        },
    },
    actions: {
        login(user_obj){
            let t = this

            let data = {'data':{},statusCode:404}
            t.users.forEach((v)=>{
                if(user_obj.username===v.username&&user_obj.password===v.password) {
                    t.auth_user=v;
                    data = {'data':v,statusCode:200}
                }
            })
            return data;
        },
        logMeOut(){
            this.auth_user =  {'username':'','password':'','name':'','email':'','phone':'','profile_img':''};
            return {'data':{},statusCode:200}
        },
        findUser(username){
            let user = {}
            this.users.forEach(function (u) {
                if(u.username===username){
                    user = u
                }
            })
            return user
        },
        updateProfile(user_obj){
            let t = this
            let auth = t.auth_user;
            let u = this.findUser(this.auth_user.username)

            u.name = user_obj.name;
            u.dob = user_obj.dob;
            u.bio = user_obj.bio;
            u.location = user_obj.location;

            auth.name = user_obj.name;
            auth.dob = user_obj.dob;
            auth.bio = user_obj.bio;
            auth.location = user_obj.location;

            return {'data':{},statusCode:200}
        }
    },
})