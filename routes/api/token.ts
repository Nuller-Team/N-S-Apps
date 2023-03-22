import { Handlers } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";

import db from "utils/mongodb.ts";

import type { UserCookieType, VerifyDataType, UserDataType } from "types/db.ts";
import type { tokenResponse } from "types/token.ts";

const UserCookie = db.collection<UserCookieType>("UserCookie");
const Verify = db.collection<VerifyDataType>("Verify");
const User = db.collection<UserDataType>("User");

export const handler: Handlers = {
  async GET(req, ctx) {
    const cookie = getCookies(req.headers);
    let res: tokenResponse;

    if (!cookie["remember-me"]) {
      res = { status: "Error", text: "不正アクセスです" };
      return new Response(JSON.stringify(res));
    }
    const UserId = await UserCookie.findOne({ token: cookie["remember-me"] });
    if (!UserId) {
      res = { status: "Error", text: "不正アクセスです" };
      return new Response(JSON.stringify(res));
    }
    const url = new URL(req.url);
    const name = url.searchParams.get("name")!;
    if (!name) {
      res = {
        status: "Error",
        text: "ハンドルネームが見つかりませんでした",
      };
      return new Response(JSON.stringify(res));
    }
    const token = crypto.randomUUID();
    const UserInfo = await User.findOne({ id: UserId.id });
    if (!UserInfo) {
      res = {
        status: "Error",
        text: "内部エラーが発生しました",
      };
      return new Response(JSON.stringify(res));
    }
    Verify.deleteMany({ id: UserInfo.id });
    Verify.insertOne({
      token: token,
      name: name,
      id: UserInfo.id,
      school: UserInfo.school,
      gen: UserInfo.gen,
    });
    res = {
      status: "Success",
      text: token,
    };
    return new Response(JSON.stringify(res));
  },
};
