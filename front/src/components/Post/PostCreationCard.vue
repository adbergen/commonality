<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/post'
import { Post } from '@/types/Post'

const authStore = useAuthStore()
const postStore = usePostStore()

const userId = computed(() => {
    return authStore.user?.id as number
})

const newPost: Post = reactive({
    text: '',
    author: { id: userId.value },
    createdAt: ''
})
</script>

<template>
    <q-card
        class="col-12 q-mb-xl"
        flat
        bordered
    >
        <q-input
            class="q-pa-lg"
            bottom-slots
            v-model="newPost.text"
            label="What's on your mind?"
        >
            <template v-slot:before>
                <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                </q-avatar>
            </template>

            <template v-slot:append>
                <q-icon
                    v-if="newPost.text !== ''"
                    name="close"
                    @click="newPost.text = ''"
                    class="cursor-pointer"
                />
            </template>

            <template v-slot:after>
                <q-btn
                    round
                    dense
                    flat
                    icon="send"
                    @click="postStore.createPost(newPost as Post)"
                />
            </template>
        </q-input>
    </q-card>
</template>