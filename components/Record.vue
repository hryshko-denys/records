<template>
  <div class="grid grid-cols-[10%_1fr_1fr_1fr_1fr]">
    <table-cell v-for="cell in tableCells" :key="cell">
      {{ cell }}
    </table-cell>
  </div>
</template>

<script setup lang="ts">
import TableCell from "~/components/table/TableCell.vue";

import { RecordInt } from "~/types/Record";

const props = defineProps<{ record: RecordInt; number: number }>();
const { title, created_at, number, currency } = props.record;
const adaptedDate = computed(() => {
  return new Date(created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  })
})

const tableCells = computed(() => [
  props.number + 1,
  title,
  adaptedDate,
  number,
  currency,
]);
</script>
