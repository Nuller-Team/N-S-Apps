import { Handlers, PageProps } from "$fresh/server.ts";
import VerifyToken from "../../islands/verify_token.tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    const token = ctx.params.token;
    if (!token) {
      return ctx.render("URLが無効です");
    }
    return ctx.render(token);
  },
};

export default function verifyPage({ data }: PageProps<string>) {
  if (data == "URLが無効です") {
    return (
      <>
        <div class="flex items-center justify-center h-screen bg-gray-50">
          <div class="bg-white items-center p-8 rounded-md shadow-md w-full sm:w-96">
            <h1 class="text-2xl font-bold mb-4">エラーが発生しました。</h1>
            <p class="text-gray-500 mb-4">URLが無効です</p>
            <a
              href="/"
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Go back to home
            </a>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <VerifyToken token={data} />
    </>
  );
}
