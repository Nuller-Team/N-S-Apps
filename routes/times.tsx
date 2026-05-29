import TIMES from "@/islands/times.tsx";
import { State } from "@/routes/_middleware.ts";
import Head from "@/components/Head.tsx";
import { asset } from "fresh/runtime";
import Layout from "@/components/Layout.tsx";
import { Handlers } from "fresh/compat";

export const handler: Handlers<State, State> = {
  GET(ctx) {
    return ctx.render(<Times {...ctx.state} url={ctx.req.url} />);
  },
};

const TITLE = "N/S Times｜N/S高に入ってから何秒？";
const DESCRIPTION =
  `N/S高に入学してから何秒経過しているかを確認することができます。
このツールを使用するにはGoogleアカウントでログインが必要です。`;

export default function Times(props: State & { url: string }) {
  const url = new URL(props.url);
  const ogImageUrl = new URL(asset("/ns-app/times.png"), url).href;
  if (!props.user?.id) {
    return (
      <>
        <Head
          title={TITLE}
          description={DESCRIPTION}
          href={url.href}
          imageUrl={ogImageUrl}
        />
        <Layout state={props}>
          <section class="bg-white py-12">
            <div class="container mx-auto px-4">
              <div class="font-semibold mb-8 text-center py-20 md:py-36 space-y-2">
                <h1 class="text-yellow-500 text-5xl md:text-7xl">
                  N/S Times
                </h1>
                <h1 class="text-black font-bold text-lg md:text-xl">
                  N/S高に入ってから何秒経過していますか？
                </h1>
              </div>
              <footer class="flex justify-center py-10">
                <img src="/svg/times.svg" />
              </footer>
            </div>
            <div class="flex justify-center">
              <img
                class="p-2 rounded-lg shadow-lg w-auto sm:w-96"
                src={"/ns-app/times.png"}
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
          href={url.href}
          imageUrl={ogImageUrl}
        />
        <Layout state={props}>
          <div class="flex justify-center items-center h-screen">
            <TIMES state={props} />
          </div>
        </Layout>
      </>
    );
  }
}
