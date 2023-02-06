<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useCommentStore } from '@/stores/comment'
import { Comment } from '@/models/Comment'

const props = defineProps<{ postId: number }>()

const authStore = useAuthStore()
const commentStore = useCommentStore()

const userId = computed(() => {
    return authStore.user?.id as number
})

const newComment: Comment = reactive({
    text: '',
    author: { id: userId.value },
    createdAt: '',
    post: { id: props.postId },
})
</script>

<template>
    <q-card
        class="col-12 q-mb-sm"
        flat
        bordered
    >
        <q-input
            class="q-pa-lg"
            bottom-slots
            v-model="newComment.text"
            label="Write a comment"
            dense
            @keyup.enter="commentStore.createComment(newComment as Comment, postId)"
            clearable
        >
            <template v-slot:before>
                <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                </q-avatar>
            </template>

            <template v-slot:append>
                <q-icon
                    v-if="newComment.text !== ''"
                    name="close"
                    @click="newComment.text = ''"
                    class="cursor-pointer"
                />
            </template>

            <template v-slot:after>
                <q-btn
                    round
                    dense
                    flat
                    icon="send"
                    @click="commentStore.createComment(newComment as Comment, postId)"
                />
            </template>
        </q-input>
    </q-card>
</template>