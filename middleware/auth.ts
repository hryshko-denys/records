import useUser from "~/composables/useUser";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = await useUser();

  if (!user.value && to.path !== "/login") {
    navigateTo("/login");
  } else if (user.value && to.path !== "/dashboard") {
    navigateTo("/dashboard");
  }
});
