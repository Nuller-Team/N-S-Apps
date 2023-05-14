import { Handlers, PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";

import Title from "@/components/title.tsx";

import EntryForm from "@/islands/entry.tsx";
import { State } from "./_middleware.ts";
import Head from "../components/Head.tsx";
import Layout from "../components/Layout.tsx";

export const handler: Handlers<any, State> = {
  GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
  },
};

const TITLE = "Nullerに応募する";
const DESCRIPTION = `Nullerは、Discord上で活動する学生による開発チームで、「学生が描く未来」というテーマで、
便利なアプリや面白いゲーム、今までにないツールを作ることに取り組んでいます。
チームメンバーは多様であり、コミュニケーションや協働性の確保にも取り組んでいます。
Nullerの目標は、プログラミングを通じた自己表現や社会貢献です。興味がある方は是非参加してみてください。`;

export default function Entry(props: PageProps<State>) {
  const ogImageUrl = new URL(asset("/ns-app/entry.png"), props.url).href;
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
                  "text-2xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-semibold mb-8 text-center py-20 md:py-36 space-y-2"
                }
              >
                <h1 class={"text-black"}>Nullerに応募する</h1>
                <a
                  href={"/login"}
                  class="bg-blue-500 hover:bg-blue-700 text-white font-black py-2 px-4 rounded text-2xl"
                >
                  ログイン
                </a>
              </div>
              <footer class={"flex justify-center py-10"}>
                <image src="/svg/entry.svg" />
              </footer>
            </div>
            <div class="flex justify-center">
              <img
                class="p-2 rounded-lg shadow-lg w-auto sm:w-96"
                src={"/ns-app/entry.png"}
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
        <Title name={TITLE}>
          <div class="bg-white shadow-md rounded-md p-8 w-full sm:w-[30rem]">
            <EntryForm state={props.data} />
          </div>
        </Title>
      </>
    );
  }else{
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
                <h1 class={"text-red-500"}>Nullerにエントリーすることはできません</h1>
                <a
                  href={"/logout"}
                  class="bg-red-500 hover:bg-red-700 text-white font-black py-2 px-4 rounded text-2xl"
                >
                  ログアウト
                </a>
              </div>
              <footer class={"flex justify-center py-10"}>
                <image src="/svg/entry.svg" />
              </footer>
            </div>
            <div class="flex justify-center">
              <img
                class="p-2 rounded-lg shadow-lg w-auto sm:w-96"
                src={"/ns-app/entry.png"}
              ></img>
            </div>
          </section>
        </Layout>
      </>
    );
  }
}
