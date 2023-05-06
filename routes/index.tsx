import { Handler, PageProps } from "https://deno.land/x/fresh@1.1.5/server.ts";
import { State } from "./_middleware.ts";
import { Head, asset } from "https://deno.land/x/fresh@1.1.5/runtime.ts";
import LoginButton from "../islands/LoginButton.tsx";
import Title from "../components/title.tsx";

const TITLE = "N/S Apps｜N/S高生のためのアプリ";
const DESCRIPTION = `N/S高生の学校生活をより便利にするために作られたアプリたちです。
このツールを使用するにはGoogleアカウントでログインが必要です。`;

export default function Index(props: PageProps<State>) {
  if (props.data.active == undefined) {
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
              <LoginButton>私はN/S高生、N中等部です</LoginButton>
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
  } else if (!props.data.active) {
    return ("N/S高生ではない"
    );
  }else{
    return (
      "N/S高生"
    )
  }
}

export const handler: Handler = (_, ctx) => {
  console.log(ctx.state);
  return ctx.render(ctx.state);
};
