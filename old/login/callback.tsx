import { Handlers, PageProps } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";
import { axiod } from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { UserCookieType, UserDataType } from "@/types/db.ts";
import env from "@/utils/env.ts";
import { User, UserCookie } from "@/utils/mongodb.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      const url = new URL(req.url);
      const code = url.searchParams.get("code")!;

      const params = new URLSearchParams();
      params.append("client_id", env.CLIENT_ID);
      params.append("client_secret", env.CLIENT_SECRET);
      params.append("code", code);
      params.append("grant_type", "authorization_code");
      params.append("redirect_uri", `${env.SERVER_URL}/login/callback`);

      const { data: res_token } = await axiod.post(
        `https://accounts.google.com/o/oauth2/token`,
        params
      );

      const remember_me_token = crypto.randomUUID();
      const { data: UserInfo } = await axiod.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${res_token.access_token}`
      );
      const email: string = UserInfo["email"];
      const school_name = email.slice(-18, -17).toUpperCase();

      if (email.endsWith("@nnn.ed.jp")) {
        let gen = Number(email.split("_")[1].slice(0,2));
        let school: UserDataType["school"] = "N";
        if (school_name === "N") {
          gen -= 15;
        } else if (school_name === "S") {
          gen -= 20;
          school = "S";
        }

        const UserCookieData: UserCookieType = {
          id: UserInfo["id"],
          token: remember_me_token,
        };

        const already_made_user = await User.findOne({ id: UserInfo["id"] });

        if (!already_made_user) {
          const UserInfoData: UserDataType = {
            id: UserInfo["id"],
            email: UserInfo["email"],
            school: school,
            gen: gen,
            admission_month: "",
          };
          await User.insertOne(UserInfoData);
          await UserCookie.insertOne(UserCookieData);
        } else {
          const UserInfoData: UserDataType = {
            id: UserInfo["id"],
            email: UserInfo["email"],
            school: school,
            gen: gen,
            admission_month: already_made_user.admission_month ?? "",
          };
          await User.updateOne({ id: UserInfoData.id }, { $set: UserInfoData });
          await UserCookie.updateOne(
            { id: UserInfoData.id },
            {
              $set: UserCookieData,
            }
          );
        }

        const state = url.searchParams.get("state");

        const response = new Response("", {
          status: 303,
          headers: {
            Location: `../${state ?? ""}`,
          },
        });

        setCookie(response.headers, {
          name: "remember-me",
          value: remember_me_token,
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          path: "/",
        });
        return response;
      } else if (email.endsWith("@n-jr.jp")) {
        let gen = Number(email.split("_")[1].slice(0,2));
        const UserCookieData: UserCookieType = {
          id: UserInfo["id"],
          token: remember_me_token,
        };

        const already_made_user = await User.findOne({ id: UserInfo["id"] });

        if (!already_made_user) {
          const UserInfoData: UserDataType = {
            id: UserInfo["id"],
            email: UserInfo["email"],
            school: "NJR",
            gen: gen,
            admission_month: "",
          };
          await User.insertOne(UserInfoData);
          await UserCookie.insertOne(UserCookieData);
        } else {
          const UserInfoData: UserDataType = {
            id: UserInfo["id"],
            email: UserInfo["email"],
            school: "NJR",
            gen: gen,
            admission_month: already_made_user.admission_month ?? "",
          };
          await User.updateOne({ id: UserInfoData.id }, { $set: UserInfoData });
          await UserCookie.updateOne(
            { id: UserInfoData.id },
            {
              $set: UserCookieData,
            }
          );
        }

        const state = url.searchParams.get("state");

        const response = new Response("", {
          status: 303,
          headers: {
            Location: `../${state ?? ""}`,
          },
        });

        setCookie(response.headers, {
          name: "remember-me",
          value: remember_me_token,
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          path: "/",
        });
        return response;
      } else {
        return ctx.render("ERROR2");
      }
    } catch (e) {
      return ctx.render("ERROR");
    }
  },
};

export default function Callback({ data }: PageProps<string>) {
  if (data == "ERROR") {
    return (
      <>
        <div class="flex items-center justify-center h-screen bg-gray-50">
          <div class="bg-white items-center p-8 rounded-md shadow-md w-full sm:w-96">
            <h1 class="text-2xl font-bold mb-4">エラーが発生しました。</h1>
            <p class="text-gray-500 mb-4">
              内部でエラーが発生しました。<br></br>再度お試しください。
            </p>
            <a
              href="/"
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Go back to home
            </a>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div class="flex items-center justify-center h-screen bg-gray-50">
          <div class="bg-white items-center p-8 rounded-md shadow-md w-full sm:w-96">
            <h1 class="text-2xl font-bold mb-4">N/S高生<br></br>N中等部ではないようです。</h1>
            <a
              href="/"
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Go back to home
            </a>
          </div>
        </div>
      </>
    );
  }
}