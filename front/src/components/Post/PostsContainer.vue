<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/post'
import PostCreationCard from './PostCreationCard.vue'
import PostCard from './PostCard.vue'

const authStore = useAuthStore()
const postStore = usePostStore()

// Get all posts
postStore.getPosts()

const userId = computed(() => {
    return authStore.user?.id as number
})

// Filter posts by current user
const postsByCurrentUser = computed(() => {
    return postStore.getPostsByCurrentUser(userId.value as number)
})
</script>

<template>
    <div class="col">
        <PostCreationCard />
        <PostCard :postsByCurrentUser="postsByCurrentUser" />
    </div>
</template>