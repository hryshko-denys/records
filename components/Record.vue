<template>
  <div class="flex">
    <div>{{ title }}</div>
    <div>{{ created_at }}</div>
    <div>{{ value }}</div>
    <div>{{ currency }}</div>
  </div>

</template>

<script setup lang="ts">
import { RecordInt } from "~/types/Record";

const props = defineProps<{record: RecordInt}>();
const { title, created_at, value, currency } = props.record;
</script>