import type { State } from "./_middleware.ts";
import { redirect } from "@/utils/redirect.ts";
import { signIn } from "@/utils/oauth2_client.ts";
import { Handlers } from "fresh/compat";

// deno-lint-ignore no-explicit-any
export const handler: Handlers<any, State> = {
  /**
   * Redirects the client to the authenticated redirect path if already login.
   * If not logged in, it continues to rendering the login page.
   */
  async GET(ctx) {
    const req = ctx.req;

    return ctx.state.user ? redirect("/") : await signIn(req);
  },
};
