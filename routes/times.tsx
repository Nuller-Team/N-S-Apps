import { Handlers, PageProps } from "$fresh/server.ts";
import TIMES from "../islands/times.tsx";
import { State } from "./_middleware.ts";
import Head from "../components/Head.tsx";
import { asset } from "https://deno.land/x/fresh@1.1.5/runtime.ts";
import Layout from "../components/Layout.tsx";

export const handler: Handlers<any, State> = {
  GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
  },
};

const TITLE = "N/S Times｜N/S高に入ってから何秒？";
const DESCRIPTION = `N/S高に入学してから何秒経過しているかを確認することができます。
このツールを使用するにはGoogleアカウントでログインが必要です。`;

export default function Times(props: PageProps<State>) {
  const ogImageUrl = new URL(asset("/ns-app/times.png"), props.url).href;
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
                <h1 class={"text-yellow-500 text-5xl md:text-7xl"}>
                  N/S Times
                </h1>
                <h1 class={"text-black font-bold text-lg md:text-xl"}>
                  N/S高に入ってから何秒経過していますか？
                </h1>
              </div>
              <footer class={"flex justify-center py-10"}>
                <img src="/svg/times.svg" />
              </footer>
            </div>
            <div class="flex justify-center">
              <img
                class="p-2 rounded-lg shadow-lg w-auto sm:w-96"
                src={"/ns-app/times.png"}
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

              </div>
              <footer class={"flex justify-center py-10"}>
                <image src="/svg/times.svg" />
              </footer>
            </div>
            <div class="flex justify-center">
              <img
                class="p-2 rounded-lg shadow-lg w-auto sm:w-96"
                src={"/ns-app/times.png"}
              ></img>
            </div>
          </section>
        </Layout>
      </>
    );
  }
}
