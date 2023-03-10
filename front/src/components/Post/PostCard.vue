<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/post'
import { Post } from '@/models/Post'
import { Comment } from '@/models/Comment'
import CommentsCard from '@/components/Post/CommentsCard.vue'
import dateConverter from '@/utils/date-converter';

const props = defineProps<{ postsByCurrentUser: Post[] }>()

const commentsOpen = ref<boolean[]>([]);

const authStore = useAuthStore()
const postStore = usePostStore()
</script>

<template>
    <!-- Post list -->
    <q-card
        v-for="post, index in props.postsByCurrentUser"
        :key="index"
        class="col-12 q-my-sm"
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
                    icon="o_more_vert"
                    flat
                    dense
                >
                    <q-menu v-close-popup>
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

                            <!-- Report Post -->
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
                @click="commentsOpen[index] = !commentsOpen[index]"
            />
            <q-btn
                flat
                dense
                icon="o_share"
                label="Share"
            />
        </q-card-actions>

        <!-- Comments -->
        <CommentsCard
            v-if="commentsOpen[index]"
            :comments="(post.comments as Comment[])"
            :postId="(post.id as number)"
        />
    </q-card>
</template>