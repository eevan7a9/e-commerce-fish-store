import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';
import { useLang } from './useLang';
import { Notify } from 'quasar';

export function useLogout() {
  const auth = useAuthStore();
  const router = useRouter();
  const lang = useLang();
  const notify = Notify;

  function logout() {
    auth.clearState();
    lang.resetLanguage();
    router.push('/signin');
    notify.create({
      color: 'positive',
      message: 'You have been logged out successfully.',
      timeout: 3000,
    });
  }

  return {
    logout,
  };
}
