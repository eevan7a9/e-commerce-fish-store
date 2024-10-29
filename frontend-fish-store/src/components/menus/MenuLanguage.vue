<script setup lang="ts">
import { useLang } from 'src/shared/composables/useLang';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

defineOptions({
  name: 'MenuLanguage',
});

const { locale, availableLocales } = useI18n();
const lang = useLang();

const currentLang = computed(() => {
  switch (locale.value) {
    case 'en-US':
      return 'english';

    case 'es-ES':
      return 'español';

    default:
      return 'English';
  }
});

function selectLang(t: string) {
  lang.setLanguage(t);
}
</script>

<template>
  <q-btn padding="4px 8px" color="primary" unelevated>
    <q-menu>
      <q-list style="min-width: 100px">
        <q-item
          v-for="lang of availableLocales"
          :key="lang"
          clickable
          v-close-popup
          @click="selectLang(lang)"
        >
          <q-item-section>{{ lang }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>

    <span class="tw-capitalize">{{ currentLang }}</span>
  </q-btn>
</template>
