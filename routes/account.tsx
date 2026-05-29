import { ComponentChild } from "preact";
import Head from "@/components/Head.tsx";
import { State } from "@/routes/_middleware.ts";
import Layout from "@/components/Layout.tsx";
import { Handlers } from "fresh/compat";

export const handler: Handlers<State, State> = {
  GET(ctx) {
    return ctx.render(<AccountPage {...ctx.state} url={ctx.req.url} />);
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

export default function AccountPage(
  props: State & { url: string },
) {
  const url = new URL(props.url);
  return (
    <>
      <Head title="Account" href={url.href} />
      <Layout state={props}>
        <div class="max-w-lg min-h-screen m-auto w-full flex-1 px-8 flex flex-col justify-center">
          <img
            src={props.user?.avatarUrl}
            alt="User Avatar"
            crossOrigin="anonymous"
            class="max-w-[50%] self-center rounded-full aspect-square mb-4 md:mb-6"
          />
          <ul>
            <Row title="名前" text={props.user?.name!} />
          </ul>
          <ul>
            <Row
              title="所属"
              text={props.user?.school.name + "高等学校" +
                props.user?.school.gen + "期生"}
            />
          </ul>
          <a
            href="/signout"
            class="px-4 py-2 bg-blue-500 text-white text-lg rounded-lg border-2 border-blue-500 transition duration-300 disabled:(opacity-50 cursor-not-allowed) hover:(bg-transparent text-pink-700) block text-center mt-8"
          >
            Sign out
          </a>
        </div>
      </Layout>
    </>
  );
}
