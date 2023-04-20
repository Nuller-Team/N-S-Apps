import { Handlers, PageProps } from "$fresh/server.ts";
import type { State } from "@/types/session.ts";
import TIMES from "../islands/grad_timer.tsx";
import { auth_url } from "../utils/auth.ts";
import { asset, Head } from "$fresh/runtime.ts";

import Title from "@/components/title.tsx";

export const handler: Handlers<any, State> = {
  GET(req, ctx) {
    if (!ctx.state.token) return ctx.render();
    return ctx.render(ctx.state);
  },
};

const TITLE = "N/S Grad Timer｜N/S高を卒業するまで何秒？";
const DESCRIPTION = `N/S高を卒業するまであと何秒かを確認することができます。
このツールを使用するにはGoogleアカウントでログインが必要です。`;

export default function Times(props: PageProps<State | undefined>) {
  const ogImageUrl = new URL(asset("/ns-app/grad_timer.png"), props.url).href;
  if (!props.data?.email) {
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
        <Title name="N/S Times Left">
          <div class="bg-white shadow-md rounded-md p-8 w-full sm:w-[31rem]">
            <div class="mb-6">
              <a
                href={auth_url + "&state=grad_timer"}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center"
              >
                <i class="mr-2"></i> 私はN/S高生です
              </a>
            </div>
            <p class="text-sm text-gray-500 text-center">
              N/S高生の開発チーム
              <a href="https://nuller.net">『Nuller』</a>が開発した、<br></br>
              N/S高での学校生活をより便利にする為に作られたアプリたちです。
              <br></br>
              N/S高生以外は使うことができません。
            </p>
          </div>
        </Title>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <div class="flex justify-center items-center h-screen">
        <TIMES state={props.data} />
      </div>
    </>
  );
}
