<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const user = computed(() => {
  return authStore.user
})

const searchNews = ref('')

const menuLinks = reactive([
  {
    title: 'Home',
    icon: 'o_home',
    route: ''
  },
  {
    title: 'Friends',
    icon: 'o_group',
    route: '/friends'
  },
  {
    title: 'Groups',
    icon: 'o_groups',
    route: '/groups'
  },
])

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
  <q-layout view="hHh Lpr lff">
    <!-- Navbar -->
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Commonality
        </q-toolbar-title>

        <q-btn
          flat
          no-caps
          class="user-name"
        >
          <q-avatar size="26px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div
            class="q-ml-sm ellipsis"
            style="max-width: 100px"
          >
            {{ authStore.fullName }}
          </div>
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item
                clickable
                v-close-popup
                :to="{ name: 'UserProfile', params: { id: user?.id } }"
              >
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
              >
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-separator />
              <q-item
                clickable
                v-close-popup
                @click="authStore.logout()"
                class="text-negative"
              >
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Left drawer -->
    <q-drawer
      show-if-above
      side="left"
      bordered
    >
      <q-list class="q-pt-md">
        <q-item
          v-for="link, index in menuLinks"
          :key="index"
          :to="link.route"
          v-ripple
          clickable
          exact
        >
          <q-item-section avatar>
            <q-icon
              :name="link.icon"
              size="md"
            />
          </q-item-section>
          <q-item-section class="text-h6 text-weight-bold">{{ link.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Right drawer -->
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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


