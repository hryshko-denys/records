<template>
  <button @click="login">Login</button>
  <div v-if="isLoading">Loading...</div>
</template>

<script setup>
import useUser from "~/composables/useUser";
definePageMeta({
  middleware: ["auth"],
});

const { login, isLoading } = await useUser();

const { user } = await useUser();

watchEffect(async () => {
  console.log('watch login', user);

  if (user.value) {
    await navigateTo("/dashboard");
  }
});
</script>
