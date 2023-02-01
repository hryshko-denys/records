<template>
  <h2 class="w-[100%] mb-[15px] text-left">
    Total records {{ currentRecords.length }}
  </h2>
  <div
    class="w-[100%] mb-[15px] rounded-[15px] border-amber-800 border p-[5px] place-content-center"
  >
    <div class="grid grid-cols-[10%_1fr_1fr_1fr_1fr_40px_40px]">
      <table-header v-for="header in tableHeaders" :key="header">
        {{ header }}
      </table-header>
    </div>
    <Record
      v-for="(record, index) in currentRecords"
      :key="record.id"
      :record="record"
      :number="index"
    />
  </div>

  <link-button :link="`create-record?email=${email}`" class="mb-[20px]">
    Create deal with this person
  </link-button>

  <link-button link="/dashboard" class="mb-[20px]">
    Dashboard
  </link-button>
</template>

<script setup>
import useRecords from "~/composables/useRecords";

import TableHeader from "~/components/table/TableHeader.vue";
import LinkButton from "~/components/LinkButton.vue";

import tableHeaders from "~/utils/table-headers";

const { email } = useRoute().params;
const { records } = await useRecords();

watchEffect(async () => {
  if (records.value.length === 0) {
    await navigateTo("/login");
  }
});

const currentRecords = computed(() => {
  return records.value.filter((record) =>
      record.people.includes(email)
  );
})
</script>