import { PageProps } from "fresh";
import TIMES from "@/islands/grad_timer.tsx";
import { State } from "@/routes/_middleware.ts";
import Head from "@/components/Head.tsx";
import { asset } from "fresh/runtime";
import Layout from "@/components/Layout.tsx";
import { Handlers } from "fresh/compat";

const TITLE = "N/S Grad Timer｜N/S高を卒業するまで何秒？";
const DESCRIPTION = `N/S高を卒業するまであと何秒かを確認することができます。
このツールを使用するにはGoogleアカウントでログインが必要です。`;

export const handler: Handlers<State, State> = {
  GET(ctx) {
    return ctx.render(<GradTimer {...ctx.state} url={ctx.req.url} />);
  },
};

export default function GradTimer(
  props: State & { url: string },
) {
  const url = new URL(props.url);
  const ogImageUrl = new URL(asset("/ns-app/grad-timer.png"), url).href;
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
                <h1 class="text-pink-400 text-5xl md:text-7xl">
                  N/S Grad Timer
                </h1>
                <h1 class="text-black font-bold text-lg md:text-xl">
                  N/S高を卒業するまであと何秒？
                </h1>
              </div>
              <footer class="flex justify-center py-10">
                <img src="/svg/grad-timer.svg" />
              </footer>
            </div>
            <div class="flex justify-center">
              <img
                class="p-2 rounded-lg shadow-lg w-auto sm:w-96"
                src={"/ns-app/grad-timer.png"}
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
