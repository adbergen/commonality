<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/post'
import dateConverter from '@/utils/date-converter';
import { Post, Posts } from '@/types/Post'

const authStore = useAuthStore()
const postStore = usePostStore()

const userId = computed(() => {
    return authStore.user?.id as number
})

// Get all posts
postStore.getPosts()
// Filter posts by current user
const userPosts = computed(() => {
    return postStore.getPostsByCurrentUser(userId.value as number)
})

const post: Post = reactive({
    text: '',
    user: { id: userId.value },
    createdAt: ''

})
</script>

<template>
    <div class="row">
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

        <q-card
            v-for="post, index in (userPosts as Posts)"
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
            </q-item>

            <q-separator />

            <q-card-section horizontal>
                <q-card-section>
                    {{ post.text }}
                </q-card-section>

                <q-separator />

            </q-card-section>
        </q-card>
    </div>
</template>