<template>
  <form @submit.prevent="submitForm" class="flex flex-col">
    <form-input
      v-for="input in recordInfo"
      :key="input.title"
      v-model="input.value"
      :isValid="input.isValid"
      :title="input.title"
      @handle-blur="input.isValid = true"
    />

    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import useUser from "~/composables/useUser";
import FormInput from "~/components/form/FormInput.vue";

const { user } = useUser();

const emit = defineEmits(["submit-form"]);
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: "",
  },
  email: {
    type: String,
    required: false,
    default: "",
  },
  number: {
    type: Number,
    required: false,
    default: 0,
  },
  currency: {
    type: String,
    required: false,
    default: "$",
  },
});

const recordInfo = reactive({
  title: { isValid: true, value: props.title, title: "Title" },
  email: { isValid: true, value: props.email, title: "Email" },
  number: { isValid: true, value: props.number, title: "Value" },
  currency: { isValid: true, value: props.currency, title: "Currency" },
});

const submitForm = () => {
  const gmailRegEx = new RegExp("(\\W|^)[\\w.+\\-]*@gmail\\.com(\\W|$)", "ig");

  let isValidForm = true;

  const newRecord = {};

  for (const [key, value] of Object.entries(recordInfo)) {
    if (key === "email" && user.value && user.value.email) {
      const isAuthEmail = value.value === user.value.email;
      const isEmailValid = gmailRegEx.test(value.value) && !isAuthEmail;

      recordInfo.email.isValid = isEmailValid;
      isValidForm = isEmailValid && isValidForm;
      newRecord.people = [user.value.email, recordInfo.email.value];
    } else {
      recordInfo[key].isValid = !!value.value;
      isValidForm = isValidForm && !!value.value;
      newRecord[key] = value.value;
    }
  }

  if (isValidForm) {
    emit("submit-form", {
      record: newRecord,
      recordWith: recordInfo.email.value,
    });
  }
};
</script>

<!-- TS FAIL -->

<!--<script setup lang="ts">&ndash;&gt;-->
<!--import useUser from "~/composables/useUser";-->
<!--import { RecordInt } from "~/types/Record";-->

<!--type FormProps = {-->
<!--  title?: string;-->
<!--  email?: string;-->
<!--  number?: number;-->
<!--  currency?: string;-->
<!--};-->

<!--const emit = defineEmits();-->
<!--const { user } = useUser();-->

<!--const props = withDefaults(defineProps<FormProps>(), {-->
<!--  title: "",-->
<!--  email: "",-->
<!--  number: 0,-->
<!--  currency: "$",-->
<!--});-->

<!--const recordInfo = reactive({-->
<!--  title: { isValid: true, value: props.title },-->
<!--  email: { isValid: true, value: props.email },-->
<!--  number: { isValid: true, value: props.email },-->
<!--  currency: { isValid: true, value: props.currency },-->
<!--});-->

<!--const { title, email, number, currency } = toRefs(recordInfo);-->

<!--const submitForm = () => {-->
<!--  const gmailRegEx = new RegExp("(\\W|^)[\\w.+\\-]*@gmail\\.com(\\W|$)", "ig");-->

<!--  let isValidForm = true;-->

<!--  const newRecord = {} as RecordInt;-->

<!--  for (const [key, value] of Object.entries(recordInfo)) {-->
<!--    if (key === "email" && user.value && user.value.email) {-->
<!--      const isAuthEmail = value.value === user.value.email;-->
<!--      const isEmailValid = gmailRegEx.test(value.value) && !isAuthEmail;-->
<!--      console.log(isEmailValid, "isEmailValid");-->
<!--      recordInfo.email.isValid = isEmailValid;-->
<!--      isValidForm = isEmailValid;-->
<!--      newRecord.people = [user.value.email, recordInfo.email.value];-->
<!--    } else {-->
<!--      recordInfo[key].isValid = !!value.value;-->
<!--      isValidForm = isValidForm && !!value.value;-->
<!--      newRecord[key] = value.value;-->
<!--    }-->
<!--  }-->

<!--  if (isValidForm) {-->
<!--    addNewRecord(newRecord, recordInfo.email.value);-->
<!--  }-->

<!--  console.log(isValidForm, "isValid");-->
<!--  console.log(recordInfo, 'recordInfo @blur=title.isValid = true"');-->
<!--};-->
<!--</script>-->
