<script setup lang="ts">
import { Notify } from 'quasar';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const notify = Notify;

defineOptions({
  name: 'SigninPage',
});

const authStore = useAuthStore();

function signin() {
  authStore.setUser({
    id: 1,
    name: 'test',
    email: 'test@email.com',
    is_admin: true,
    created_at: new Date(),
    updated_at: new Date(),
  });
  authStore.setToken('secret');
  router.push('/profile');
  notify.create({
    color: 'positive',
    message: 'You have signed in successfully.',
    timeout: 3000,
  });
}
</script>

<template>
  <h1>Signin Page</h1>
  <q-btn color="primary" @click="signin()">Submit</q-btn>
</template>
