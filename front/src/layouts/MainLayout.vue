<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import NewsDrawer from '@/components/Layout/NewsDrawer.vue'
import MenuDrawer from '@/components/Layout/MenuDrawer.vue'

const authStore = useAuthStore()

const user = computed(() => {
  return authStore.user
})
</script>

<template>
  <q-layout view="hHh LpR lff">
    <!-- Navbar -->
    <q-header
      elevated
      class="bg-primary"
    >
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

    <!-- Left menu drawer -->
    <MenuDrawer />

    <!-- Right news drawer -->
    <NewsDrawer />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


