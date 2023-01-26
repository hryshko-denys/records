<template>
  <div>
    <span v-if="isLoading">loading</span>
    <div v-else>
      <h3>{{ title }}</h3>
      <ul v-if="hasDeals">
        <li v-for="user in uniqueUsers" :key="user">
          <NuxtLink :to="`dashboard/${user}`">{{ user }}</NuxtLink>
        </li>
      </ul>
      <NuxtLink to="dashboard/create-record">Create deal with new person</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import useRecords from "~/composables/useRecords";
import useUser from "~/composables/useUser";

definePageMeta({
  middleware: ["auth"],
});

const { getAllRecords, records } = useRecords();
const { user } = useUser();

const isLoading = ref(true);
const uniqueUsers = ref([]);

watchEffect(async () => {
  if (!user.value) {
    await navigateTo("/login");
  }
});

onMounted(async () => {
  await getAllRecords();

  const users = records.value.map(
    (deal) => deal.people.filter((person) => person !== user.value.email)[0]
  );

  uniqueUsers.value = Array.from(new Set(users));
  isLoading.value = false;
});

const hasDeals = computed(() => uniqueUsers.value.length !== 0)

const title = computed(() => {
  return hasDeals.value
    ? `You have records with ${uniqueUsers.value.length} friends`
    : "You don't have active records";
});
</script>
