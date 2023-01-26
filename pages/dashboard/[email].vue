<template>
  <h2 class="w-[100%] mb-[15px] text-left">
    Total records {{ currentRecords.length }}
  </h2>
  <div
    class="w-[100%] mb-[15px] rounded-[15px] border-amber-800 border p-[5px] place-content-center"
  >
    <div class="grid grid-cols-[10%_1fr_1fr_1fr_1fr]">
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
  <NuxtLink
    :to="`create-record?email=${email}`"
    class="mb-[20px] inline-block px-[10px] py-[5px] rounded-[5px] bg-[#A8E1BA]"
  >
    Create deal with this person
  </NuxtLink>
  <NuxtLink
    to="/dashboard"
    class="inline-block px-[10px] py-[5px] rounded-[5px] bg-[#A8E1BA]"
  >
    Dashboard
  </NuxtLink>
</template>

<script setup>
import useRecords from "~/composables/useRecords";
import tableHeaders from "~/utils/table-headers";
import TableHeader from "~/components/table/TableHeader.vue";

const { email } = useRoute().params;
const { records } = useRecords();

const currentRecords = records.value.filter((record) =>
  record.people.includes(email)
);
</script>
