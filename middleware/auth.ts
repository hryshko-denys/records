import useUser from "~/composables/useUser";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // todo: seems very ugly
  const { user } = await useUser();

  if (!user.value && to.path !== "/login") {
    navigateTo("/login");
  } else if (user.value && to.path !== "/dashboard") {
    navigateTo("/dashboard");
  }
});
