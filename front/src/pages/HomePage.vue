<script setup lang="ts">
import { ref } from 'vue';
import SignupForm from '@/components/Authentication/SignupForm.vue'
import LoginForm from '@/components/Authentication/LoginForm.vue'

const isSignupForm = ref(false)
</script>

<template>
  <q-page class="flex flex-center">
    <SignupForm
      v-if="isSignupForm"
      @switch-page="isSignupForm = !isSignupForm"
    />
    <LoginForm
      v-else
      @switch-page="isSignupForm = !isSignupForm"
    />
  </q-page>
</template>


