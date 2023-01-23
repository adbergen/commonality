<script setup lang="ts">
import UserPostCard from '@/components/Post/PostsContainer.vue'

</script>

<template>
    <q-page class="relative-position">
        <q-scroll-area class="absolute full-width full-height">
            <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
                <UserPostCard />
            </div>
        </q-scroll-area>
    </q-page>
</template>


