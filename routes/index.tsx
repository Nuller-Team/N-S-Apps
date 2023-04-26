import { Handlers, PageProps } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import type {State} from "./_middleware.ts"
import Projects, { Project } from "@/components/Projects.tsx";
import apps from "@/data/apps.json" assert { type: "json" };
import Title from "@/components/title.tsx";
import OAuthLoginButton from "../components/OAuthLoginButton.tsx";
import { Database } from "../utils/supabase_types.ts";

export const handler: Handlers<HomePageData, State> = {
  async GET(req, ctx) {
    if (!ctx.state.session) {
      return ctx.render();
    }
    const user = await ctx.state.createOrGetUser();
    if (!user) {
      console.log("ERROR");
      return ctx.render();
    }
    console.log("USER")
    return ctx.render({...ctx.state, user});
  },
};

interface HomePageData extends State {
  user: Database["public"]["Tables"]["user"]["Row"];
}

const TITLE = "N/S Apps｜N/S高生のためのアプリ";
const DESCRIPTION = `N/S高生の学校生活をより便利にするために作られたアプリたちです。
このツールを使用するにはGoogleアカウントでログインが必要です。`;

export default function Index(props: PageProps<HomePageData | undefined>) {
  if (!props.data?.session) {
    const ogImageUrl = new URL(asset("/ns-app/apps.png"), props.url).href;
    return (
      <>
        <Head>
          <title>{TITLE}</title>
          <meta name="description" content={DESCRIPTION} />
          <meta property="og:title" content={TITLE} />
          <meta property="og:type" content="website" />
          <meta property="og:description" content={DESCRIPTION} />
          <meta property="og:url" content={props.url.href} />
          <meta property="og:image" content={ogImageUrl} />
        </Head>
        <Title name="N/S Apps">
          <div class="bg-white shadow-md rounded-md p-8 w-full sm:w-[31rem]">
            <div class="mb-6">
            <OAuthLoginButton>
              私はN/S高生、N中等部です
              </OAuthLoginButton>
            </div>
            <p class="text-sm text-gray-500 text-center">
              N/S高生の開発チーム
              <a href="https://nuller.net">『Nuller』</a>が開発した、<br></br>
              N/S高での学校生活をより便利にする為に作られたアプリたちです。
              <br></br>
              N/S高生、N中等部以外は使うことができません。
            </p>
          </div>
        </Title>
      </>
    );
  } else if (props.data.user.school == "NJR") {
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
