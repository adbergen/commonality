import { defineStore } from 'pinia';
import { $api } from '@/boot/axios';
import { Comment } from '@/types/Comment';
import { usePostStore } from '@/stores/post';
import handleApiError from '@/utils/handle-api-error';
import ApiError from '@/types/ApiError';

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
      this.comments = [];
      this.loading = true;
      try {
        this.comments = await $api
          .get('/comments?populate=deep&sort=createdAt%3Adesc')
          .then((response) => response.data.data);
      } catch (error) {
        handleApiError(error as ApiError);
      } finally {
        this.loading = false;
      }
    },
    async createComment(data: Comment) {
      try {
        await $api
          .post('/comments?populate=deep', { data })
          .then((response) =>
            this.comments.unshift(response.data.data as Comment)
          );
      } catch (error) {
        handleApiError(error as ApiError);
      } finally {
        this.loading = false;
      }
    },
    async deleteComment(id: number) {
      try {
        await $api.delete(`/comments/${id}?populate=deep`).then(
          (response) =>
            (this.comments = this.comments.filter(function (comment: Comment) {
              return comment.id != response.data.data.id;
            }))
        );
      } catch (error) {
        handleApiError(error as ApiError);
      } finally {
        this.loading = false;
      }
    },
  },
});
