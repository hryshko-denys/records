import {useSupabaseAuthClient} from "#build/imports";

const isLoading = ref(false);
const user: any = ref();

export default () => {
  const supabase = useSupabaseClient();
  const authClient = useSupabaseAuthClient()

  const getSession = async () => {
    const session: any = await supabase.auth.getSession();
    console.log(session, "SESSION");

    if (session.data.session) {
      user.value = session.data.session.user;
    } else {
      user.value = null;
    }
  };

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
      // await $fetch("/api/_supabase/session", {
      //   method: "POST",
      //   body: { event: "SIGNED_OUT", session: null },
      // });
      await authClient.auth.signOut()

    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
      await getSession()

    navigateTo("/login");
  };

  return { login, logout, user, auth: supabase.auth, isLoading, getSession };
};
