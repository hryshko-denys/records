<template>
  <ul>
    <li v-for="user in uniqueUsers" :key="user">
      <NuxtLink :to="`dashboard/${user}`">{{ user }}</NuxtLink>
    </li>
  </ul>
</template>

<script setup>
import useRecords from "~/composables/useRecords";

const { getAllRecords, uniqueUsers } = await useRecords();
</script>
