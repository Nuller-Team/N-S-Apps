import { Handlers, PageProps } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import { auth_url } from "../utils/auth.ts";
import type { State } from "@/types/session.ts";

import Title from "@/components/title.tsx";

import EntryForm from "@/islands/entry.tsx";

export const handler: Handlers<any, State> = {
  GET(req, ctx) {
    if (!ctx.state.token) return ctx.render();
    return ctx.render(ctx.state);
  },
};

const TITLE = "Nullerに応募する";
const DESCRIPTION = `Nullerは、Discord上で活動する学生による開発チームで、「学生が描く未来」というテーマで、
便利なアプリや面白いゲーム、今までにないツールを作ることに取り組んでいます。
チームメンバーは多様であり、コミュニケーションや協働性の確保にも取り組んでいます。
Nullerの目標は、プログラミングを通じた自己表現や社会貢献です。興味がある方は是非参加してみてください。`;

export default function Entry(props: PageProps<State | undefined>) {
  const ogImageUrl = new URL(asset("/ns-app/entry.png"), props.url).href;
  if (!props.data?.email) {
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
        <Title name="Nullerに応募する">
          <div class="bg-white shadow-md rounded-md p-8 w-full sm:w-[30rem]">
            <div class="mb-6">
              <a
                href={auth_url}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center"
              >
                <i class="mr-2"></i> 私はN/S高生です
              </a>
            </div>
            <p class="text-sm text-gray-500 text-center">
              Nullerに応募する為にはN/S高生アカウントでの<br></br>
              ログインが必要です。
            </p>
          </div>
        </Title>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>{TITLE}</title>
        </Head>
        <Title name={TITLE}>
          <div class="bg-white shadow-md rounded-md p-8 w-full sm:w-[30rem]">
            <EntryForm email={props.data.email} />
          </div>
        </Title>
      </>
    );
  }
}
