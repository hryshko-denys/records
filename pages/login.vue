<template>
  <button @click="login">Login</button>
  <div v-if="isLoading">Loading...</div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});

const { user, login, isLoading } = useUser();

watchEffect(async () => {
  if (user.value) {
    await navigateTo("/dashboard");
  }
});
</script>
