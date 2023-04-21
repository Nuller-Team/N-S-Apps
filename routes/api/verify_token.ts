import { Handlers } from "$fresh/server.ts";

import type { tokenResponse } from "@/types/token.ts";
import { Verify } from "@/utils/mongodb.ts";

export const handler: Handlers = {
  async GET(req, _ctx) {
    let res: tokenResponse;
    const url = new URL(req.url);
    const token = url.searchParams.get("token")!;
    if (!token) {
      res = {
        status: "Error",
        text: "TOKENが見つかりませんでした",
      };
      return new Response(JSON.stringify(res))
    }
    const check = await Verify.findOne({token: token});
    if (!check) {
      res = {
        status: "Error",
        text: "TOKENが見つかりませんでした",
      };
      return new Response(JSON.stringify(res));
    }
    await Verify.deleteMany({token: token})
    res = {
      status: "Success",
      school: check.school,
      text: `${check.name}`
    }
    return new Response(JSON.stringify(res))
  },
};
