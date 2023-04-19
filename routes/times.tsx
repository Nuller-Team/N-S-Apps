import { Handlers, PageProps } from "$fresh/server.ts";
import type { State } from "@/types/session.ts";
import TIMES from "../islands/times.tsx";

export const handler: Handlers<any, State> = {
  GET(req, ctx) {
    if (!ctx.state.token) return ctx.render();
    return ctx.render(ctx.state);
  },
};

export default function Times(props: PageProps<State | undefined>) {
  if (!props.data?.email) {
    return "HEYGUYS";
  }
  return (
    <>
      <div class="flex justify-center items-center h-screen">
        <TIMES state={props.data} />
      </div>
    </>
  );
}
