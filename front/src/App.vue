<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

authStore.checkAuth()
</script>

<template>
  <router-view />
</template>


