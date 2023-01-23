<script setup lang="ts">
import { reactive } from 'vue'

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
</script>

<template>
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
</template>