import { asset } from "fresh/runtime";
import PAGES from "@/islands/pages.tsx";
import links from "@/data/pages.json" with { type: "json" };
import { State } from "@/routes/_middleware.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { Handlers } from "fresh/compat";
import DisabledApp from "@/components/DisabledApp.tsx";
import Alert from "@/components/Alert.tsx";

export const handler: Handlers<State, State> = {
  GET(ctx) {
    return ctx.render(<Pages {...ctx.state} url={ctx.req.url} />);
  },
};

const TITLE = "N/S Pages｜N/S高でよく使うページまとめ";
const DESCRIPTION = `N/S高でよく使うページやアプリをまとめています。
このツールを使用するにはGoogleアカウントでログインが必要です。`;

export default function Pages(props: State & { url: string }) {
  const url = new URL(props.url);
  const ogImageUrl = new URL(asset("/ns-app/pages.png"), url).href;
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
          <Alert message="このサービスは2025年10月25日で提供を終了しました。アーカイブとして表示しています。" />
          <section class="bg-white py-12">
            <div class="container mx-auto px-4">
              <div class="font-semibold mb-8 text-center py-20 md:py-36 space-y-2">
                <h1 class="text-orange-300 text-5xl md:text-7xl">
                  N/S Pages
                </h1>
                <h1 class="text-black font-bold text-lg md:text-xl">
                  N/S高でよく使うページやアプリをまとめています
                </h1>
              </div>
              <footer class="flex justify-center py-10">
                <img src="/svg/pages.svg" />
              </footer>
            </div>
            <div class="flex justify-center">
              <img
                class="p-2 rounded-lg shadow-lg w-auto sm:w-96"
                src={"/ns-app/pages.png"}
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
          <DisabledApp
            title="N/S Pages"
            url={url.href}
            state={props}
          />
        </Layout>
      </>
    );
  }
}
