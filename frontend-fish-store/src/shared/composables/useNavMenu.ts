import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export const useNavMenu = function () {
  const { t } = useI18n();

  const publicMenuList = computed(() => [
    {
      label: t('menu.home'),
      route: '/',
      icon: '',
      separator: false,
      show: true,
    },
    {
      label: t('menu.products'),
      route: '/products',
      icon: '',
      separator: false,
      show: true,
    },
  ]);

  const authMenuList = computed(() => [
    {
      label: t('menu.signin'),
      route: '/signin',
      icon: '',
      separator: false,
      show: true,
    },
    {
      label: t('menu.register'),
      route: '/register',
      icon: '',
      separator: false,
      show: true,
    },
    {
      label: t('menu.profile'),
      route: '/profile',
      icon: '',
      show: true,
    },
  ]);

  const menuList = computed(() => [
    ...publicMenuList.value,
    ...authMenuList.value,
  ]);

  return {
    publicMenuList,
    authMenuList,
    menuList,
  };
};
