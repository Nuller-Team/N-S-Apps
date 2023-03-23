import { Handlers } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import env from "@/utils/env.ts";

import type { tokenResponse } from "@/types/token.ts";
import { User, UserCookie, Verify } from "@/utils/mongodb.ts";

export const handler: Handlers = {
  async GET(req, _ctx) {
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
    await Verify.deleteMany({ id: UserInfo.id });
    await Verify.insertOne({
      token: token,
      name: name,
      id: UserInfo.id,
      school: UserInfo.school,
      gen: UserInfo.gen,
    });
    res = {
      status: "Success",
      text: `${env.SERVER_URL}/verify/${token}`,
    };
    return new Response(JSON.stringify(res));
  },
};
