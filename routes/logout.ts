import type { Handlers } from "$fresh/server.ts";
import {
  deleteCookie,
} from "https://deno.land/std@0.184.0/http/cookie.ts";
import type { State } from "./_middleware.ts";

// deno-lint-ignore no-explicit-any
export const handler: Handlers<any, State> = {
  async GET(_req, ctx) {
    const { error } = await ctx.state.supabaseClient.auth.signOut();
    if (error) throw error;

    const response = new Response(null, {
      headers: { location: "/" },
      status: 303,
    });
    deleteCookie(response.headers, "supabase-auth-token", {path: "/"})

    console.log(response);
    return response;
  },
};
