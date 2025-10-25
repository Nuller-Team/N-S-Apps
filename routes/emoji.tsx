import { PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";
import { State } from "@/routes/_middleware.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { Handlers } from "@/utils/handler.ts";
import Emoji from "@/islands/emoji.tsx";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
  },
};

const TITLE = "N/S Emoji｜簡単に絵文字を作ろう";
const DESCRIPTION = `N/S Emojiは、Slackなどで使える絵文字を簡単に生成できます。
このツールを使用するにはGoogleアカウントでログインが必要です。`;

export default function Profile(props: PageProps<State>) {
  const ogImageUrl = new URL(asset("/ns-app/emoji.png"), props.url).href;
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
          <section class="bg-white py-12">
            <div class="container mx-auto px-4">
              <div
                class="font-semibold mb-8 text-center py-20 md:py-36 space-y-2"
              >
                <h1 class="text-sky-300 text-5xl md:text-7xl">
                  N/S Emoji
                </h1>
                <h1 class="text-black font-bold text-lg md:text-xl">
                  簡単に絵文字作ろう
                </h1>
              </div>
              <footer class="flex justify-center py-10">
                <img src="/svg/emoji.svg" alt="verify" />
              </footer>
            </div>
            <div class="flex justify-center">
              <img
                class="p-2 rounded-lg shadow-lg w-auto sm:w-96"
                src={"/ns-app/emoji.png"}
                alt="verify"
              >
              </img>
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
            <div class="space-y-2 py-14 font-semibold mb-8 text-center md:py-24 bg-white">
              <h1 class="text-green-400 text-5xl md:text-7xl">N/S Emoji</h1>
              <h1 class="text-black text-lg font-bold md:text-xl">
                簡単に絵文字を作ろう
              </h1>
            </div>
            <Emoji />
          </div>
        </Layout>
      </>
    );
  }
}
