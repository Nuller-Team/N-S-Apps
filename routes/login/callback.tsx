import { Handlers, PageProps } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";
import { MongoClient } from "mongoDB/mod.ts";
import { axiod } from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { google } from "https://esm.sh/googleapis";

import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import { UserCookieType, UserDataType } from "../../types/db.ts";

const env = config();

const CLIENT_ID = env["GOOGLE_CLIENT_ID"];
const CLIENT_SECRET = env["GOOGLE_CLIENT_SECRET"];
const REDIRECT_URI = env["REDIRECT_URL"];

const oauth2Client = new google.auth.OAuth2({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
});

const client = new MongoClient();
await client.connect("mongodb://127.0.0.1:27017");
const db = client.database("N-S-CAPTCHA");

export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      const url = new URL(req.url);
      const code = url.searchParams.get("code")!;

      const { tokens } = await oauth2Client.getToken(code);

      const remember_me_token = crypto.randomUUID();
      const { data: UserInfo } = await axiod(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
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
      console.log(e);
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
