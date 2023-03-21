import { Handlers } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";

import db from "utils/mongodb.ts";

import type { UserCookieType, VerifyDataType } from "types/db.ts";
import { tokenError } from "../../types/error.ts";

const UserCookie = db.collection<UserCookieType>("UserCookie");
const Verify = db.collection<VerifyDataType>("Verify");

export const handler: Handlers = {
  async GET(req, _ctx) {
    const cookie = getCookies(req.headers);
    let errorMsg: tokenError;
    if (cookie["remember-me"]) {
      const UserId = await UserCookie.findOne({ token: cookie["remember-me"] });
      if (UserId) {
        const url = new URL(req.url);
        const name = url.searchParams.get("name")!;
        console.log(name);
        if (!name) {
          errorMsg = {
            status: "Error",
            text: "ハンドルネームが見つかりませんでした",
          };
          return new Response(JSON.stringify(errorMsg));
        }
      }
    }
    return new Response("HELLO");
  },
};
