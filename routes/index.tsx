import { Handlers, PageProps } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import { getCookies } from "std/http/cookie.ts";
import { User, UserCookie } from "@/utils/mongodb.ts";
import env from "@/utils/env.ts";

import Title from "@/components/title.tsx";

import TOKEN from "@/islands/token.tsx";

import type { UserDataType } from "@/types/db.ts";
export const handler: Handlers = {
  async GET(req, ctx) {
    const cookie = getCookies(req.headers);
    if (cookie["remember-me"]) {
      const UserId = await UserCookie.findOne({ token: cookie["remember-me"] });
      const UserData = await User.findOne({ id: UserId?.id });
      if (UserId) {
        return ctx.render(`${UserData?.school}高等学校${UserData?.gen}期生`);
      }
      return ctx.render("default");
    }
    return ctx.render("default");
  },
};

export default function Index(props: PageProps<string | UserDataType>) {
  const auth_url =
    `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=3759644925-v0nm19g18f1n069v3tuutsf94p4p3eev.apps.googleusercontent.com&redirect_uri=${env.SERVER_URL}/login/callback`;
  if (props.data == "default") {
    const ogImageUrl = new URL(asset("/home-og.png"), props.url).href;
    const TITLE = "N/S Captcha｜私はN/S高生です";
    const DESCRIPTION =
      `エンカ時やオフ会等でN/S高生かどうか、本人確認をすることができます。
  このツールを使用するにはGoogleアカウントでログインが必要です。`;
    return (
      <>
        <Head>
          <title>{TITLE}</title>
          <meta
            name="description"
            content={DESCRIPTION}
          />
          <meta property="og:title" content={TITLE} />
          <meta property="og:type" content="website" />
          <meta property="og:description" content={DESCRIPTION} />
          <meta property="og:url" content={props.url.href} />
          <meta property="og:image" content={ogImageUrl} />
        </Head>
        <Title>
          <div class="bg-white shadow-md rounded-md p-8 w-full sm:w-[30rem]">
            <div class="mb-6">
              <a
                href={auth_url}
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
        </Title>
      </>
    );
  } else {
    return (
      <>
        <Title>
          <div class="bg-white shadow-md rounded-md p-8 w-full sm:w-[30rem]">
            <div class="mb-6">
              <p class="bg-green-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center">
                <i class="mr-2"></i> あなたはN/S高生です
              </p>
            </div>
            <p class="text-sm text-gray-500 text-center">
              <p class="mr-3">あなたの情報：{props.data}</p>
            </p>
          </div>
          <div class="p-4"></div>
          <div class="bg-white shadow-md rounded-md p-8 w-full sm:w-[30rem]">
            <TOKEN></TOKEN>
          </div>
        </Title>
      </>
    );
  }
}
