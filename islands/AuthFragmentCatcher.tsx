import { useEffect } from "preact/hooks";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-shared";

interface AuthFragmentCatcherProps {
  supabaseUrl: string;
  supabaseKey: string;
  redirectTo?: string;
}

export default function AuthFragmentCatcher(props: AuthFragmentCatcherProps) {
  useEffect(() => {
    const supabase = createBrowserSupabaseClient(props);
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        window.location.href = props.redirectTo || "/";
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <span></span>;
}
