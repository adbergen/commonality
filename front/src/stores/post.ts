import { defineStore } from 'pinia';
import { $api } from '@/boot/axios';
import handleApiError from '@/utils/handle-api-error';
import ApiError from '@/types/ApiError';
import { Post, Posts } from '@/types/Post';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Posts,
    post: {} as Post,
    loading: false,
  }),
  persist: true,
  getters: {
    getPostsByCurrentUser: (state) => (userId: number) =>
      state.posts.filter((post: Post) => post.user?.id === userId),
  },
  actions: {
    async getPosts() {
      this.posts = [];
      this.loading = true;
      try {
        this.posts = await $api
          .get('/posts?populate=deep&sort=createdAt%3Adesc')
          .then((response) => response.data.data);
      } catch (error) {
        handleApiError(error as ApiError);
      } finally {
        this.loading = false;
      }
    },
    async createPost(data: Post) {
      try {
        await $api
          .post('/posts?populate=deep', { data })
          .then((response) => this.posts.unshift(response.data.data as Post));
      } catch (error) {
        handleApiError(error as ApiError);
      } finally {
        this.loading = false;
      }
    },
    // async getPost(id: number) {
    //   this.post = {};
    //   this.loading = true;
    //   try {
    //     this.post = await $api
    //       .get(`/posts?populate[users]&[filters][user][id][$eq]=${id}`)
    //       .then((response) => response.data.data);
    //   } catch (error) {
    //     handleApiError(error as ApiError);
    //   } finally {
    //     this.loading = false;
    //   }
    // },
  },
});
