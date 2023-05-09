import { Handler } from "@/types/handler.ts";
import { PageProps } from "https://deno.land/x/fresh@1.1.5/server.ts";
import { State } from "./_middleware.ts";
import { asset, Head } from "$fresh/runtime.ts";
import apps from "@/data/apps.json" assert { type: "json" };
import Projects, { Project } from "@/components/Projects.tsx";

const TITLE = "N/S Apps｜N/S高生のためのアプリ";

export default function Home(props: PageProps<State>) {
  if (props.data.active == "Not logged in") {
    return (
      <>
        <div class="flex items-center justify-center h-screen bg-gray-50">
          <div class="bg-white items-center p-8 rounded-md shadow-md w-full sm:w-96">
            <h1 class="text-2xl font-bold mb-4">ログインしてください</h1>
            <a
              href="/"
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Go back to home
            </a>
          </div>
        </div>
      </>
    );
  } else if (props.data.active == "disabled") {
    return (
      <>
        <nav class="py-4 border-b">
          <div class="container mx-auto px-4">
            <div class="flex justify-between items-center">
              <a href="#" class="text-2xl font-bold text-black">
                N/S Apps
              </a>
            </div>
          </div>
        </nav>
      </>
    );
  } else if (props.data.active == "enabled") {
    return (
      <>
        <div class="flex flex-col min-h-screen">
          <div class="flex-1">
            <Apps items={apps} />
          </div>
        </div>
      </>
    );
  }
}

export const handler: Handler = (_, ctx) => {
  return ctx.render(ctx.state);
};
function Apps({ items }: { items: Project[] }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <section class="max-w-screen-lg mx-auto my-16 px(4 sm:6 md:8) space-y-4">
        <h2 class="text(3xl gray-600) font-bold">N/S Apps</h2>
        <p class="text-gray-600">
          N/S高生の開発チーム『Nuller』が開発した
          N/S高生、N中等部生のためのアプリです。
        </p>
        <Projects items={items} class="gap-16" />
      </section>
    </>
  );
}
