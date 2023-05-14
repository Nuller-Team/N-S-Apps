import { Handlers, PageProps } from "$fresh/server.ts";
import TIMES from "../islands/times.tsx";
import { asset, Head } from "$fresh/runtime.ts";

import Title from "@/components/title.tsx";
import LoginButton from "@/islands/LoginButton.tsx";
import { State } from "./_middleware.ts";
import Layout from "../components/Layout.tsx";

export const handler: Handlers<any, State> = {
  GET(_req, ctx) {
    return ctx.render({...ctx.state});
  }
};

const TITLE = "N/S Times｜N/S高に入ってから何秒？";
const DESCRIPTION = `N/S高に入学してから何秒経過しているかを確認することができます。
このツールを使用するにはGoogleアカウントでログインが必要です。`;

export default function Times(props: PageProps<State>) {
  if (!props.data.session?.user.email) {
    return (
      <>
      </>
    );
  }else if (props.data.session.user.email.endsWith("@nnn.ed.jp") || props.data.session.user.email.endsWith("@n-jr.jp")) {
    return (
      <>
        <Head>
          <title>{TITLE}</title>
        </Head>
        <div class="flex justify-center items-center h-screen">
          <TIMES state={props.data} />
        </div>
      </>
    );
  }else{
    return (
      <>
        <Layout session={props.data.session}>
        </Layout>
      </>
    )
  }
}
