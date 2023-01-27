<template>
  <div class="w-[200px] h-100-[px] border-1 border-red-700">
    {{ errorMessage }}
    <button @click="resetError">close error</button>
  </div>
</template>

<script setup>
import useErrorMessage from "~/composables/useErrorMessage";

const { errorMessage, resetError } = useErrorMessage();
</script>
