<template>
  <div>Index</div>
</template>

<script setup>
import useUser from "~/composables/useUser";

definePageMeta({
  middleware: ['auth']
})

const { user } = await useUser();

watchEffect(async () => {
  if (user.value) {
    await navigateTo("/dashboard");
  }
});
</script>