import { PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";
import NSverify from "@/islands/ns_verify.tsx";
import { State } from "@/routes/_middleware.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { Handlers } from "@/utils/handler.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
  },
};

const TITLE = "N/S verify";
const DESCRIPTION = `N/S Verifyは、N/S高のエンカなどで、
使用することができる便利アプリです。
N/S高生同士でこの画面を表示し、集まった証拠として、みんなで撮影すれば、
最高の青春を送ることができます！`;

export default function NS_verify(props: PageProps<State>) {
  const ogImageUrl = new URL(asset("/ns-app/apps.png"), props.url).href;
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
                <h1 class={"text-black"}>N/S Verify</h1>
                <h1 class={"text-blue-500 text-5xl md:text-7xl"}>
                  N/S Verify
                </h1>
                <h1 class={"text-black font-bold text-lg md:text-xl"}>
                  エンカをもっと楽しく。
                </h1>
              </div>
              <footer class={"flex justify-center py-10"}>
                <img src="/svg/apps.svg" alt="apps" />
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
          <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 class="text-3xl font-bold text-gray-800 mb-8">
              N/S Verify
            </h1>
            <div class="bg-white shadow-md rounded-md p-8 w-full sm:w-[30rem]">
              <NSverify state={props.data} />
            </div>
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
                <h1 class={"text-red-500"}>
                  このアプリを使うことができません。
                </h1>
              </div>
              <footer class={"flex justify-center py-10"}>
                <img src="/svg/entry.svg" alt="entry" />
              </footer>
            </div>
            <div class="flex justify-center">
              <img
                class="p-2 rounded-lg shadow-lg w-auto sm:w-96"
                src={"/ns-app/entry.png"}
                alt="entry"
              ></img>
            </div>
          </section>
        </Layout>
      </>
    );
  }
}



