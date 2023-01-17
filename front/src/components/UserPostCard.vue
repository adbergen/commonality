<script setup>
import { ref } from 'vue'
import { $api } from 'src/boot/axios'
import { useAuthStore } from "@/stores/auth"
import dateConverter from "@/utils/date-converter.js";

const authStore = useAuthStore()

const userPosts = ref([])

const getData = async () => {
    try {
        const response = await $api.get(`/api/posts?populate[users]&[filters][user][id][$eq]=${authStore.user.id}`
        );
        // JSON responses are automatically parsed.
        userPosts.value = response.data.data;
        console.log(userPosts);
    } catch (error) {
        console.log(error);
    }
}
getData()
</script>

<template>
    <q-card
        v-for="post, index in userPosts"
        :key="index"
        class="my-card"
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
</template>