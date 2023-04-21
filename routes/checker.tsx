import { Handlers, PageProps } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import type { State } from "@/types/session.ts";

import Title from "@/components/title.tsx";

import TOKEN from "@/islands/token.tsx";

import { auth_url } from "@/utils/auth.ts";

export const handler: Handlers<any, State> = {
  GET(req, ctx) {
    if (!ctx.state.token) return ctx.render();
    return ctx.render(ctx.state);
  },
};

const TITLE = "N/S Checker｜私はN/S高生、N中等部です";
const DESCRIPTION = `エンカ時やオフ会等でN/S高生かどうか、本人確認をすることができます。
このツールを使用するにはGoogleアカウントでログインが必要です。`;

export default function Checker(props: PageProps<State | undefined>) {
  if (!props.data?.email) {
    const ogImageUrl = new URL(asset("/ns-app/apps.png"), props.url).href;
    return (
      <>
        <Head>
          <title>{TITLE}</title>
          <meta name="description" content={DESCRIPTION} />
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
                href={auth_url + "&state=checker"}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center"
              >
                <i class="mr-2"></i> 私はN/S高生、N中等部です
              </a>
            </div>
            <p class="text-sm text-gray-500 text-center">
              オフ会/エンカなど、リアルに会うときや<br></br>
              その他本人確認等にお使いください。<br></br>
              なお、このツールは結果を保証するものではありません。
            </p>
          </div>
        </Title>
      </>
    );
  }else if (props.data.school == "NJR"){
    return (
      <>
        <Head>
          <title>{TITLE}</title>
        </Head>
        <Title name="N/S Checker">
          <div class="bg-white shadow-md rounded-md p-8 w-full sm:w-[30rem]">
            <div class="mb-6">
              <p class="bg-green-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center">
                <i class="mr-2"></i> あなたはN中等部生です
              </p>
            </div>
            <p class="text-sm text-gray-500 text-center">
              <p class="mr-3">あなたの情報：N中等部 20{props.data.gen}年度入学</p>
            </p>
          </div>
          <div class="p-4"></div>
          <div class="bg-white shadow-md rounded-md p-8 w-full sm:w-[30rem]">
            <TOKEN />
          </div>
        </Title>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>{TITLE}</title>
        </Head>
        <Title name="N/S Checker">
          <div class="bg-white shadow-md rounded-md p-8 w-full sm:w-[30rem]">
            <div class="mb-6">
              <p class="bg-green-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center">
                <i class="mr-2"></i> あなたは{props.data.school}高生です
              </p>
            </div>
            <p class="text-sm text-gray-500 text-center">
              <p class="mr-3">あなたの情報：{props.data.school}高等学校{props.data.gen}期生</p>
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
