<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { axios } from '@/boot/axios'
import handleApiError from '@/utils/handle-api-error';
import ApiError from '@/types/ApiError';
import { NewsArticle } from '@/types/NewsArticle'

const searchNewsQuery = ref('')

const baseNewsApiUrl = ref('https://newsapi.org/v2')

const news: Ref<NewsArticle[]> = ref([])

const getTopNews = () => {
    let params = {
        country: 'us',
        apiKey: process.env.NEWS_API_KEY,
    }
    try {
        axios.get(`${baseNewsApiUrl.value}/top-headlines`, { params })
            .then((response) => {
                news.value = response.data.articles;
                console.log(news.value);
            })
    } catch (error) {
        handleApiError(error as ApiError);
    }
}
getTopNews()
</script>

<template>
    <!-- Right News drawer -->
    <q-drawer
        show-if-above
        side="right"
        bordered
    >
        <q-input
            v-model="searchNewsQuery"
            placeholder="Search News"
            class="q-ma-lg"
            outlined
            rounded
            dense
        >
            <template v-slot:prepend>
                <q-icon name="search" />
            </template>
        </q-input>

        <q-list
            separator
            padding
        >
            <q-item
                class="q-pa-md"
                v-for="article, index in news"
                :key="index"
            >
                <q-item-section>
                    <q-item-label
                        overline
                        class="text-grey"
                    >{{ article.source.name }}</q-item-label>
                    <q-item-label class="text-weight-bold">{{ article.title }}</q-item-label>
                    <q-item-label caption>{{ article.description }}</q-item-label>
                </q-item-section>

                <q-item-section
                    side
                    top
                >
                    <q-item-label caption>{{ article.publishedAt }}</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-drawer>
</template>