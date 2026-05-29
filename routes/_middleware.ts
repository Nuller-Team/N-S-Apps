import { FreshContext } from "fresh";
import { deleteCookie } from "@std/http/cookie";
import { redirect } from "@/utils/redirect.ts";
import { deleteUserBySession, getUserBySession, User } from "@/utils/db.ts";
import {
  deleteAppSessionCookie,
  getAppSessionToken,
  hashSessionToken,
} from "@/utils/auth_session.ts";
import { getGoogleUser } from "@/utils/google.ts";

const STATIC_PATH_PREFIXES = ["/_frsh", "/.well-known", "/assets"];
const STATIC_FILE_EXTENSION_PATTERN =
  /\.(?:css|js|mjs|map|png|jpg|jpeg|gif|webp|avif|svg|ico|json|txt|xml|webmanifest|woff2?|ttf|otf)$/i;

export interface State {
  user?: User;
  sessionId?: string;
}

function clearSessionAndRedirect(req: Request, sessionId: string) {
  const url = new URL(req.url);
  const from = encodeURIComponent(`${url.pathname}${url.search}`);
  const res = redirect(`/signIn?from=${from}`, 302);
  deleteAppSessionCookie(res.headers);
  deleteCookie(res.headers, "auth_session", { path: "/" });
  return deleteUserBySession(sessionId).then(() => res);
}

export async function handler(
  ctx: FreshContext<State>,
) {
  const req = ctx.req;
  const { hostname, pathname } = new URL(req.url);

  if (
    hostname != "n-s-apps.nuller.jp" && hostname != "localhost" &&
    hostname != "127.0.0.1"
  ) {
    return redirect("https://n-s-apps.nuller.jp", 302);
  }

  if (
    STATIC_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    STATIC_FILE_EXTENSION_PATTERN.test(pathname)
  ) {
    return await ctx.next();
  }

  if (pathname.toLowerCase() === "/callback") {
    return await ctx.next();
  }

  const appSessionToken = getAppSessionToken(req.headers);
  if (appSessionToken) {
    try {
      ctx.state.sessionId = await hashSessionToken(appSessionToken);
    } catch (e) {
      console.error("[ERROR] Failed to extract app session:", e);
    }
  }

  if (ctx.state.sessionId) {
    try {
      const user = await getUserBySession(ctx.state.sessionId);
      if (user) {
        if (!user.googleAccessToken) {
          return await clearSessionAndRedirect(req, user.sessionId);
        }

        try {
          await getGoogleUser(user.googleAccessToken);
        } catch (_e) {
          return await clearSessionAndRedirect(req, user.sessionId);
        }

        ctx.state.user = user;
      }
    } catch (_e) {
      // エラーが発生してもセッションを消してリダイレクトさせる
    }
  }

  return await ctx.next();
}
