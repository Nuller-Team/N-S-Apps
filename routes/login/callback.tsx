import { Handlers, PageProps } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";
import { MongoClient } from "mongoDB/mod.ts";
import { axiod } from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { UserCookieType, UserDataType } from "../../types/db.ts";
import {Env} from "https://deno.land/x/env@v2.2.3/env.js";
const env = new Env();

const CLIENT_ID = env.require("GOOGLE_CLIENT_ID");
const CLIENT_SECRET = env.require("GOOGLE_CLIENT_SECRET");
const REDIRECT_URI = env.require("REDIRECT_URL");
const MONGO_URI = env.require("MONGODB_URL");

const client = new MongoClient();
await client.connect(`${MONGO_URI}?authMechanism=SCRAM-SHA-1`);
const db = client.database("N-S-CAPTCHA");

export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      const url = new URL(req.url);
      const code = url.searchParams.get("code")!;

      const params = new URLSearchParams();
      params.append("client_id", CLIENT_ID);
      params.append("client_secret", CLIENT_SECRET);
      params.append("code", code);
      params.append("grant_type", 'authorization_code');
      params.append('redirect_uri', REDIRECT_URI)

      const {data: res_token} = await axiod.post(`https://accounts.google.com/o/oauth2/token`,params);

      const remember_me_token = crypto.randomUUID();
      const { data: UserInfo } = await axiod.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${res_token.access_token}`,
      );
      const email: string = UserInfo["email"];

      let th = Number(email.slice(-20, -18));
      const school_name = email.slice(-18, -17).toUpperCase();

      if (email.endsWith("@nnn.ed.jp")) {
        let school: UserDataType["school"] = "N";
        if (school_name === "N") {
          th -= 15;
        } else if (school_name === "S") {
          th -= 20;
          school = "S";
        }

        const UserCookieData: UserCookieType = {
          id: UserInfo["id"],
          token: remember_me_token,
        };
        const UserInfoData: UserDataType = {
          id: UserInfo["id"],
          email: UserInfo["email"],
          school: school,
          th: th,
        };

        const User = db.collection<UserDataType>("User");
        const UserCookie = db.collection<UserCookieType>("UserCookie");

        const already_made_user = await User.findOne({ id: UserInfo["id"] });

        if (!already_made_user) {
          await User.insertOne(UserInfoData);
          await UserCookie.insertOne(UserCookieData);
        } else {
          await User.updateOne({ id: UserInfoData.id }, { $set: UserInfoData });
          await UserCookie.updateOne({ id: UserInfoData.id }, {
            $set: UserCookieData,
          });
        }

        const response = new Response("", {
          status: 303,
          headers: {
            Location: "../",
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
            <h1 class="text-2xl font-bold mb-4">N/S高生ではないようです。</h1>
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
