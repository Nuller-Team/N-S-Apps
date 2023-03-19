import { Handlers } from "$fresh/server.ts";
export const handler: Handlers = {
  async GET(req, ctx) {
    console.log(req);
    console.log(ctx);
    return new Response("HELLO");
  }
}