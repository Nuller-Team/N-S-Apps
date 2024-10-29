import { PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";
import { State } from "@/routes/_middleware.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { Handlers } from "@/utils/handler.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
  },
};
const TITLE = "N/S Apps｜もっと、いろんなデバイスで";
const DESCRIPTION =
  `N/S Appsをインストールする手順を公開しているページです。このページにアクセスする場合は、ログインは不要です。`;

export default function Inst(props: PageProps<State>) {
  const ogImageUrl = new URL(asset("/ns-app/apps.png"), props.url).href;
  return (
    <>
      <Head
        title={TITLE}
        description={DESCRIPTION}
        href={props.url.href}
        imageUrl={ogImageUrl}
      />
      <Layout state={props.data}>
        <body class="bg-gray-100">
          <div class="flex flex-wrap justify-center">
            <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 space-y-4">
              <h1 class="text-2xl font-bold">
                N/S Apps for mobile インストール方法
              </h1>
              <p class="text-2xl m-2">iPhone（Safari）の場合</p>
              <div class="bg-white rounded-lg shadow-md flex p-10 justify-beetween items-center">
                <img
                  class="w-10 h-10"
                  src="guide/share.png"
                  alt="Share Icon"
                >
                </img>
                <div class="p-4">
                  <p>シェアボタンをタップします。</p>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-md flex p-10 justify-beetween items-center">
                <img
                  class="w-10 h-10"
                  src="guide/plus.png"
                  alt="Plus Icon"
                >
                </img>
                <div class="p-4">
                  <p>
                    上にスワイプして、「ホーム画面に追加」をタップし、「追加」をタップします。
                  </p>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-md flex p-10 justify-beetween items-center">
                <img class="w-10" src="icon/512.png" alt="N/S Apps Icon" />
                <div class="p-4">
                  <p>N/S Appsを起動します。</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap justify-center">
            <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 space-y-4">
              <p class="text-2xl m-2">Android（Chrome）の場合</p>
              <div class="bg-white rounded-lg shadow-md flex p-10 justify-beetween items-center">
                <img
                  class="w-10 h-10"
                  src="guide/3.png"
                  alt="3point Icon"
                >
                </img>
                <div class="p-4">
                  <p>3点リーダーをタップします。</p>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-md flex p-10 justify-beetween items-center">
                <img
                  class="w-10 h-10"
                  src="guide/in.png"
                  alt="install Icon"
                >
                </img>
                <div class="p-4">
                  <p>「アプリをインストール」をタップします。</p>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-md flex p-10 justify-beetween items-center">
                <img class="w-10" src="icon/512.png" alt="N/S Apps Icon" />
                <div class="p-4">
                  <p>N/S Appsを「インストール」します。</p>
                </div>
              </div>
            </div>
          </div>
        </body>
      </Layout>
    </>
  );
}
