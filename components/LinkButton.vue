<template>
  <NuxtLink
    :to="link"
    class="inline-block px-[10px] py-[5px] rounded-[5px] bg-[#A8E1BA]"
  >
    <slot />
  </NuxtLink>
</template>
<script setup lang="ts">
type LinkType = {
  link: string;
};

const { link } = defineProps<LinkType>();
</script>
