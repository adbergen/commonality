import { defineStore } from 'pinia';
import { $api } from '@/boot/axios';
import { Comment } from '@/models/Comment';
import ApiError from '@/models/ApiError';
import { usePostStore } from '@/stores/post';
import handleApiError from '@/utils/handle-api-error';

export const useCommentStore = defineStore('comment', {
  state: () => ({
    comments: [] as Comment[],
    comment: {} as Comment,
    loading: false,
  }),
  persist: true,
  getters: {
    getCommentsByPost: () => (postId: number) => {
      const postStore = usePostStore();
      return postStore.posts.filter((post) =>
        post.comments?.filter((comment) => comment.post?.id === postId)
      );
    },
  },
  actions: {
    async getComments() {
      this.loading = true;

      try {
        const { data: comments } = await $api.get(
          '/comments?populate=deep&sort=createdAt%3Adesc'
        );
        this.comments = comments;
      } catch (error) {
        handleApiError(error as ApiError);
      } finally {
        this.loading = false;
      }
    },
    async createComment(data: Comment, postId: number) {
      this.loading = true;

      try {
        const { data: createdComment } = await $api.post(
          '/comments?populate=deep',
          { data }
        );
        const postStore = usePostStore();
        postStore.$patch((state) => {
          const postIndex = state.posts.findIndex((post) => post.id === postId);
          if (postIndex === -1) return;
          state.posts[postIndex].comments?.push(createdComment.data);
        });
      } catch (error) {
        handleApiError(error as ApiError);
      } finally {
        this.loading = false;
      }
    },
    async deleteComment(id: number) {
      this.loading = true;

      try {
        const response = await $api.delete(`/comments/${id}?populate=deep`);
        this.comments = this.comments.filter(
          (comment) => comment.id !== response.data.data.id
        );
      } catch (error) {
        handleApiError(error as ApiError);
      } finally {
        this.loading = false;
      }
    },
  },
});
