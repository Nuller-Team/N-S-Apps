import { Handlers } from "$fresh/server.ts";
import type { State } from "@/types/session.ts";
import { apiResponse } from "../../types/api.ts";

export const handler: Handlers<any, State> = {
  async GET(req, ctx) {
    let res: apiResponse;
    if (!ctx.state.token) {
      res = { status: "Error", text: "不正アクセスです" };
      return new Response(JSON.stringify(res));
    }
    const url = new URL(req.url);
    const admission_month_from_parms = url.searchParams.get("month")!;
    type admission_month_type = "4" | "7" | "10" | "1";
    let admission_month: admission_month_type;
    if (admission_month_from_parms == "4") admission_month = "4";
    else if (admission_month_from_parms == "7") admission_month = "7";
    else if (admission_month_from_parms == "10") admission_month = "10";
    else if (admission_month_from_parms == "1") admission_month = "1";
    else {
      res = {
        status: "Error",
        text: "monthが設定されていません",
      };
      return new Response(JSON.stringify(res));
    }
    res = {
      "status": "Success",
      text: "成功しました"
    }
    return new Response(JSON.stringify(res));
  },
};
