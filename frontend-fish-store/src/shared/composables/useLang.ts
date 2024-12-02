import { SessionStorage } from 'quasar';
import { useI18n } from 'vue-i18n';

export const useLang = function () {
  const $i18n = useI18n();

  function loadLanguage(): void {
    $i18n.locale.value = SessionStorage.getItem('lang') || 'en-US';
  }

  function setLanguage(lang: string) {
    $i18n.locale.value = lang;
    SessionStorage.setItem('lang', lang);
  }

  function resetLanguage(): void {
    setLanguage('en-US');
  }

  return {
    loadLanguage,
    setLanguage,
    resetLanguage,
  };
};
