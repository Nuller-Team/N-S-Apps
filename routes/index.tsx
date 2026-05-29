import { RouteContext } from "fresh";
import Layout from "@/components/Layout.tsx";
import Projects, { Project } from "@/components/Projects.tsx";
import Head from "@/components/Head.tsx";

import { State } from "@/routes/_middleware.ts";
import apps from "@/data/apps.json" with { type: "json" };

export default async function handler(
  ctx: RouteContext<void, State>,
) {
  const req = ctx.req;
  const ogImageUrl = new URL("/ns-app/apps.png", req.url).href;
  const state = ctx.state || { sessionId: undefined, user: undefined };

  if (!state.user?.id) {
    if (state.sessionId) {
      return (
        <html lang="ja">
          <head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>N-S-Apps</title>
          </head>
          <body>
            <Head href={req.url} imageUrl={ogImageUrl} />
            <Layout state={state}>
              <section class="bg-white py-12">
                <div class="container mx-auto px-4">
                  <div class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-semibold mb-8 text-center py-20 md:py-36 space-y-2">
                    <h1 class="text-black">あなたはN/S高生ではないため</h1>
                    <h1 class="text-red-500">アプリを使うことはできません</h1>
                  </div>
                  <footer class="flex justify-center py-10">
                    <image src="/svg/campus-alert.svg" />
                  </footer>
                </div>
                <div class="flex justify-center">
                  <img
                    class="p-2 rounded-lg shadow-lg w-auto sm:w-96"
                    src={"/ns-app/apps.png"}
                  />
                </div>
              </section>
            </Layout>
          </body>
        </html>
      );
    }
    return (
      <html lang="ja">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>N-S-Apps</title>
        </head>
        <body>
          <Head imageUrl={ogImageUrl} />
          <Layout state={state}>
            <section class="bg-white py-12">
              <div class="container mx-auto px-4">
                <div class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-semibold mb-8 text-center py-20 md:py-36 space-y-2">
                  <h1 class="text-black">N/S高生の学校生活を</h1>
                  <h1 class="text-purple-500">より便利にするアプリたち</h1>
                </div>
                <footer class="flex justify-center py-10">
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
        </body>
      </html>
    );
  } else {
    return (
      <html lang="ja">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>N-S-Apps</title>
        </head>
        <body>
          <Head imageUrl={ogImageUrl} />
          <Layout state={state}>
            <div class="flex flex-col min-h-screen">
              <div class="flex-1">
                <Apps items={apps} state={state} />
              </div>
            </div>
          </Layout>
        </body>
      </html>
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
