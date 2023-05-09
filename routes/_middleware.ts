import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { supabase, supabaseAdminClient } from "@/utils/supabase.ts";
import { getCookies } from "std/http/cookie.ts";
import { Database } from "../utils/supabase_types.ts";

export interface State {
  user: {
    id: string;
    email: string;
    name: string;
    school: {
      name: "N" | "S" | "NJR"
      gen: number;
      admission_month: "4" | "7" | "10" | "1" | "";
    };
    avatar_url: string;
    access_token: string;
  };
  active: "enabled" | "disabled" | "Not logged in";
}

export const handler = async (
  req: Request,
  ctx: MiddlewareHandlerContext<State>
) => {
  const cookies = getCookies(req.headers);
  const access_token = cookies["supabase-access-token"];

  if (access_token) {
    const { data } = await supabase.auth.getUser(access_token);

    if (!data.user) {
      ctx.state.active == "Not logged in";
      return ctx.next();
    }
    const { data: dbData } = await supabaseAdminClient
      .from("user")
      .select()
      .eq("auth_id", data.user.id)
      .single();
    if (!dbData) {
      const school_name = data.user.email?.slice(-18, -17).toUpperCase();
      if (data.user.email?.endsWith("@nnn.ed.jp")) {
        let gen = Number(data.user.email.split("_")[1].slice(0, 2));
        let school: Database["public"]["Tables"]["user"]["Insert"]["school"] =
          "N";
        if (school_name === "N") {
          gen -= 15;
        } else if (school_name === "S") {
          gen -= 20;
          school = "S";
        }
        await supabaseAdminClient
          .from("user")
          .insert({
            auth_id: data.user.id,
            gen,
            school,
          })
          .throwOnError();
        ctx.state.user = {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.full_name,
          avatar_url: data.user.user_metadata?.avatar_url,
          school: {
            name: school,
            gen: gen,
            admission_month: "",
          },
          access_token,
        };
        ctx.state.active = "enabled";
      } else if (data.user.email?.endsWith("@n-jr.jp")) {
        const gen = Number(data.user.email.split("_")[1].slice(0, 2));
        await supabaseAdminClient.from("user").insert({
          auth_id: data.user.id,
          gen,
          school: "NJR",
        });
        ctx.state.user = {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.full_name,
          avatar_url: data.user.user_metadata?.avatar_url,
          school: {
            name: "NJR",
            gen: gen,
            admission_month: "",
          },
          access_token,
        };
        ctx.state.active = "enabled";
      }else{
        ctx.state.active = "disabled";
      }
      return ctx.next();
    }
    //--データがある場合の処理--
    ctx.state.user = {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata?.full_name,
      avatar_url: data.user.user_metadata?.avatar_url,
      school: {
        name: dbData?.school!,
        gen: dbData?.gen!,
        admission_month: dbData?.admission_month ?? "",
      },
      access_token,
    };
    ctx.state.active = "enabled";
  }
  return ctx.next();
};
