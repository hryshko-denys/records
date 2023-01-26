<template>
  <div>Index</div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

const { user } = useUser();

watchEffect(async () => {
  if (user.value) {
    await navigateTo("/dashboard");
  }
});
</script>