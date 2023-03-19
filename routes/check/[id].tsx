import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    console.log(ctx.params.id);
    return ctx.render();
  },
};

export default function verify() {
  return ("HELLO");
}