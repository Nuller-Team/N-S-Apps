import { MiddlewareHandlerContext } from "https://deno.land/x/fresh@1.1.5/server.ts";
import { walk } from "std/fs/walk.ts";
import {
  createSupabaseClient,
  supabaseAdminClient,
} from "../utils/supabase.ts";
import { Database } from "../utils/supabase_types.ts";

const STATIC_DIR_ROOT = new URL("../static", import.meta.url);
const staticFileNames: string[] = [];
for await (const { name } of walk(STATIC_DIR_ROOT, { includeDirs: false })) {
  staticFileNames.push(name);
}

export interface State {
  user?: {
    id: string;
    email: string;
    name: string;
    school: {
      name: "N" | "S" | "NJR";
      gen: number;
      admission_month: "4" | "7" | "10" | "1" | "";
    };
    avatar_url: string;
  };
  active: "enabled" | "disabled" | "Not logged in";
  supabaseClient: ReturnType<typeof createSupabaseClient>;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>
) {
  const { pathname } = new URL(req.url);
  // KeepAlliveや静的リクエストのセッション管理データを処理しない
  if (["_frsh", ...staticFileNames].some((part) => pathname.includes(part))) {
    return await ctx.next();
  }

  const headers = new Headers();
  const supabaseClient = createSupabaseClient(req.headers, headers);

  ctx.state.supabaseClient = supabaseClient;

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    ctx.state.active = "Not logged in";
    const response = await ctx.next();

    headers.forEach((value, key) => response.headers.set(key, value));
    return response;
  }

  const { data: dbData } = await supabaseAdminClient
    .from("user")
    .select()
    .eq("auth_id", user.id)
    .single();

  if (!dbData) {
    const school_name = user.email?.slice(-18, -17).toUpperCase();
    if (user.email?.endsWith("@nnn.ed.jp")) {
      let gen = Number(user.email.split("_")[1].slice(0, 2));
      let school: Database["public"]["Tables"]["user"]["Insert"]["school"] =
        "N";
      if (school_name === "N") {
        gen -= 15;
      } else if (school_name === "S") {
        gen -= 20;
        school = "S";
      }
      await supabaseAdminClient
        .from("user")
        .insert({
          auth_id: user.id,
          gen,
          school,
        })
        .throwOnError();
      ctx.state.user = {
        id: user.id,
        email: user.email!,
        name: user.user_metadata?.full_name,
        avatar_url: user.user_metadata?.avatar_url,
        school: {
          name: school,
          gen: gen,
          admission_month: "",
        },
      };
      ctx.state.active = "enabled";
    } else if (user.email?.endsWith("@n-jr.jp")) {
      const gen = Number(user.email.split("_")[1].slice(0, 2));
      await supabaseAdminClient.from("user").insert({
        auth_id: user.id,
        gen,
        school: "NJR",
      });
      ctx.state.user = {
        id: user.id,
        email: user.email!,
        name: user.user_metadata?.full_name,
        avatar_url: user.user_metadata?.avatar_url,
        school: {
          name: "NJR",
          gen: gen,
          admission_month: "",
        },
      };
      ctx.state.active = "enabled";
    } else {
      ctx.state.active = "disabled";
    }
    const response = await ctx.next();

    headers.forEach((value, key) => response.headers.set(key, value));
    return response;
  }
  //--データがある場合の処理--
  ctx.state.user = {
    id: user.id,
    email: user.email!,
    name: user.user_metadata?.full_name,
    avatar_url: user.user_metadata?.avatar_url,
    school: {
      name: dbData?.school!,
      gen: dbData?.gen!,
      admission_month: dbData?.admission_month ?? "",
    },
  };
  ctx.state.active = "enabled";
  const response = await ctx.next();

  headers.forEach((value, key) => response.headers.set(key, value));
  return response;
}
