<template>
  <button @click="login">Login</button>
  <div v-if="isLoading">Loading...</div>
</template>

<script setup>
import useUser from "~/composables/useUser";
definePageMeta({
  middleware: ["auth"],
});

const { login, isLoading, auth } = await useUser();

const { user } = await useUser();

watchEffect(async () => {
  const session = await auth.getSession()
  console.log('session', session);

  if (user.value) {
    await navigateTo("/dashboard");
  }
});
</script>
