import type { State } from "./_middleware.ts";
import { deleteUserBySession } from "@/utils/db.ts";
import { signOut } from "@/utils/oauth2_client.ts";
import { deleteAppSessionCookie } from "@/utils/auth_session.ts";
import { Handlers } from "fresh/compat";

// deno-lint-ignore no-explicit-any
export const handler: Handlers<any, State> = {
  async GET(ctx) {
    const req = ctx.req;

    if (ctx.state.sessionId) {
      await deleteUserBySession(ctx.state.sessionId);
    }

    const res = await signOut(req);
    deleteAppSessionCookie(res.headers);
    return res;
  },
};
