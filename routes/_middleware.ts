import { MiddlewareHandlerContext } from "https://deno.land/x/fresh@1.1.5/server.ts";
import { walk } from "std/fs/walk.ts";
import { createSupabaseClient } from "../utils/supabase.ts";
import type { Session } from "@supabase/supabase-js";


const STATIC_DIR_ROOT = new URL("../static", import.meta.url);
const staticFileNames: string[] = [];
for await (const { name } of walk(STATIC_DIR_ROOT, { includeDirs: false })) {
  staticFileNames.push(name);
}

export interface State {
  session: Session | null;
  supabaseClient: ReturnType<typeof createSupabaseClient>;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const {pathname} = new URL(req.url);
  // KeepAlliveや静的リクエストのセッション管理データを処理しない
  if (["_frsh", ...staticFileNames].some((part) => pathname.includes(part))) {
    return await ctx.next();
  }

  const headers = new Headers();
  const supabaseClient = createSupabaseClient(req.headers, headers);

  const { data: { session } } = await supabaseClient.auth.getSession();

  ctx.state.session = session;
  ctx.state.supabaseClient = supabaseClient;

  const response = await ctx.next();

  headers.forEach((value, key) => response.headers.set(key, value));
  return response;
}