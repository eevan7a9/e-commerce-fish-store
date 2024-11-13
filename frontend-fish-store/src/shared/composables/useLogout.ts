import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';
import { useLang } from './useLang';
import { Loading, Notify } from 'quasar';

export function useLogout() {
  const auth = useAuthStore();
  const router = useRouter();
  const lang = useLang();
  const notify = Notify;

  async function logout(opts = { message: '', color: '' }) {
    Loading.show({
      message: 'Please wait, logging out...',
    });

    const res =
      process.env.ENABLE_STATIC_MODE === 'true'
        ? await auth.signoutMockUser()
        : await auth.signout();

    notify.create({
      color: opts.color || (res?.success ? 'positive' : 'negative'),
      message: opts.message || res?.message || 'You have been logged out.',
      timeout: 5000,
    });
    lang.resetLanguage();

    Loading.hide();
    router.push('/auth');
  }

  return {
    logout,
  };
}
