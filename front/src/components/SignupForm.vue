<script setup lang="ts">
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import User from '@/types/User'

const emit = defineEmits(['switchPage']);

const authStore = useAuthStore()

const user = reactive({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
});
</script>

<template>
    <div class="col-6 q-pt-xs q-pb-lg">
        <q-card
            square
            class="shadow-1 q-mx-lg"
        >
            <q-card-section class="white text-center">
                <div>Commonality</div>
            </q-card-section>
            <div class="text-center text-weight-bold text-blue-grey">
                Sign up to start creating friendships.
            </div>
            <q-card-section>
                <q-form class="q-px-lg q-pb-sm q-gutter-sm q-mx-sm">
                    <q-input
                        dense
                        class="q-px-lg"
                        color="grey-12"
                        bg-color="grey-12"
                        outlined
                        square
                        v-model="user.email"
                        label="Email"
                    />
                    <q-input
                        dense
                        class="q-px-lg"
                        color="grey-12"
                        bg-color="grey-12"
                        outlined
                        square
                        v-model="user.firstName"
                        label="First name"
                    />
                    <q-input
                        dense
                        class="q-px-lg"
                        color="grey-12"
                        bg-color="grey-12"
                        outlined
                        square
                        v-model="user.lastName"
                        label="Last name"
                    />
                    <q-input
                        dense
                        class="q-px-lg"
                        color="grey-12"
                        bg-color="grey-12"
                        outlined
                        square
                        v-model="user.username"
                        label="Username"
                    />
                    <q-input
                        dense
                        class="q-px-lg"
                        color="grey-12"
                        bg-color="grey-12"
                        outlined
                        square
                        v-model="user.password"
                        type="password"
                        label="Password"
                    />

                    <q-card-actions class="q-px-lg">
                        <q-btn
                            flat
                            no-caps
                            label="Signup"
                            class="text-white bg-light-blue col-12"
                            @click="authStore.signup(user as User)"
                        />
                    </q-card-actions>
                </q-form>
            </q-card-section>
        </q-card>

        <q-card
            square
            class="q-mt-md q-mx-lg"
        >
            <div class="row justify-center items-center">
                <q-card-section> Have an account? </q-card-section>
                <q-card-actions>
                    <q-btn
                        label="Log in"
                        flat
                        size="12px"
                        color="blue"
                        no-caps
                        @click="emit('switchPage')"
                    />
                </q-card-actions>
            </div>
        </q-card>
    </div>
</template>