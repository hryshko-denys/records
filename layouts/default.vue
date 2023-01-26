<template>
  <div
    class="p-12 bg-gray-100 w-full h-full min-h-screen flex flex-col items-center"
  >
    <h1 class="text-3xl font-bold underline">Friendship</h1>

    <slot />
    <ClientOnly>
      <User class="absolute top-[10px] right-[10px]" />
    </ClientOnly>
  </div>
  x
</template>

<script setup>
import User from "~/components/User.vue";
</script>
