<script lang="ts" setup>
import { Category } from 'src/shared/interface/category';
const props = defineProps<{ category: Category }>()
</script>

<template>
    <article class="tw-group tw-border-t-[2px] tw-pt-5 tw-cursor-pointer tw-bg-white tw-px-4 tw-pb-8">
        <div
            class="tw-h-[250px] group tw-w-[250px] tw-mx-auto flex tw-justify-center tw-items-center tw-rounded-full tw-bg-purple-100">
            <q-img :src="props.category.imgSrc"
                class="tw-transition-all tw-duration-500 tw-ease-in-out group-hover:tw-scale-150 tw-max-w-[190px]"
                fit="contain" />
        </div>

        <h1 class="tw-text-[18px] lg:tw-text-[20px] tw-font-anton tw-mt-3 tw-uppercase">
            {{ props.category.name }}
        </h1>

        <p class="sm:tw-text-[16px] ellipsis-2-lines tw-mt-4 tw-max-h-[38px]">
            {{ props.category.description }}
        </p>
    </article>
</template>