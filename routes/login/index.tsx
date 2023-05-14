import { Handlers, PageProps } from "https://deno.land/x/fresh@1.1.5/server.ts";
import type { State } from "@/routes/_middleware.ts";
import Head from "../../components/Head.tsx";
import {
  BUTTON_STYLES,
  INPUT_STYLES,
  NOTICE_STYLES,
} from "../../utils/constants.ts";
import Logo from "../../components/Logo.tsx";
import OAuthLoginButton from "../../components/OAuthLoginButton.tsx";

// deno-lint-ignore no-explicit-any
export const handler: Handlers<any, State> = {
  async GET(req, ctx) {
    const {
      data: { session },
    } = await ctx.state.supabaseClient.auth.getSession();

    if (session) {
      return new Response(null, {
        headers: {
          location: "/",
        },
        status: 302,
      });
    }
    return ctx.render();
  },
};

const POSSIBLE_ERROR_MESSAGES = new Set(["Invalid login credentials"]);

export default function LoginPage(props: PageProps) {
  const errorMessage = props.url.searchParams.get("error");

  return (
    <>
      <Head title="Login" />
      <div class="max-w-xs flex h-screen m-auto">
        <div class="m-auto w-96">
          <a href="/">
            <Logo class="mb-8" />
          </a>
          {errorMessage && POSSIBLE_ERROR_MESSAGES.has(errorMessage) && (
            <div class={NOTICE_STYLES}>{errorMessage}</div>
          )}
          <OAuthLoginButton
            provider="google"
            disabled={false}>
            <img
              src="/google.svg"
              alt="GitHub logo"
              class="inline mr-2 h-5 w-5 align-text-top"
            />
            Login with Google
          </OAuthLoginButton>
          <div class="text-center text-gray-500 space-y-2 mt-8">
            N/S高生またはN中等部生以外は<br></br>使うことができません
          </div>
        </div>
      </div>
    </>
  );
}
