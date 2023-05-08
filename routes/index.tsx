import { Handler, PageProps } from "https://deno.land/x/fresh@1.1.5/server.ts";
import { State } from "./_middleware.ts";
import { Head, asset } from "https://deno.land/x/fresh@1.1.5/runtime.ts";
import LoginButton from "../islands/LoginButton.tsx";
import Title from "../components/title.tsx";
import { Footer } from "../components/footer.tsx";

const TITLE = "N/S Apps｜N/S高生のためのアプリ";
const DESCRIPTION = `N/S高生の学校生活をより便利にするために作られたアプリたちです。
このツールを使用するにはGoogleアカウントでログインが必要です。`;

export default function Index(props: PageProps<State>) {
  //if (props.data.active == undefined) {
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
      <nav class="bg-gray-100 py-4">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center">
            <a href="#" class="text-2xl font-bold text-black">
              N/S Apps
            </a>
            <button class="md:hidden rounded-lg p-2 text-white bg-blue-700 focus:outline-none">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2H3zm0 5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2H3zm0 5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div class="hidden md:flex md:items-center">
              <a href="#" class="text-white mx-4 hover:underline">
                ホーム
              </a>
              <a href="#" class="text-white mx-4 hover:underline">
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section class="bg-white py-12">
        <div class="container mx-auto px-4">
          <div class={"text-7xl font-semibold mb-8 text-center p-20 space-y-2"}>
            <h1 class={"text-black"}>N/S高生の学校生活を</h1>
            <h1 class={"text-purple-500"}>より便利にするアプリたち</h1>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <img class="bg-gray-100 p-4 rounded-lg shadow-md" src={"/ns-app/times.png"}>
            </img>
            <img class="bg-gray-100 p-4 rounded-lg shadow-md" src={"/ns-app/result.png"}>
            </img>
            <img class="bg-gray-100 p-4 rounded-lg shadow-md" src={"/ns-app/checker.png"}>
            </img>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
  /*} else if (!props.data.active) {
    return ("N/S高生ではない"
    );
  }else{
    return (
      "N/S高生"
    )
  }*/
}

export const handler: Handler = (_, ctx) => {
  console.log(ctx.state);
  return ctx.render(ctx.state);
};
