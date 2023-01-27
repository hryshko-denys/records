<template>
  <h2>Create new record</h2>
  <form-record :email="searchQuery" @submit-form="addNewRecord" />
</template>

<script setup>
import useUser from "~/composables/useUser";

const { user } = useUser();
const { addNewRecord } = useRecords();

const route = useRoute();
const searchQuery = computed(() => route.query.email || '');

watchEffect(async () => {
  if (!user.value) {
    await navigateTo("/login");
  }
});
</script>
