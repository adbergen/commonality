<script setup lang="ts">
import { reactive, ref } from 'vue'

const searchNews = ref('')

const newsItems = reactive([
    {
        type: 'Education',
        title: 'Teachers Need an Increase in Pay',
        text: 'Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.',
        created: '5 min ago'
    },
    {
        type: 'Health',
        title: 'The Best Way to Lose Weight',
        text: 'Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.',
        created: '1 hour ago'
    },
    {
        type: 'Science',
        title: 'Breaking Discovery',
        text: 'Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.',
        created: '3 hours ago'
    },
])
</script>

<template>
    <!-- Right News drawer -->
    <q-drawer
        show-if-above
        side="right"
        bordered
    >
        <q-input
            v-model="searchNews"
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
                v-for="news, index in newsItems"
                :key="index"
            >
                <q-item-section>
                    <q-item-label
                        overline
                        class="text-grey"
                    >{{ news.type }}</q-item-label>
                    <q-item-label class="text-weight-bold">{{ news.title }}</q-item-label>
                    <q-item-label caption>{{ news.text }}</q-item-label>
                </q-item-section>

                <q-item-section
                    side
                    top
                >
                    <q-item-label caption>{{ news.created }}</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-drawer>
</template>