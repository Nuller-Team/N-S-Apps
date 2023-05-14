import { Handlers, PageProps } from "$fresh/server.ts";
import TIMES from "../islands/grad_timer.tsx";
import { State } from "./_middleware.ts";
import Head from "../components/Head.tsx";
import { asset } from "https://deno.land/x/fresh@1.1.5/runtime.ts";
import Layout from "../components/Layout.tsx";

export const handler: Handlers<any, State> = {
  GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
  },
};

const TITLE = "N/S Grad Timer｜N/S高を卒業するまで何秒？";
const DESCRIPTION = `N/S高を卒業するまであと何秒かを確認することができます。
このツールを使用するにはGoogleアカウントでログインが必要です。`;

export default function GradTimer(props: PageProps<State>) {
  const ogImageUrl = new URL(asset("/ns-app/grad-timer.png"), props.url).href;
  if (props.data.active == "Not logged in") {
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
                class={
                  "font-semibold mb-8 text-center py-20 md:py-36 space-y-2"
                }
              >
                <h1 class={"text-pink-400 text-5xl md:text-7xl"}>
                  N/S Grad Timer
                </h1>
                <h1 class={"text-black font-bold text-lg md:text-xl"}>
                  N/S高を卒業するまであと何秒？
                </h1>
              </div>
              <footer class={"flex justify-center py-10"}>
                <img src="/svg/grad-timer.svg" />
              </footer>
            </div>
            <div class="flex justify-center">
              <img
                class="p-2 rounded-lg shadow-lg w-auto sm:w-96"
                src={"/ns-app/grad-timer.png"}
              ></img>
            </div>
          </section>
        </Layout>
      </>
    );
  } else if (props.data.active == "enabled") {
    return (
      <>
        <Head
          title={TITLE}
          description={DESCRIPTION}
          href={props.url.href}
          imageUrl={ogImageUrl}
        />
        <Layout state={props.data}>
          <div class="flex justify-center items-center h-screen">
            <TIMES state={props.data} />
          </div>
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
          <section class="bg-white py-12">
            <div class="container mx-auto px-4">
              <div
                class={
                  "text-2xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-semibold mb-8 text-center py-20 md:py-36 space-y-2"
                }
              >
                <h1 class={"text-black"}>あなたはN/S高生ではないため</h1>
                <h1 class={"text-red-500"}>アプリを使うことはできません</h1>
                <a
                  href={"/logout"}
                  class="bg-red-500 hover:bg-red-700 text-white font-black py-2 px-4 rounded text-2xl"
                >
                  ログアウト
                </a>
              </div>
              <footer class={"flex justify-center py-10"}>
                <image src="/svg/grad-timer.svg" />
              </footer>
            </div>
            <div class="flex justify-center">
              <img
                class="p-2 rounded-lg shadow-lg w-auto sm:w-96"
                src={"/ns-app/grad-timer.png"}
              ></img>
            </div>
          </section>
        </Layout>
      </>
    );
  }
}
