<template>
  <div
    class="p-12 bg-red w-full h-full min-h-screen flex flex-col items-center"
  >
    <h1 class="mb-[200px] text-3xl font-bold underline">Friendship</h1>

    <slot />
    <ClientOnly>
      <User class="absolute top-[10px] right-[10px]" />
    </ClientOnly>
    <ErrorMessage
      v-if="errorMessage"
      class="absolute bottom-[10px] right-[10px]"
    />
  </div>
</template>

<script setup>
import User from "~/components/User.vue";
import ErrorMessage from "~/components/ErrorMessage.vue";

import useErrorMessage from "~/composables/useErrorMessage";

const { errorMessage } = useErrorMessage();
</script>
