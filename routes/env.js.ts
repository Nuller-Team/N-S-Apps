import { Handler } from "../types/handler.ts";

export const handler: Handler = () => {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = Deno.env.toObject();

  const envFile = `window.env = {
        SUPABASE_URL: "${SUPABASE_URL}",
        SUPABASE_ANON_KEY: "${SUPABASE_ANON_KEY}",
    }`;

  return new Response(envFile, {
    headers: {
      "content-type": "application/javascript",
    },
  });
};
