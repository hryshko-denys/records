<template>
  <h2>Edit record</h2>
  <form-record
    :title="title"
    :email="email"
    :number="number"
    :currency="currency"
    @submit-form="handleEditRecord"
  />
</template>

<script setup>
import useUser from "~/composables/useUser";
import useEditRecord from "~/composables/useEditRecord";

const { user } = useUser();
const { editRecord } = useRecords();

watchEffect(async () => {
  if (!user.value) {
    await navigateTo("/login");
  }
});

const { editedRecord } = useEditRecord();

const { title, people, number, currency } = editedRecord.value;
const email = computed(() => people.filter((email) => email !== user.value.email)[0])


const handleEditRecord = async ({ record, recordWith }) => {
  const updatedRecord = { ...editedRecord.value, ...record }

  await editRecord({ record: updatedRecord, recordWith})
}
</script>
