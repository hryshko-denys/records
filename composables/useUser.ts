const isLoading = ref(false);
const userInfo: any = ref(null)

export default () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  if (user) {
    userInfo.value = user;
  }
  console.log(user, "USER")

  const login = async () => {
    isLoading.value = true;

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        console.log(error);
      }
    } catch (err) {
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    isLoading.value = true;

    try {
      await $fetch("/api/_supabase/session", {
        method: "POST",
        body: { event: "SIGNED_OUT", session: null },
      });
      user.value = null;
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }

    navigateTo("/login");
  };

  return { login, logout, user, auth: supabase.auth, isLoading, userInfo };
};
