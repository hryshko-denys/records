const isLoading = ref(false);

export default async () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  // console.log(user)
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
    console.log("LOGOUT")

    try {
      const { error } = await supabase.auth.signOut()

      // await $fetch("/api/_supabase/session", {
      //   method: "POST",
      //   body: { event: "SIGNED_OUT", session: null },
      // });
      console.log(user)

      user.value = null;
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }

    navigateTo("/login");
  };

  return { login, logout, auth: supabase.auth, user, isLoading };
};
