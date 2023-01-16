<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
    <q-layout>

        <q-page-container>
            <router-view />
        </q-page-container>

        <q-footer
            class="q-px-xl q-py-lg"
            position="bottom"
        >
            <div class="row justify-between">
                <div class="col-3">
                    <div>Commonality</div>
                </div>
                <div class="col-2 column">
                    <div class="row q-gutter-x-lg">
                        <div class="col">
                            <a
                                class="text-grey-3"
                                href="https://www.linkedin.com/groups/2652913/"
                            >
                                <i class="fab fa-linkedin fa-2x" />
                            </a>
                        </div>
                        <div class="col">
                            <a
                                class="text-grey-3"
                                href="https://www.youtube.com/channel/UC5SrN3Zi8BsTtipTncf2wig"
                            >
                                <i class="fab fa-youtube fa-2x" />
                            </a>
                        </div>
                        <div class="col">
                            <a
                                class="text-grey-3"
                                href="https://twitter.com/PHLR_Temple"
                            >
                                <i class="fab fa-twitter fa-2x" />
                            </a>
                        </div>
                        <div class="col">
                            <a
                                class="text-grey-3"
                                href="https://www.facebook.com/PublicHealthLawResearch"
                            >
                                <i class="fab fa-facebook fa-2x" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="column col-3">
                    <div class="row col">
                        <div class="column items-start q-ml-md q-gutter-md">
                            <a
                                class="text-grey-3"
                                href=""
                            >Training</a>
                            <a
                                class="text-grey-3"
                                href=""
                            >Contact</a>
                            <a
                                class="text-grey-3"
                                href=""
                            >Terms of Service</a>
                        </div>
                        <div class="column items-start q-ml-md q-gutter-md">
                            <a
                                class="text-grey-3"
                                href=""
                            >Acceptable Use Policy</a>
                            <a
                                class="text-grey-3"
                                href=""
                            >Privacy Policy</a>
                            <a
                                class="text-grey-3"
                                href=""
                            >Minimum System Requirement</a>
                        </div>
                    </div>
                </div>
            </div>
        </q-footer>
    </q-layout>
</template>
