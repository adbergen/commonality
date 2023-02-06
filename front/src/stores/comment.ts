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
  getters: {},
  actions: {
    async createComment(data: Comment, postId: number) {
      this.loading = true;

      try {
        const { data: createdComment } = await $api.post(
          '/comments?populate=deep',
          { data }
        );
        const postStore = usePostStore();
        const postIndex = postStore.posts.findIndex(
          (post) => post.id === postId
        );
        if (postIndex === -1) return;
        postStore.posts[postIndex].comments?.push(createdComment.data);
      } catch (error) {
        handleApiError(error as ApiError);
      } finally {
        this.loading = false;
      }
    },
    async deleteComment(commentId: number, postId: number) {
      this.loading = true;

      try {
        await $api.delete(`/comments/${commentId}?populate=deep`);
        const postStore = usePostStore();
        const postIndex = postStore.posts.findIndex(
          (post) => post.id === postId
        );
        if (postIndex === -1) return;
        const commentIndex = postStore.posts[postIndex].comments?.findIndex(
          (comment) => comment.id === commentId
        );
        if (commentIndex === -1) return;
        postStore.posts[postIndex].comments?.splice(commentIndex as number, 1);
      } catch (error) {
        handleApiError(error as ApiError);
      } finally {
        this.loading = false;
      }
    },
  },
});
