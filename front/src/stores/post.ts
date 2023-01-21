import { defineStore } from 'pinia';
import { $api } from '@/boot/axios';
import { Post } from '@/types/Post';
// import { Comment } from '@/types/Comment';
import handleApiError from '@/utils/handle-api-error';
import ApiError from '@/types/ApiError';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Post[],
    post: {} as Post,
    loading: false,
  }),
  persist: true,
  getters: {
    getPostsByCurrentUser: (state) => (userId: number) =>
      state.posts.filter((post: Post) => post.author?.id === userId),
    getCommentsByPost: (state) => (postId: number) =>
      state.posts.filter((post) =>
        post.comments?.filter((comment) => comment.post?.id === postId)
      ),
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
    async deletePost(id: number) {
      try {
        await $api.delete(`/posts/${id}?populate=deep`).then(
          (response) =>
            (this.posts = this.posts.filter(function (post: Post) {
              return post.id != response.data.data.id;
            }))
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
