<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/post'
import { useCommentStore } from '@/stores/comment'
import { Post, Posts } from '@/types/Post'
import { Comment, Comments } from '@/types/Comment'
import dateConverter from '@/utils/date-converter';

const authStore = useAuthStore()
const postStore = usePostStore()
const commentStore = useCommentStore()

const isCommentSectionOpen = ref(false)



// Get all posts
postStore.getPosts()

const userId = computed(() => {
    return authStore.user?.id as number
})

// Filter posts by current user
const currentUserPosts = computed(() => {
    return postStore.getPostsByCurrentUser(userId.value as number)
})

const postComments = computed(() => {
    return commentStore.comments
})

const post: Post = reactive({
    text: '',
    author: { id: userId.value },
    createdAt: ''
})

const comment: Comment = reactive({
    text: '',
    author: { id: userId.value },
    createdAt: ''
})
</script>

<template>
    <div class="row">
        <!-- Create post card -->
        <q-card
            class="col-12 q-mb-xl"
            flat
            bordered
        >
            <q-input
                class="q-pa-lg"
                bottom-slots
                v-model="post.text"
                label="What's on your mind?"
            >
                <template v-slot:before>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                    </q-avatar>
                </template>

                <template v-slot:append>
                    <q-icon
                        v-if="post.text !== ''"
                        name="close"
                        @click="post.text = ''"
                        class="cursor-pointer"
                    />
                </template>

                <template v-slot:after>
                    <q-btn
                        round
                        dense
                        flat
                        icon="send"
                        @click="postStore.createPost(post as Post)"
                    />
                </template>
            </q-input>
        </q-card>

        <!-- Post list -->
        <q-card
            v-for="post, index in (currentUserPosts as Posts)"
            :key="index"
            class="col-12"
            flat
            bordered
        >
            <q-item>
                <q-item-section avatar>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                </q-item-section>

                <q-item-section>
                    <q-item-label>{{ authStore.fullName }}</q-item-label>
                    <q-item-label caption>
                        {{ dateConverter(post.createdAt, 'l') }}
                    </q-item-label>
                </q-item-section>
                <q-item-section avatar>
                    <q-btn
                        color="primary"
                        icon="more_vert"
                        flat
                        dense
                    >
                        <q-menu>
                            <q-list
                                bordered
                                padding
                                dense
                            >
                                <!-- Edit Post -->
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
                                        <q-item-label>Edit Post</q-item-label>
                                        <q-item-label caption>I change my mind.</q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-separator
                                    spaced
                                    inset="item"
                                />
                                <!-- Share Post -->
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
                                        <q-item-label>Report Post</q-item-label>
                                        <q-item-label caption>There's something not right here.</q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-separator
                                    spaced
                                    inset="item"
                                />

                                <!-- Delete Post -->
                                <q-item
                                    clickable
                                    @click="postStore.deletePost(post.id as number)"
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
                                        <q-item-label>Delete Post</q-item-label>
                                        <q-item-label caption>I want this post removed forever.</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>
                </q-item-section>
            </q-item>

            <q-separator />

            <!-- User's post text -->
            <q-card-section horizontal>
                <q-card-section class="text-body1">
                    {{ post.text }}
                </q-card-section>

                <q-separator />

            </q-card-section>

            <q-separator />

            <!-- Post actions -->
            <q-card-actions class="justify-between q-px-xl">
                <q-btn
                    flat
                    dense
                    icon="o_thumb_up"
                    label="Like"
                />
                <q-btn
                    flat
                    dense
                    icon="o_comment"
                    label="Comment"
                    @click="isCommentSectionOpen = true"
                />
                <q-btn
                    flat
                    dense
                    icon="o_share"
                    label="Share"
                />
            </q-card-actions>
        </q-card>

        <!-- Comment Section -->
        <q-card
            v-for="postComment, index in (postComments as Comments)"
            :key="index"
            class="col-12"
            flat
            bordered
        >
            <!-- Users' comment text -->
            <q-card-section horizontal>
                <q-card-section class="text-body1">
                    {{ postComment.text }}
                </q-card-section>
            </q-card-section>


        </q-card>
        <q-separator />
        <q-card
            v-if="isCommentSectionOpen"
            class="col-12"
            flat
            bordered
        >
            <q-input
                class="q-pa-lg"
                bottom-slots
                v-model="comment.text"
                label="Write a comment"
            >
                <template v-slot:before>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                    </q-avatar>
                </template>

                <template v-slot:append>
                    <q-icon
                        v-if="comment.text !== ''"
                        name="close"
                        @click="comment.text = ''"
                        class="cursor-pointer"
                    />
                </template>

                <template v-slot:after>
                    <q-btn
                        round
                        dense
                        flat
                        icon="send"
                        @click="commentStore.createComment(comment as Comment)"
                    />
                </template>
            </q-input>
        </q-card>
    </div>
</template>