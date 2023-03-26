import { Handlers, PageProps } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import env from "@/utils/env.ts";
import type { State } from "@/types/session.ts";

import Title from "@/components/title.tsx";

import TOKEN from "@/islands/token.tsx";

export const handler: Handlers<any, State> = {
  GET(req, ctx) {
    if (!ctx.state.token) return ctx.render("default");
    return ctx.render(`${ctx.state.school}高等学校${ctx.state.gen}期生`);
  },
};

export default function Checker(props: PageProps<string>) {
  const auth_url =
    `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=3759644925-v0nm19g18f1n069v3tuutsf94p4p3eev.apps.googleusercontent.com&redirect_uri=${env.SERVER_URL}/login/callback`;
  if (props.data == "default") {
    const ogImageUrl = new URL(asset("/ns-app/.png"), props.url).href;
    const TITLE = "N/S Checker｜私はN/S高生です";
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
        <Title name="N/S Checker">
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
        <Title name="N/S CAPTCHA">
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
            <TOKEN />
          </div>
        </Title>
      </>
    );
  }
}

