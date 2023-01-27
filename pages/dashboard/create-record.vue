<template>
  <h2>Fill out all fields</h2>
  <form @submit.prevent="createRecord" class="flex flex-col">
    <label for="title"> Title </label>
    <input
      v-model="title.value"
      @blur="title.isValid = true"
      id="title"
      type="text"
      :class="[!title.isValid && 'border-red-700 border-2', 'border-2 border-black']"
    />
    <label for="user-email"> User email </label>
    <input
      v-model.trim="email.value"
      @blur="email.isValid = true"
      id="user-email"
      type="email"
      :class="[!email.isValid && 'border-red-700 border-2', 'border-2 border-black']"
    />
    <label for="value"> value </label>
    <input
      v-model="number.value"
      @blur="number.isValid = true"
      id="value"
      type="number"
      :class="[!number.isValid && 'border-red-700 border-2', 'border-2 border-black']"
    />
    <label for="currency"> currency </label>
    <input
      v-model="currency.value"
      @blur="currency.isValid = true"
      id="currency"
      type="string"
      :class="[!currency.isValid && 'border-red-700 border-2', 'border-2 border-black']"
    />

    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import useUser from "~/composables/useUser";
import useRecords from "~/composables/useRecords";

const { user } = useUser();
const { addNewRecord } = useRecords();
const route = useRoute();
const searchQuery = computed(() => route.query.email)

const recordInfo = reactive({
  title: { isValid: true, value: "" },
  email: { isValid: true, value: searchQuery.value },
  number: { isValid: true, value: 0 },
  currency: { isValid: true, value: "$" },
});

watchEffect(async () => {
  if (!user.value) {
    await navigateTo("/login");
  }
});

const { title, email, number, currency } = toRefs(recordInfo);

const createRecord = () => {
  const gmailRegEx = new RegExp("(\\W|^)[\\w.+\\-]*@gmail\\.com(\\W|$)", "ig");

  let isValidForm = true;

  const newRecord = {};

  for (const [key, value] of Object.entries(recordInfo)) {
    if (key === "email") {
      const isAuthEmail = value.value === user.value.email;
      const isEmailValid = gmailRegEx.test(value.value) && !isAuthEmail;
      console.log(isEmailValid, "isEmailValid");
      recordInfo.email.isValid = isEmailValid;
      isValidForm = isEmailValid;
      newRecord.people = [user.value.email, recordInfo.email.value];
    } else {
      recordInfo[key].isValid = !!value.value;
      isValidForm = isValidForm && !!value.value;
      newRecord[key] = value.value;
    }
  }

  if (isValidForm) {
    addNewRecord(newRecord, recordInfo.email.value);
  }

  console.log(isValidForm, "isValid");
  console.log(recordInfo, 'recordInfo @blur=title.isValid = true"');
};
</script>
