import type { Provider } from "@supabase/supabase-js";
import { Handlers } from "@/utils/handler.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const provider = form.get("provider");

    if (typeof provider !== "string") {
      return new Response(null, { status: 400 });
    }

    const { origin } = new URL(req.url);
    const { data, error } = await ctx.state.supabaseClient.auth.signInWithOAuth(
      {
        provider: provider as Provider,
        options: {
          redirectTo: origin + "/login/success",
        },
      }
    );

    if (error) throw error;

    return new Response(null, { headers: { location: data.url }, status: 302 });
  },
};
