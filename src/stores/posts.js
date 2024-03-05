import {defineStore} from "pinia/dist/pinia";
import {useUserStore} from "@/stores/users";

export const usePostStore = defineStore('post', {
    state: () => ({
        posts: [
            {
                id: 1,
                repost_number: 0,
                repost_id: 0,
                likes: 0,
                comment_number: 0,
                username: '@narak',
                name: 'Narak KH',
                caption: 'Discover the breathtaking beauty of Cambodia\'s ancient temples 🏯 #CambodiaTemple #ExploreAsia #Wanderlust',
                image: 'https://source.unsplash.com/random/512x300?cambodia-temple',
                created_at: '2024-01-03 22:15:31'
            },
            {
                id: 2,
                repost_number: 0,
                repost_id: 0,
                likes: 0,
                comment_number: 0,
                username: '@karan',
                name: 'Karan HK',
                caption: ' From Lort Cha—a stir-fried dish with short-fat rice noodles, bean sprouts, and beef—to the Num Pang sandwich (similar to Vietnam’s Banh Mi), the streets of Cambodia are bustling with delicious and unique treats. Fresh herbs, vegetables, and spices like lemongrass and kaffir lime leaves infuse these street delights',
                image: 'https://source.unsplash.com/random/300x512?khmer-street-food',
                created_at: '2024-3-3 22:15:31'
            },
            {
                id: 3,
                repost_number: 0,
                repost_id: 0,
                likes: 0,
                comment_number: 0,
                username: '@thida999',
                name: 'Ma Thida',
                caption: 'The United Nations Transitional Authority in Cambodia (UNTAC) was a peacekeeping operation in Cambodia from 1992 to 1993. Formed after the 1991 Paris Peace Accords, UNTAC directly administered an independent state, organizing elections, running its own radio station, and safeguarding human rights. It stabilized the country after decades of war, facilitated a democratically elected government, and repatriated over 350,000 refugees',
                image: 'https://source.unsplash.com/random/400x512?cambodia-united-nation',
                created_at: '2024-3-3 22:15:31'
            },
            {
                id: 4,
                repost_number: 0,
                repost_id: 0,
                likes: 0,
                comment_number: 0,
                username: '@koka',
                name: 'Ko Raka',
                caption: 'This distinctive spice paste forms the base of many Cambodian dishes. It includes lemongrass, kaffir lime, and galangal. Sweet and tangy, it infuses salads, shredded meats, vegetables, and herbs ',
                image: 'https://source.unsplash.com/random/512x400?Cambodia, a land of plains and great rivers, holds historical significance beyond its present reduced territory. From the Hindu-Buddhist kingdoms of Funan and Chenla to the majestic Angkor period, it influenced Southeast Asia. Despite the Khmer Rouge’s devastation, Cambodia remains resilient, rich in culture, and deeply connected to its pas',
                created_at: '2024-3-3 22:15:31'
            },
            {
                id: 5,
                repost_number: 0,
                repost_id: 0,
                likes: 0,
                comment_number: 0,
                username: '@lopez',
                name: 'Lezpo',
                caption: 'The Silver Pagoda, also known as Wat Preah Keo or the ‘Temple of the Emerald Buddha’, is an ornate structure located on the south side of the Royal Palace in Phnom Penh. Originally built in 1892 under King Norodom, it was later rebuilt in 1962, adorned with silver and jewels. Remarkably, it survived the Khmer Rouge era, making it one of Cambodia’s few temples to endure that tumultuous period',
                image: 'https://source.unsplash.com/random/512x700?bycicle',
                created_at: '2024-3-3 22:15:31'
            },
            {
                id: 6,
                repost_number: 0,
                repost_id: 0,
                likes: 0,
                comment_number: 0,
                username: '@nokia',
                name: 'Niako',
                caption: 'Dog',
                image: 'https://source.unsplash.com/random/1000x512?dog',
                created_at: '2024-3-3 22:15:31'
            },
            {
                id: 7,
                repost_number: 0,
                repost_id: 0,
                likes: 0,
                comment_number: 0,
                username: '@ploy',
                name: 'Ploy Plok',
                caption: 'cat',
                image: 'https://source.unsplash.com/random/600x600?cat',
                created_at: '2024-3-3 22:15:31'
            },
        ],
        liked: [
            //{post_id: '', username: ''}
        ],
        comments: [
            //{id: '',post_id: '', username: '',comment:'',created_at:''}
        ],
    }),
    getters: {
        getPosts() {
            this.posts.forEach(function (v) {
                v.user_image = useUserStore().findUser(v.username).profile_img
            })
            return this.posts;
        },
        getMyPosts() {
            let user = useUserStore().auth_user
            let myPosts = []
            this.posts.forEach(function (v) {
                if(user.username===v.username){
                    v.user_image = user.profile_img
                    myPosts.push(v)
                }
            })
            return myPosts;
        },


    },
    actions: {
        addTwit( caption) {
            let user = useUserStore().auth_user
            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const created_at = date + ' ' + time;
            this.posts.push({
                id: (this.posts.length + 1),
                username: user.username,
                name: user.name,
                caption,
                image: `https://source.unsplash.com/random/512x512?${caption}`,
                repost_number: 0,
                repost_id: 0,
                likes: 0,
                comment_number: 0,
                created_at
            },)

            return {data: {}, statusCode: 200}
        },
        addLike(twit, index) {

            let liked = false
            let cIndex = 0;
            this.liked.forEach(function (v, ind) {
                cIndex = ind
                if (v.post_id === twit.id && v.username === twit.username) {
                    liked = true
                }
            })
            if (liked) {
                this.posts[index].likes--;
                this.liked.splice(cIndex, 1)
            } else {
                this.posts[index].likes++;
                this.liked.push({post_id: twit.id, username: twit.username})
            }
            return {data: {liked}, statusCode: 200}
        },
        addComment(comment, post) {
            this.posts.forEach(function (v) {
                if (v.id === post.id) {
                    v.comment_number++;
                }
            })
            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const created_at = date + ' ' + time;
            let user = useUserStore().auth_user
            this.comments.push({post_id:post.id, username: user.username,comment,created_at})
            return {data: {}, statusCode: 200}
        },

        getRePost(post_id) {
            let rePost = {}
            this.getPosts.forEach(function (v) {
                if (v.id === post_id) {
                    rePost = v;
                }
            })


            rePost.user_image = useUserStore().findUser(rePost.username).profile_img

            return rePost
        }, // when find post when user repost

        addRepost(caption,repost_id) {
            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const created_at = date + ' ' + time;
            let auth = useUserStore().getAuth

            this.posts.push({
                id: (this.posts.length + 1),
                username: auth.username,
                name: auth.name,
                caption,
                repost_id,
                repost_number: 0,
                likes: 0,
                comment_number: 0,
                created_at
            })
            let repost_number = this.getRePost(repost_id).repost_number??0
            this.getRePost(repost_id).repost_number=repost_number+1;

            return {data: {}, statusCode: 200}
        },

        getComments(post_id) {
            let post = this.getRePost(post_id)
            let cmt = [];
            console.log(this.comments)
            this.comments.forEach(function (v) {
                if(post.id===v.post_id){
                    let user = useUserStore().findUser(v.username)
                    v.user_image = user.profile_img
                    v.name = user.name
                    cmt.push(v)
                }
            })
            return cmt;
        },
    },
    persist: true
})