import { PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";
import { State } from "@/routes/_middleware.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { Handlers } from "@/utils/handler.ts";
import PROFILE from "@/islands/profile-app.tsx";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
  },
};

const TITLE = "N/S Profile｜あなただけのプロフィールを";
const DESCRIPTION = `N/S Profileは、Twitterなどで使える、自己紹介画像を簡単に作成するアプリです。
様々なデザインを使ってあなただけのプロフィールを作成しましょう！
このツールを使用するにはGoogleアカウントでログインが必要です。`;

export default function Profile(props: PageProps<State>) {
  const ogImageUrl = new URL(asset("/ns-app/verify.png"), props.url).href;
  if (!props.data.user?.id) {
    return (
      <>
        <Head
          title={TITLE}
          description={DESCRIPTION}
          href={props.url.href}
          imageUrl={ogImageUrl}
        />
        <Layout state={props.data}>
          <section class="bg-white">
            <div class="container mx-auto px-60">
              <div
                class={
                  "text-2xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-semibold mb-8 text-center py-20 md:py-36 space-y-2"
                }
              >
                <h1 class={"text-sky-500 text-5xl md:text-7xl"}>N/S Verify</h1>
                <h1 class={"text-black font-bold text-lg md:text-xl"}>
                  エンカをもっと楽しく
                </h1>
              </div>
              <footer class={"flex justify-center py-10"}>
                <img src="/svg/verify.svg" alt="verify" />
              </footer>
            </div>
            <div class="flex justify-center">
              <img
                class="p-2 rounded-lg shadow-lg w-auto sm:w-96"
                src={"/ns-app/verify.png"}
                alt="verify"
              ></img>
            </div>
          </section>
        </Layout>
      </>
    );
  } else {
    return (
      <>
        <Head
          title={TITLE}
          description={DESCRIPTION}
          href={props.url.href}
          imageUrl={ogImageUrl}
        />
        <Layout state={props.data}>
          <div class="bg-gray-100">
            <PROFILE />
          </div>
        </Layout>
      </>
    );
  }
}
