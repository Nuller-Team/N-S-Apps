import { createClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@supabase/auth-helpers-shared";
import { Database } from "./supabase_types.ts";
import { getCookies, setCookie } from "std/http/cookie.ts";
import env from "./env.ts";

const SUPABASE_URL = env("SUPABASE_URL");
const SUPABASE_ANON_KEY = env("SUPABASE_ANON_KEY");

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

export const supabaseAdminClient = createClient<Database>(
  env("SUPABASE_URL")!,
  env("SUPABASE_SERVICE_ROLE_KEY")!
);

export function createSupabaseClient(
  requestHeaders: Headers,
  responseHeaders?: Headers
) {
  return createServerSupabaseClient({
    supabaseUrl: env("SUPABASE_URL"),
    supabaseKey: env("SUPABASE_ANON_KEY"),
    getRequestHeader: (key) => requestHeaders.get(key) ?? undefined,
    getCookie: (name) => {
      const cookie = getCookies(requestHeaders)[name] ?? "";
      return decodeURIComponent(cookie);
    },
    setCookie: (name, value, options) => {
      if (responseHeaders) {
        setCookie(responseHeaders, {
          name,
          value: encodeURIComponent(value),
          ...options,
          sameSite: "Lax",
          httpOnly: false,
        });
      }
    },
  });
}
