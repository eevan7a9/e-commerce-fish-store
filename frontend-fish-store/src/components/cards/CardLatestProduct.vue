<script setup lang="ts">
import { useProductsStore } from 'src/stores/products';
import { computed } from 'vue';

const productsStore = useProductsStore();

const product = computed(() => productsStore.list[0]);
</script>

<template>
    <div class="tw-relative tw-w-full tw-group tw-flex tw-justify-center tw-mt-8 md:tw-mt-0">
        <article
            class="tw-z-0 tw-absolute tw-w-full -tw-rotate-6 tw-opacity-30 tw-max-w-[350px] md:tw-max-w-[500px] group-hover:tw-rotate-0 tw-transition-all tw-duration-500 tw-ease-linear tw-min-h-[250px] md:tw-min-h-[300px] tw-rounded-lg tw-shadow-lg tw-bg-white">
        </article>

        <article
            class="tw-relative tw-w-full tw-flex tw-flex-col tw-max-w-[350px] sm:tw-max-w-[500px] tw-min-h-[280px] md:tw-min-h-[300px] md:tw-rotate-12 group-hover:tw-rotate-0 tw-transition-all tw-duration-500 tw-ease-linear tw-shadow-lg tw-bg-white tw-rounded-lg">
            <h1
                class="md:tw-text-[20px] tw-font-black tw-px-4 tw-py-3 xl:tw-py-4 tw-uppercase tw-text-accent tw-border-b">
                Latest Product
            </h1>

            <div class="tw-flex tw-flex-grow">
                <div class="tw-w-[250px] tw-flex-grow">
                    <q-img :src="product?.images?.[0] || ''" class="tw-h-full" />
                </div>

                <div class="tw-max-w-[220px] sm:tw-max-w-[320px] tw-flex tw-flex-col tw-flex-grow tw-px-2 ">
                    <h1 class="sm:tw-text-[16px] tw-py-3 ellipsis sm:tw-max-w-[280px]">
                        {{ product.name }}
                    </h1>

                    <div>
                        <q-chip v-for="tag of product.tags.slice(0, $q.screen.lt.sm ? 1 : 2)" :key="tag"
                            text-color="white" color="primary">
                            <span class="tw-capitalize">
                                {{ tag }}
                            </span>
                        </q-chip>
                    </div>

                    <p
                        class="tw-leading-normal tw-text-[12px] md:tw-text-[14px] tw-text-ellipsis tw-line-clamp-4 tw-px-2 tw-mt-2">
                        {{
                            product.description }}
                    </p>

                    <q-btn :to="'/products/' + product.id" color="primary" label="View Product"
                        class="tw-mt-auto tw-mb-3" />
                </div>
            </div>
        </article>
    </div>
</template>