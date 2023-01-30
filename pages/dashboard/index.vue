<template>
  <div>
    <span v-if="isLoading">loading</span>
    <div v-else>
      <h3>{{ title }}</h3>
      <ul v-if="hasRecords">
        <li v-for="user in uniqueUsers" :key="user">
          <NuxtLink :to="`dashboard/${user}`">{{ user }}</NuxtLink>
        </li>
      </ul>
      <NuxtLink to="dashboard/create-record"
        >Create deal with new person</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
import useRecords from "~/composables/useRecords";
import useUser from "~/composables/useUser";

definePageMeta({
  middleware: ["auth"],
});

const { getAllRecords, uniqueUsers, recordsAlreadyLoaded } = await useRecords();
const { auth } = useUser();
const { user } = await useUser();

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

const hasRecords = computed(() => uniqueUsers.value.length !== 0);

const title = computed(() => {
  return hasRecords.value
    ? `You have records with ${uniqueUsers.value.length} friends`
    : "You don't have active records";
});
</script>
