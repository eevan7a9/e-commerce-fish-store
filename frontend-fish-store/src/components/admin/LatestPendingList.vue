<script lang="ts" setup>
import { useOrdersStore } from 'src/stores/orders';
import { computed } from 'vue';

defineOptions({
  name: 'LatestPendingList',
});

const ordersStore = useOrdersStore();
const loading = computed(() => ordersStore.loading);
</script>

<template>
  <q-card class="tw-bg-shade tw-text-white" flat bordered>
    <q-toolbar
      class="tw-w-full tw-text-[20px] tw-text-white tw-flex tw-justify-between tw-items-center tw-bg-primary"
    >
      <q-toolbar-title> Latest Pending Orders </q-toolbar-title
      ><q-icon name="mdi-shopping" size="32px" />
    </q-toolbar>

    <q-card-section class="tw-min-h-[480px] tw-h-full" v-if="loading">
      <q-inner-loading
        :showing="loading"
        label="Please wait..."
        color="accent"
        label-class="tw-text-accent"
        label-style="font-size: 1.1em"
        class="tw-pt-5"
      />
    </q-card-section>

    <q-card-section class="tw-p-0 tw-overflow-auto" v-else>
      <q-scroll-area class="tw-h-[480px] tw-w-full" fit>
        <q-list bordered separator padding class="tw-w-full">
          <template v-for="(item, i) of new Array(10).fill(1)" :key="item + i">
            <q-item>
              <q-item-section avatar>
                <q-btn
                  icon="info"
                  :size="$q.screen.gt.sm ? '18px' : '16px'"
                  padding="8px"
                  color="blue-8"
                  round
                  text-color="white"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1"> Customer@email.com </q-item-label>
                <q-item-label class="tw-text-slate-400" caption>
                  February {{ item + i }}nd, 2019
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="tw-flex tw-gap-1 sm:tw-gap-x-3">
                  <q-btn
                    unelevated
                    :round="$q.screen.lt.md"
                    :size="$q.screen.gt.sm ? 'md' : 'sm'"
                    color="positive"
                  >
                    <q-icon name="mdi-thumb-up" />
                    <span class="tw-ml-2" v-if="$q.screen.gt.lg">Approve</span>
                  </q-btn>

                  <q-btn
                    unelevated
                    :round="$q.screen.lt.md"
                    :size="$q.screen.gt.sm ? 'md' : 'sm'"
                    color="negative"
                  >
                    <q-icon name="mdi-cancel" />
                    <span class="tw-ml-2" v-if="$q.screen.gt.lg">Cancel</span>
                  </q-btn>
                </div>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>
