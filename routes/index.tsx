import { Handlers, PageProps } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import type { State } from "@/types/session.ts";
import Projects, { Project } from "@/components/Projects.tsx";
import apps from "@/data/apps.json" assert { type: "json" };
import Title from "@/components/title.tsx";

import { auth_url } from "@/utils/auth.ts";

export const handler: Handlers<any, State> = {
  GET(req, ctx) {
    if (!ctx.state.token) return ctx.render("default");
    return ctx.render(`${ctx.state.school}高等学校${ctx.state.gen}期生`);
  },
};

const TITLE = "N/S Apps｜N/S高生のためのアプリ";
const DESCRIPTION = `N/S高生の学校生活をより便利にするために作られたアプリたちです。
このツールを使用するにはGoogleアカウントでログインが必要です。`;

export default function Index(props: PageProps<string>) {
  if (props.data == "default") {
    const ogImageUrl = new URL(asset("/home-og.png"), props.url).href;
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
        <Title name="N/S Apps">
          <div class="bg-white shadow-md rounded-md p-8 w-full sm:w-[31rem]">
            <div class="mb-6">
              <a
                href={auth_url}
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
  } else {
    return (
      <>
        <div class="flex flex-col min-h-screen">
          <div class="flex-1">
            <Apps items={apps} />
          </div>
        </div>
      </>
    );
  }
}

function Apps({ items }: { items: Project[] }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <section class="max-w-screen-lg mx-auto my-16 px(4 sm:6 md:8) space-y-4">
        <h2 class="text(3xl gray-600) font-bold">N/S Apps</h2>
        <p class="text-gray-600">
          N/S高生の開発チーム『Nuller』が開発した N/S高生のためのアプリです。
        </p>
        <Projects items={items} class="gap-16" />
      </section>
    </>
  );
}
