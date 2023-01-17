<script setup>
import { reactive } from "vue";
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits(["switchPage"]);

const authStore = useAuthStore()

const user = reactive({
    email: "",
    password: "",
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
                Login to continue creating friendships.
            </div>
            <q-card-section>
                <q-form class="q-px-sm q-pt-sm q-pb-xs q-gutter-sm">
                    <q-input
                        dense
                        class="q-px-lg"
                        color="grey-12"
                        bg-color="grey-12"
                        outlined
                        square
                        v-model="user.email"
                        label="Phone number, username or email"
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
                            label="Login"
                            class="text-white bg-light-blue col-12"
                            @click="authStore.login({ identifier: user.email, password: user.password })"
                        />
                    </q-card-actions>
                    <q-card-actions class="q-px-lg q-mx-xl">
                        <q-btn
                            flat
                            no-caps
                            label="Forgot password?"
                            class="text-blue col-12"
                            size="11px"
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
                <q-card-section> Don't have an account? </q-card-section>
                <q-card-actions>
                    <q-btn
                        label="Sign Up"
                        flat
                        size="12px"
                        color="blue"
                        no-caps
                        @click="$emit('switchPage')"
                    />
                </q-card-actions>
            </div>
        </q-card>
    </div>
</template>