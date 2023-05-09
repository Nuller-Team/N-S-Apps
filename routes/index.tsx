import { Handler, PageProps } from "https://deno.land/x/fresh@1.1.5/server.ts";
import { State } from "./_middleware.ts";
import { Head, asset } from "https://deno.land/x/fresh@1.1.5/runtime.ts";
import LoginButton from "../islands/LoginButton.tsx";
import { Footer } from "../components/footer.tsx";
import { Notifications_Flatline } from "../components/svg.tsx";

const TITLE = "N/S Apps｜N/S高生のためのアプリ";
const DESCRIPTION = `N/S高生の学校生活をより便利にするために作られたアプリたちです。
このツールを使用するにはGoogleアカウントでログインが必要です。`;

export default function Index(props: PageProps<State>) {
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
      <nav class="py-4 border-b">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center">
            <a href="#" class="text-2xl font-bold text-black">
              N/S Apps
            </a>
            <div>
              <LoginButton>Sign in</LoginButton>
            </div>
          </div>
        </div>
      </nav>

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
      <Footer />
    </>
  );
}

export const handler: Handler = (_, ctx) => {
  console.log(ctx.state);
  return ctx.render(ctx.state);
};
