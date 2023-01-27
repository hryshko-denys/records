<template>
  <div
    v-if="user"
    class="w-[150px] flex flex-col items-center justify-center border rounded-[10px] shadow-cyan-500/50 px-[5px] py-[8px]"
  >
    <h2>{{ name }}</h2>
    <img
      :src="profile"
      class="w-[75px] h-[75px] mb-[5px] rounded-[15px]"
      alt="User"
      @error="setDefaultImg"
    />
    <div class="text-[12px]">{{ email }}</div>

    <button @click="logout">Sign out</button>
  </div>
</template>

<script setup>
const { logout, user } = useUser();
console.log(user.value);

const name = computed(() => user.value?.user_metadata.full_name);
console.log(user.value?.user_metadata);

const profile = computed(() => user.value?.user_metadata.avatar_url);
const email = computed(() => user.value?.user_metadata.email);

const setDefaultImg = (event) => {
  event.src =
    "https://cdn-icons-png.flaticon.com/512/1246/1246351.png?w=1060&t=st=1674653987~exp=1674654587~hmac=c13a8e68d043023d9d978222bcbf260d6fc32bd3247e35f862f8b41fad72099b";
};
</script>
