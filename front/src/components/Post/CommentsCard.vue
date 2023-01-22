<script setup lang="ts">
import { Comment } from '@/types/Comment'
import moment from 'moment'

const props = defineProps<{ comments: Comment[] }>()
</script>

<template>
    <q-card
        v-for="comment, index in props.comments"
        :key="index"
        class="col-12"
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
    </q-card>
</template>