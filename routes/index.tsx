import { Handlers, PageProps } from "https://deno.land/x/fresh@1.1.5/server.ts";
import Layout, { Header } from "../components/Layout.tsx";
import { Notifications_Flatline } from "../components/svg.tsx";
import { State } from "./_middleware.ts";
import apps from "@/data/apps.json" assert { type: "json" };
import Projects, { Project } from "@/components/Projects.tsx";

export default function test(props: PageProps<State>) {
  if (!props.data.session?.user.email) {
    return (
      <Layout session={props.data.session}>
        <section class="bg-white py-12">
          <div class="container mx-auto px-4">
            <div
              class={
                "text-2xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-semibold mb-8 text-center py-20 md:py-36 space-y-2"
              }
            >
              <h1 class={"text-black"}>N/S高生の学校生活を</h1>
              <h1 class={"text-purple-500"}>より便利にするアプリたち</h1>
            </div>
            <footer class={"flex justify-center py-10"}>
              <Notifications_Flatline />
            </footer>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center">
              <img class="p-2 rounded-lg" src={"/ns-app/apps.png"}></img>
              <img class="p-2 rounded-lg" src={"/ns-app/checker.png"}></img>
              <img class="p-2 rounded-lg" src={"/ns-app/grad-timer.png"}></img>
              <img class="p-2 rounded-lg" src={"/ns-app/profile.png"}></img>
              <img class="p-2 rounded-lg" src={"/ns-app/result.png"}></img>
              <img class="p-2 rounded-lg" src={"/ns-app/times.png"}></img>
            </div>
          </div>
        </section>
      </Layout>
    );
  } else if (props.data.session.user.email.endsWith("@nnn.ed.jp")) {
    return (
      <>
        <Layout session={props.data.session}>
          <div class="flex flex-col min-h-screen">
            <div class="flex-1">
              <Apps items={apps} />
            </div>
          </div>
        </Layout>
      </>
    );
  } else if (props.data.session.user.email.endsWith("@n-jr.jp")) {
    const njrApps = apps.filter((project) => project.njr);
    return (
      <>
        <div class="flex flex-col min-h-screen">
          <div class="flex-1">
            <Apps items={njrApps} />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <Layout session={props.data.session}>
        <section class="bg-white py-12">
          <div class="container mx-auto px-4">
            <div
              class={
                "text-2xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-semibold mb-8 text-center py-20 md:py-36 space-y-2"
              }
            >
              <h1 class={"text-black"}>あなたはN/S高生ではないため</h1>
              <h1 class={"text-red-500"}>アプリを使うことはできません</h1>
              <a href={"/logout"} class="bg-red-500 hover:bg-red-700 text-white font-black py-2 px-4 rounded text-2xl">
                ログアウト
              </a>
            </div>
            <footer class={"flex justify-center py-10"}>
              <Notifications_Flatline />
            </footer>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center">
              <img class="p-2 rounded-lg" src={"/ns-app/apps.png"}></img>
              <img class="p-2 rounded-lg" src={"/ns-app/checker.png"}></img>
              <img class="p-2 rounded-lg" src={"/ns-app/grad-timer.png"}></img>
              <img class="p-2 rounded-lg" src={"/ns-app/profile.png"}></img>
              <img class="p-2 rounded-lg" src={"/ns-app/result.png"}></img>
              <img class="p-2 rounded-lg" src={"/ns-app/times.png"}></img>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export const handler: Handlers<any, State> = {
  GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
  },
};

function Apps({ items }: { items: Project[] }) {
  return (
    <>
      <section class="max-w-screen-lg mx-auto my-16 px(4 sm:6 md:8) space-y-4">
        <Projects items={items} class="gap-16" />
      </section>
    </>
  );
}
