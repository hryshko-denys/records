<template>
  <div class="grid grid-cols-[10%_1fr_1fr_1fr_1fr_40px_40px]">
    <table-cell v-for="cell in tableCells" :key="cell">
      {{ cell }}
    </table-cell>
    <button @click="emit('edit-record', id)">
      <EditSvg class="w-[20px] h-[20px]" />
    </button>
    <button @click="deleteRecord(id)">
      <DeleteSvg class="w-[20px] h-[20px]" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRecords } from "#imports";

import TableCell from "~/components/table/TableCell.vue";
import DeleteSvg from "~/components/icons/DeleteSvg.vue";
import EditSvg from "~/components/icons/EditSvg.vue";

import { RecordInt } from "~/types/Record";

const props = defineProps<{ record: RecordInt; number: number }>();
const { title, created_at, number, currency, id } = props.record;

const { deleteRecord } = useRecords();

const adaptedDate = computed(() => {
  return new Date(created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
});

const tableCells = computed(() => [
  props.number + 1,
  title,
  adaptedDate,
  number,
  currency,
]);
</script>
