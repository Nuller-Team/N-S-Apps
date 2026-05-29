import { Handlers } from "fresh/compat";

export const handler: Handlers = {
  GET() {
    const response = new Response("", {
      status: 303,
      headers: {
        Location: "https://form.nuller.jp/entry",
      },
    });
    return response;
  },
};
