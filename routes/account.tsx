import { Handlers, PageProps } from "$fresh/server.ts";
import { ComponentChild } from "preact";
import Head from "@/components/Head.tsx";
import { State } from "@/routes/_middleware.ts";
import Layout from "@/components/Layout.tsx";

export const handler: Handlers<State, State> = {
  GET(_request, ctx) {
    return ctx.render(ctx.state);
  },
};

interface RowProps {
  title: string;
  children?: ComponentChild;
  text: string;
}

function Row(props: RowProps) {
  return (
    <li class="py-4">
      <div class="flex flex-wrap justify-between">
        <span>
          <strong>{props.title}</strong>
        </span>
        {props.children && <span>{props.children}</span>}
      </div>
      <p>{props.text}</p>
    </li>
  );
}

export default function AccountPage(props: PageProps<State>) {
  return (
    <>
      <Head title="Account" href={props.url.href} />
      <Layout state={props.data}>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <img
            src={props.data.user?.avatarUrl}
            alt="User Avatar"
            crossOrigin="anonymous"
            class="max-w-[50%] self-center rounded-full aspect-square mb-4 md:mb-6"
          />
          <ul>
          <Row title="名前" text={props.data.user?.name!} />
        </ul>
          <ul>
          <Row title="所属" text={props.data.user?.school.name + "高等学校" + props.data.user?.school.gen + "期生"} />
        </ul>
          <a
            href="/signout"
            class={
              "px-4 py-2 bg-blue-500 text-white text-lg rounded-lg border-2 border-blue-500 transition duration-300 disabled:(opacity-50 cursor-not-allowed) hover:(bg-transparent text-pink-700) block text-center mt-8"
            }
          >
            Sign out
          </a>
        </div>
      </Layout>
    </>
  );
}
