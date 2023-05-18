import type { PageProps } from "$fresh/server.ts";
import AuthFragmentCatcher from "@/islands/AuthFragmentCatcher.tsx";
import env from "../../utils/env.ts";

export default function OAuthSuccessPage(props: PageProps) {
  return (
    <AuthFragmentCatcher
      supabaseUrl={env("SUPABASE_URL")}
      supabaseKey={env("SUPABASE_ANON_KEY")}
      redirectTo={props.url.searchParams.get("redirect_to") || undefined}
    />
  );
}
