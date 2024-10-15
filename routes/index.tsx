import { PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";

import Layout from "@/components/Layout.tsx";
import Projects, { Project } from "@/components/Projects.tsx";
import Head from "@/components/Head.tsx";

import { Handlers } from "@/utils/handler.ts";

import { State } from "@/routes/_middleware.ts";
import apps from "@/data/apps.json" with { type: "json" };

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
  },
};

export default function test(props: PageProps<State>) {
  const ogImageUrl = new URL(asset("/ns-app/apps.png"), props.url).href;
  if (!props.data.user?.id) {
    if (props.data.sessionId) {
      return (
        <>
          <Head href={props.url.href} imageUrl={ogImageUrl} />
          <Layout state={props.data}>
            <section class="bg-white py-12">
              <div class="container mx-auto px-4">
                <div
                  class={"text-2xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-semibold mb-8 text-center py-20 md:py-36 space-y-2"}
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
                  src={"/ns-app/apps.png"}
                >
                </img>
              </div>
            </section>
          </Layout>
        </>
      );
    }
    return (
      <>
        <Head imageUrl={ogImageUrl} />
        <Layout state={props.data}>
          <section class="bg-white py-12">
            <div class="container mx-auto px-4">
              <div
                class={"text-2xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-semibold mb-8 text-center py-20 md:py-36 space-y-2"}
              >
                <h1 class={"text-black"}>N/S高生の学校生活を</h1>
                <h1 class={"text-purple-500"}>より便利にするアプリたち</h1>
              </div>
              <footer class={"flex justify-center py-10"}>
                <image src="/svg/home.svg" />
              </footer>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center">
                <img class="p-2 rounded-lg" src={"/ns-app/apps.png"} />
                <img class="p-2 rounded-lg" src={"/ns-app/checker.png"} />
                <img
                  class="p-2 rounded-lg"
                  src={"/ns-app/grad-timer.png"}
                />
                <img class="p-2 rounded-lg" src={"/ns-app/profile.png"} />
                <img class="p-2 rounded-lg" src={"/ns-app/result.png"} />
                <img class="p-2 rounded-lg" src={"/ns-app/times.png"} />
              </div>
            </div>
          </section>
        </Layout>
      </>
    );
  } else {
    return (
      <>
        <Head imageUrl={ogImageUrl} />
        <Layout state={props.data}>
          <div class="flex flex-col min-h-screen">
            <div class="flex-1">
              <Apps items={apps} state={props.data} />
            </div>
          </div>
        </Layout>
      </>
    );
  }
}

function Apps({ items, state }: { items: Project[]; state: State }) {
  if (state.user?.school.name == "NJR") {
    items.filter((project) => project.njr);
  }
  return (
    <>
      <section class="max-w-screen-lg mx-auto my-16 px(4 sm:6 md:8) space-y-4">
        <Projects items={items} class="gap-16" />
      </section>
    </>
  );
}
