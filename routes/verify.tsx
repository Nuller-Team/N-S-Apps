import { asset } from "fresh/runtime";
import { State } from "@/routes/_middleware.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { Handlers } from "fresh/compat";

export const handler: Handlers<State, State> = {
  GET(ctx) {
    return ctx.render(<Verify {...ctx.state} url={ctx.req.url} />);
  },
};

const TITLE = "N/S Verify｜エンカをもっと楽しく";
const DESCRIPTION = `N/S Verifyは、N/S高のエンカなどで、
使用することができる便利アプリです。
N/S高生同士でこの画面を表示し、集まった証拠として、みんなで撮影すれば、
最高の青春を送ることができます！
このツールを使用するにはGoogleアカウントでログインが必要です。`;

export default function Verify(props: State & { url: string }) {
  const url = new URL(props.url);
  const ogImageUrl = new URL(asset("/ns-app/verify.png"), url).href;
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
              <div class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-semibold mb-8 text-center py-20 md:py-36 space-y-2">
                <h1 class="text-sky-500 text-5xl md:text-7xl">N/S Verify</h1>
                <h1 class="text-black font-bold text-lg md:text-xl">
                  エンカをもっと楽しく
                </h1>
              </div>
              <footer class="flex justify-center py-10">
                <img src="/svg/verify.svg" alt="verify" />
              </footer>
            </div>
            <div class="flex justify-center">
              <img
                class="p-2 rounded-lg shadow-lg w-auto sm:w-96"
                src={"/ns-app/verify.png"}
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
          href={url.href}
          imageUrl={ogImageUrl}
        />
        <Layout state={props}>
          <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 class="text-3xl font-bold text-gray-800 mb-8">N/S Verify</h1>
            <div class="bg-white shadow-md rounded-md p-8 w-full sm:w-[30rem]">
              <div class="flex justify-center items-center mt-10 w-100">
                <img
                  src={props.user?.avatarUrl}
                  class="rounded-full"
                >
                </img>
              </div>
              <div class="text-center mt-5">
                <h1 class="text-2xl font-bold">🎉あなたはN/S高生です🎉</h1>
                <p class="text-gray-500 mt-2">
                  {props.user?.school.name}高等学校
                  {props.user?.school.gen}期生
                </p>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}
