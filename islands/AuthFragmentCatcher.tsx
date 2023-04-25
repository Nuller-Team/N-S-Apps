import { useEffect } from "preact/hooks";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-shared";

export default function AuthFragmentCatcher(
  props: Parameters<typeof createBrowserSupabaseClient>[0],
) {
  useEffect(() => {
    const supabase = createBrowserSupabaseClient(props);
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        window.location.href = "/";
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <span></span>;
}
