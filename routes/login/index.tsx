import { PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import OAuthLoginButton from "@/components/OAuthLoginButton.tsx";
import { Handlers } from "@/utils/handler.ts";

export const handler: Handlers = {
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

export default function LoginPage(props: PageProps) {
  return (
    <>
      <Head title="Login" />
      <div class="max-w-xs flex h-screen m-auto">
        <div class="m-auto w-96">
          <a href="/" class={"p-10"}>
            <image src="/logo.png" />
          </a>
          <OAuthLoginButton provider="google" disabled={false}>
            <img
              src="/svg/google.svg"
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
