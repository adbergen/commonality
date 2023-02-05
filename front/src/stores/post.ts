import { defineStore } from 'pinia';
import { $api } from '@/boot/axios';
import { Post } from '@/models/Post';
import handleApiError from '@/utils/handle-api-error';
import ApiError from '@/models/ApiError';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Post[],
    post: {} as Post,
    loading: false,
  }),
  persist: true,
  getters: {
    getPostsByCurrentUser: (state) => (userId: number) => {
      return state.posts.filter((post) => post.author?.id === userId);
    },
  },
  actions: {
    async getPosts() {
      this.posts = [];
      this.loading = true;

      try {
        const response = await $api.get(
          '/posts?populate=deep&sort=createdAt%3Adesc'
        );
        this.posts = response.data.data;
      } catch (error) {
        handleApiError(error as ApiError);
      } finally {
        this.loading = false;
      }
    },
    async createPost(data: Post) {
      try {
        const response = await $api.post('/posts?populate=deep', { data });
        this.posts.unshift(response.data.data as Post);
      } catch (error) {
        handleApiError(error as ApiError);
      } finally {
        this.loading = false;
      }
    },
    async deletePost(id: number) {
      try {
        const response = await $api.delete(`/posts/${id}?populate=deep`);
        this.posts = this.posts.filter(
          (post) => post.id !== response.data.data.id
        );
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
