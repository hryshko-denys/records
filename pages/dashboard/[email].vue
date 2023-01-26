<template>
  <div class="flex flex-col">
    <div class="flex">
      <div>Title</div>
      <div>Date</div>
      <div>Value</div>
      <div>Currency</div>
    </div>
      <Record
        v-for="record in currentRecords"
        :key="record.id"
        :record="record"
      />
    <span>Total records {{ currentRecords.length }}</span>
    <NuxtLink :to="`create-record?email=${email}`">Create deal with this person</NuxtLink>
  </div>
</template>

<script setup>
import useRecords from "~/composables/useRecords";

const { email } = useRoute().params;
const { records } = useRecords();

const currentRecords = records.value.filter((record) => record.people.includes(email));
</script>
