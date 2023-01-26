const isLoading = ref(false);

export default () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

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

  return { login, logout, user, auth: supabase.auth, isLoading };
};
