<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/post'
import { Post } from '@/types/Post'
import { Comment } from '@/types/Comment'
import CommentsCard from '@/components/Post/CommentsCard.vue'
import dateConverter from '@/utils/date-converter';


const props = defineProps<{ postsByCurrentUser: Post[] }>()

const authStore = useAuthStore()
const postStore = usePostStore()
</script>

<template>
    <!-- Post list -->
    <q-card
        v-for="post, index in props.postsByCurrentUser"
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
                                    <q-item-label caption>Let's switch things up.</q-item-label>
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
            />
            <q-btn
                flat
                dense
                icon="o_share"
                label="Share"
            />
        </q-card-actions>
        <CommentsCard :comments="(post.comments as Comment[])" />
    </q-card>
</template>