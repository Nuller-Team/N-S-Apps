import { Handlers } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";

import db from "utils/mongodb.ts"

import type { UserCookieType, VerifyDataType } from "types/db.ts";

const UserCookie = db.collection<UserCookieType>("UserCookie");
const Verify = db.collection<VerifyDataType>("Verify");

export const handler: Handlers = {
  async GET(req, ctx) {
    console.log(req);
    console.log(ctx);
    const cookie = getCookies(req.headers);
    if (cookie["remember-me"]) {
      const UserId = await UserCookie.findOne({ token: cookie["remember-me"] });
      if (UserId) {
      }
    }
    return new Response("HELLO");
  }
}