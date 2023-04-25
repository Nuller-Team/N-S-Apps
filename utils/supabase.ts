import { createServerSupabaseClient } from "@supabase/auth-helpers-shared";
import { getCookies, setCookie } from "std/http/cookie.ts";
import { Database } from "./supabase_types.ts";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const supabaseAdminClient = createClient<Database>(
  Deno.env.get("SUPABASE_API_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

export function createSupabaseClient(
  requestHeaders: Headers,
  responseHeaders?: Headers,
) {
  return createServerSupabaseClient<Database>({
    supabaseUrl: Deno.env.get("SUPABASE_API_URL")!,
    supabaseKey: Deno.env.get("SUPABASE_ANON_KEY")!,
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

async function getUser(supabaseClient: SupabaseClient<Database>) {
  const { data } = await supabaseClient.from("user").select().single();
  return data;
}

async function createUser(
  supabaseClient: SupabaseClient<Database>,
  user: Database["public"]["Tables"]["user"]["Insert"]
) {
  const { data } = await supabaseClient
    .from("user")
    .insert(user)
    .select()
    .single()
    .throwOnError();
  return data!;
}

export async function createOrGetUser(
  supabaseClient: SupabaseClient<Database>
) {
  const userData = await getUser(supabaseClient);
  if (userData) return userData;
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  if (user?.email?.endsWith("@nnn.ed.jp")) {
    let gen = Number(user.email.split("_")[1].slice(0, 2));
    const school_name = user.email.split("_")[1].slice(2, 1).toUpperCase();

    let school: Database["public"]["Tables"]["user"]["Insert"]["school"] = "N";
    if (school_name === "N") {
      gen -= 15;
    } else if (school_name === "S") {
      gen -= 20;
      school = "S";
    }
    return await createUser(supabaseClient, {
      id: user?.id!,
      email: user?.email!,
      school: school,
      gen: gen,
    });
  }
  console.log("WTF")
}
