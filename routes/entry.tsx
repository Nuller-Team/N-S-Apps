import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET() {
    const response = new Response("", {
      status: 303,
      headers: {
        Location: "https://form.nuller.jp/entry",
      },
    });
    return response;
  }
}