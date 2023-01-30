<template>
  <button @click="login">Login</button>
  <div v-if="isLoading">Loading...</div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});

const { user, login, isLoading, getSession } = useUser();

onMounted(async () => {
  await getSession();
})

watchEffect(async () => {
  console.log('watch login', user);

  if (user.value) {
    await navigateTo("/dashboard");
  }
});
</script>
