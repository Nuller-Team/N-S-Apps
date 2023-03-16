import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { MongoClient } from "mongoDB/mod.ts";

import type { UserCookieType, UserDataType } from "../types/db.ts";

import {Env} from "https://deno.land/x/env@v2.2.3/env.js";
const env = new Env();

const MONGO_URI = env.require("MONGODB_URL");


const client = new MongoClient();
await client.connect(`${MONGO_URI}?authMechanism=SCRAM-SHA-1`);
const db = client.database("N-S-CAPTCHA");
const User = db.collection<UserDataType>("User");
const UserCookie = db.collection<UserCookieType>("UserCookie");

export const handler: Handlers = {
  async GET(req, ctx) {
    const cookie = getCookies(req.headers);
    if (cookie["remember-me"]) {
      const UserId = await UserCookie.findOne({token: cookie["remember-me"]});
      const UserData = await User.findOne({id: UserId?.id });
      if(UserId) return ctx.render(`${UserData?.school}高等学校${UserData?.th}期生`);
      return ctx.render("default");
    }
    return ctx.render("default");
  },
};

export default function Index({ data }: PageProps<string | UserDataType>) {
  if (data == "default") {
    return (
      <>
        <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h1 class="text-3xl font-bold text-gray-800 mb-8">N/S CAPTCHA</h1>
          <div class="bg-white shadow-md rounded-md p-8 w-full sm:w-[30rem]">
            <div class="mb-6">
              <a
                href="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=3759644925-v0nm19g18f1n069v3tuutsf94p4p3eev.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Flogin%2Fcallback"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center"
              >
                <i class="mr-2"></i> 私はN/S高生です
              </a>
            </div>
            <p class="text-sm text-gray-500 text-center">
              オフ会/エンカなど、リアルに会うときや<br>
              </br>その他本人確認等にお使いください。<br></br>
              なお、このツールは結果を保証するものではありません。
            </p>
          </div>
        </div>
      </>
    );
  }else{
    return (
      <>
        <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h1 class="text-3xl font-bold text-gray-800 mb-8">N/S CAPTCHA</h1>
          <div class="bg-white shadow-md rounded-md p-8 w-full sm:w-[30rem]">
            <div class="mb-6">
              <p
                class="bg-green-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center"
              >
                <i class="mr-2"></i> あなたはN/S高生です
              </p>
            </div>
            <p class="text-sm text-gray-500 text-center">
              <p class="mr-3">あなたの情報：{data}</p>
            </p>
          </div>
        </div>
      </>
    );
  }
}