import { defineStore } from 'pinia';
import { $api } from '@/boot/axios';
import { Comment } from '@/models/Comment';
import handleApiError from '@/utils/handle-api-error';
import ApiError from '@/models/ApiError';

export const useCommentStore = defineStore('comment', {
  state: () => ({
    comments: [] as Comment[],
    comment: {} as Comment,
    loading: false,
  }),
  persist: true,
  getters: {},
  actions: {
    async createComment(data: Comment) {
      this.loading = true;

      try {
        const { data: createdComment } = await $api.post(
          '/comments?populate=deep',
          { data }
        );
        console.log(createdComment);
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
