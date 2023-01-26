export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useUser();

  if (!user.value && to.path !== "/login") {
    navigateTo("/login");
  } else if (user.value && to.path !== "/dashboard") {
    navigateTo("/dashboard");
  }
});
