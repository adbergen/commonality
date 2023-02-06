<script setup lang="ts">
import { Comment } from '@/models/Comment'
import { useCommentStore } from '@/stores/comment'
import moment from 'moment'
import CommentCreationCard from './CommentCreationCard.vue';

const props = defineProps<{ comments: Comment[], postId: number }>()

const commentStore = useCommentStore()
</script>

<template>
    <q-card
        v-for="comment, index in props.comments"
        :key="index"
        class="col-12 comment-card-container"
        flat
        bordered
    >
        <q-item
            clickable
            v-ripple
        >
            <q-item-section avatar>
                <q-avatar size="md">
                    <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                </q-avatar>
            </q-item-section>

            <q-item-section>
                <q-item-label lines="1">{{ comment.author.firstName + ' ' + comment.author.lastName }}</q-item-label>
                <q-item-label>
                    {{ comment.text }}
                </q-item-label>
            </q-item-section>

            <q-item-section
                side
                top
            >
                {{ moment(comment.createdAt).fromNow() }}
            </q-item-section>

        </q-item>
        <!-- Post actions -->
        <q-card-actions class="">
            <q-btn
                flat
                dense
                icon="o_thumb_up"
                label="Like"
                size="sm"
            />
            <q-btn
                flat
                dense
                icon="o_comment"
                label="Reply"
                size="sm"
            />
            <q-space />
            <q-btn
                class="comment-options-button"
                flat
                dense
                icon="o_more_horiz"
                size="md"
            ><q-menu>
                    <q-list
                        bordered
                        padding
                        dense
                    >
                        <!-- Delete Post -->
                        <q-item
                            clickable
                            @click="commentStore.deleteComment(comment.id as number, postId)"
                        >
                            <q-item-section
                                top
                                avatar
                            >
                                <q-icon
                                    color="negative"
                                    name="o_delete"
                                    size="md"
                                />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Delete Comment</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-separator
                            spaced
                            inset="item"
                        />

                        <!-- Edit Comment -->
                        <q-item clickable>
                            <q-item-section
                                top
                                avatar
                            >
                                <q-icon
                                    color="primary"
                                    name="o_edit"
                                    size="md"
                                />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Edit Comment</q-item-label>
                                <q-item-label caption>Let's switch things up.</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-separator
                            spaced
                            inset="item"
                        />

                        <!-- Report Comment -->
                        <q-item clickable>
                            <q-item-section
                                top
                                avatar
                            >
                                <q-icon
                                    color="warning"
                                    name="o_flag"
                                    size="md"
                                />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Report comment</q-item-label>
                                <q-item-label caption>There's something not right here.</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-menu></q-btn>
        </q-card-actions>

    </q-card>
    <CommentCreationCard :postId="postId" />
</template>

<style lang="scss" scoped>
.comment-options-button {
    visibility: hidden;
}

.comment-card-container:hover .comment-options-button {
    visibility: visible;
}
</style>