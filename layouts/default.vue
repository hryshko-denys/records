<template>
  <div
    class="p-12 bg-red w-full h-full min-h-screen flex flex-col items-center"
  >
    <h1 class="mb-[200px] text-3xl font-bold underline">Friendship</h1>

    <slot />
    <ClientOnly>
      <User class="absolute top-[10px] right-[10px]" />
    </ClientOnly>
  </div>
</template>

<script setup>
import User from "~/components/User.vue";
</script>
