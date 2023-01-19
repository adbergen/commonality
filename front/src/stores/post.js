import { defineStore } from "pinia";
import { $api } from "src/boot/axios";

export const usePostStore = defineStore("post", {
    state: () => ({
        posts: [],
        post: null,
        loading: false,
        error: null
    }),
    persist: true,
    getters: {
        getPostsByCurrentUser: (state) => (userId) => state.posts.filter((post) => post.user.id === userId)
    },
    actions: {
        async getPosts() {
            this.posts = []
            this.loading = true
            try {
                this.posts = await $api.get(`/posts?populate=*`
                ).then((response) => response.data.data)
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async createPost(data) {
            try { await $api.post(`/posts`, { data }) }
            catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async getPost(id) {
            this.post = null
            this.loading = true
            try {
                this.post = await $api.get(`/posts?populate[users]&[filters][user][id][$eq]=${id}`)
                    .then((response) => response.data.data)
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        }
    }
})