<template>
  <label for="title"> {{ title }} </label>
  <input
    v-model="inputValue"
    @blur="$emit('handle-blur')"
    id="title"
    type="text"
    :class="['border-2 border-grey-200', !isValid && 'border-red-700']"
  />
</template>

<script setup>
import { useModelWrapper } from "~/composables/useModelWrapper";

const props = defineProps(["modelValue", "isValid", "title"]);
const emits = defineEmits(["handle-blur", "update:modelValue"]);

const inputValue = useModelWrapper(props, emits);
</script>
