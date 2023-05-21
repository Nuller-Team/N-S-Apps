import { PageProps } from "$fresh/server.ts";
import CAMPUSALERT from "@/islands/campus_alert.tsx";
import { State } from "@/routes/_middleware.ts";
import Head from "@/components/Head.tsx";
import { asset } from "$fresh/runtime.ts";
import Layout from "@/components/Layout.tsx";
import { Handlers } from "@/utils/handler.ts";
import links from "@/data/campus-alert.json" assert { type: "json" };

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
  },
};

const TITLE =
  "N/S Campus Alert｜N/S高のキャンパスに警報が出ているかを簡単に確認";
const DESCRIPTION = `N/S高の全キャンパスの気象等による注意報,警報,特別警報が出ているかを確認することができます。
このツールを使用するにはGoogleアカウントでログインが必要です。`;

export default function CampusAlert(props: PageProps<State>) {
  const ogImageUrl = new URL(asset("/ns-app/campus-alert.png"), props.url).href;
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
                <h1 class={"text-red-400 text-5xl md:text-7xl"}>
                  N/S Campus Alert
                </h1>
                <h1 class={"text-black font-bold text-lg md:text-xl"}>
                N/S高のキャンパスに警報が出ているかを簡単に確認
                </h1>
              </div>
              <footer class={"flex justify-center py-10"}>
                <img src="/svg/campus-alert.svg" />
              </footer>
            </div>
            <div class="flex justify-center">
              <img
                class="p-2 rounded-lg shadow-lg w-auto sm:w-96"
                src={"/ns-app/campus-alert.png"}
              ></img>
            </div>
          </section>
        </Layout>
      </>
    )
  }else if (props.data.active == "enabled") {
    return (
      <>
        <Head
          title={TITLE}
          description={DESCRIPTION}
          href={props.url.href}
          imageUrl={ogImageUrl}
        />
        <Layout state={props.data}>
      <div class={"font-semibold mb-8 text-center py-14 md:py-24 space-y-2"}>
        <h1 class={"text-red-400 text-5xl md:text-7xl"}>N/S Campus Alert</h1>
        <h1 class={"text-black font-bold text-lg md:text-xl"}>
          N/S高のキャンパスに警報が出ているかを簡単に確認
        </h1>
      </div>
      <CAMPUSALERT state={props.data} links={links} />
        </Layout>
      </>
    )
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
                <image src="/svg/campus-alert.svg" />
              </footer>
            </div>
            <div class="flex justify-center">
              <img
                class="p-2 rounded-lg shadow-lg w-auto sm:w-96"
                src={"/ns-app/campus-alert.png"}
              ></img>
            </div>
          </section>
        </Layout>
      </>
    );
  }
}
