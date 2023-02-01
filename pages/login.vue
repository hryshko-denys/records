<template>
  <button @click="login" class="mb-[50px]">Login</button>
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
  if (user.value) {
    await navigateTo("/dashboard");
  }
});
</script>
