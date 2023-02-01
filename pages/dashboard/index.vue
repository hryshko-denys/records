<template>
  <div>
    <span v-if="isLoading">loading</span>

    <div v-else>
      <h3>{{ title }}</h3>
      <UsersList />
      <NuxtLink to="dashboard/create-record">
        Create deal with new person
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import useRecords from "~/composables/useRecords";
import useUser from "~/composables/useUser";

import UsersList from "~/components/UsersList.vue";

definePageMeta({
  middleware: ["auth"],
});

const { getAllRecords, uniqueUsers, recordsAlreadyLoaded, hasRecords } =
  await useRecords();

const { auth, user } = await useUser();

const isLoading = ref(true);

watchEffect(async () => {
  if (!user.value) {
    await navigateTo("/login");
  }
});

onMounted(async () => {
  if (recordsAlreadyLoaded.value) {
    isLoading.value = false;

    return;
  }

  await getAllRecords();

  isLoading.value = false;
});

const title = computed(() => {
  return hasRecords.value
    ? `You have records with ${uniqueUsers.value.length} friends`
    : "You don't have active records";
});
</script>
