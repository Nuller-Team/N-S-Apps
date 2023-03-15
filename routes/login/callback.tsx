import { Handlers, PageProps } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";
import { MongoClient } from "mongoDB/mod.ts";
import { axiod } from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { google } from "npm:googleapis";

import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const env = config();

const CLIENT_ID = env["GOOGLE_CLIENT_ID"];
const CLIENT_SECRET = env["GOOGLE_CLIENT_SECRET"];
const REDIRECT_URI = env["REDIRECT_URL"];

const oauth2Client = new google.auth.OAuth2({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
});

export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      const url = new URL(req.url);
      const code = url.searchParams.get("code")!;

      const { tokens } = await oauth2Client.getToken(code);

      const remember_me_token = crypto.randomUUID();
      const response = new Response("", {
        status: 303,
        headers: {
          Location: `../`,
        },
      });
      const { data: UserInfo } = await axiod(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      );
      const email: string = UserInfo["email"];

      let th = Number(email.slice(-20, -18));
      const school = email.slice(-18, -17).toUpperCase();

      if (email.endsWith("@nnn.ed.jp")) {
        if (school === "N") {
          th -= 15;
        }
        if (school === "S") {
          th -= 20;
        }
        const graduates = school + "高等学校" + th + "期生";
        console.log(graduates);
      } else {
        console.log("N/S高生だと判定できませんでした。");
      }
      const client = new MongoClient();
      await client.connect("mongodb://127.0.0.1:27017");
      const db = client.database("N-S-CAPTCHA");
      return response;
    } catch (e) {
      const response = new Response("", {
        status: 303,
        headers: {
          Location: `../`,
        },
      });
      return response;
    }
  },
};

export default function Callback({ data }: PageProps<null>) {
  return ("");
}
