import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { walk } from "std/fs/walk.ts";
import { getSessionId } from "kv_oauth";
import { redirect, setRedirectUrlCookie } from "@/utils/redirect.ts";
import { User, getUserBySession } from "@/utils/db.ts";
import { Status } from "std/http/http_status.ts";

const STATIC_DIR_ROOT = new URL("../static", import.meta.url);
const staticFileNames: string[] = [];
for await (const { name } of walk(STATIC_DIR_ROOT, { includeDirs: false })) {
  staticFileNames.push(name);
}

export interface State {
  user?: User;
  sessionId?: string;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>
) {
  const { hostname ,pathname } = new URL(req.url);

  if (hostname != "n-s-apps.nuller.net" && hostname != "localhost") {
    return redirect("https://n-s-apps.nuller.net", Status.Found);
  }

  // KeepAlliveや静的リクエストのセッション管理データを処理しない
  if (["_frsh", ...staticFileNames].some((part) => pathname.includes(part))) {
    return await ctx.next();
  }

  ctx.state.sessionId = await getSessionId(req);

  if (ctx.state.sessionId) {
    const user = await getUserBySession(ctx.state.sessionId);
    if (user) {
      ctx.state.user = user;
    }
  }
  const res = await ctx.next();
  if (ctx.destination === "route" && pathname == "/signin") {
    setRedirectUrlCookie(req, res);
  }

  return res;
}
