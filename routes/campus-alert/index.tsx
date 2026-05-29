import CAMPUSALERT from "@/islands/campus-alert.tsx";
import links from "@/data/campus-alert.json" with { type: "json" };
import { Handlers } from "fresh/compat";
import { State } from "@/routes/_middleware.ts";
import Head from "@/components/Head.tsx";
import { asset } from "fresh/runtime";
import Layout from "@/components/Layout.tsx";

export const handler: Handlers<State, State> = {
  GET(ctx) {
    return ctx.render(<CampusAlertIndex {...ctx.state} url={ctx.req.url} />);
  },
};

const TITLE =
  "N/S Campus Alert｜N/S高のキャンパスに警報が出ているかを簡単に確認";
const DESCRIPTION =
  `N/S高の全キャンパスの気象等による注意報,警報,特別警報が出ているかを確認することができます。
このツールを使用するにはGoogleアカウントでログインが必要です。`;

export default function CampusAlertIndex(props: State & { url: string }) {
  const url = new URL(props.url);
  const ogImageUrl = new URL(asset("/ns-app/campus-alert.png"), url).href;
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
                <h1 class="text-red-400 text-5xl md:text-7xl">
                  N/S Campus Alert
                </h1>
                <h1 class="text-black font-bold text-lg md:text-xl">
                  N/S高のキャンパスに警報が出ているかを簡単に確認
                </h1>
              </div>
              <footer class="flex justify-center py-10">
                <img src="/svg/campus-alert.svg" />
              </footer>
            </div>
            <div class="flex justify-center">
              <img
                class="p-2 rounded-lg shadow-lg w-auto sm:w-96"
                src={"/ns-app/campus-alert.png"}
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
          <div class="bg-gray-50 py-14 md:py-24">
            <div class="text-center mb-8 space-y-4">
              <h1 class="text-red-500 text-5xl md:text-7xl font-bold">
                N/S Campus Alert
              </h1>
              <h2 class="text-black text-lg md:text-xl font-semibold">
                N/S高のキャンパスに警報が出ているかを簡単に確認
              </h2>
            </div>
          </div>
          <CAMPUSALERT links={links} href={url.href} />
        </Layout>
      </>
    );
  }
}
