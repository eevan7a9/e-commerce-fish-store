import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { MenuItem } from '../interface/menu';

export const useNavMenu = function () {
  const { t } = useI18n();

  const publicMenuList = computed<MenuItem[]>(() => [
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

  const authMenuList = computed<MenuItem[]>(() => [
    {
      label: t('menu.signin'),
      route: '/auth',
      icon: '',
      separator: false,
      show: true,
    },
    {
      label: t('menu.register'),
      route: '/auth/register',
      icon: '',
      separator: false,
      show: true,
    },
    {
      label: t('menu.profile'),
      route: '/account',
      icon: '',
      show: true,
    },
  ]);

  const menuList = computed<MenuItem[]>(() => [
    ...publicMenuList.value,
    ...authMenuList.value,
  ]);

  return {
    publicMenuList,
    authMenuList,
    menuList,
  };
};
