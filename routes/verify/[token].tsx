import { Handlers, PageProps } from "$fresh/server.ts";
import db from "utils/mongodb.ts";
import type { VerifyDataType } from "types/db.ts";

const Verify = db.collection<VerifyDataType>("Verify");

export const handler: Handlers = {
  async GET(req, ctx) {
    const token = ctx.params.token;
    if (!token) {
      return ctx.render();
    }
    const check = await Verify.findOne({ token: token });
    if (!check) {
      return ctx.render();
    }
    await Verify.deleteMany({ token: token });
    return ctx.render(check);
  },
};

export default function verifyPage({ data }: PageProps<VerifyDataType>) {
  if (!data) {
    return (
      <>
        <div class="flex items-center justify-center h-screen bg-gray-50">
          <div class="bg-white items-center p-8 rounded-md shadow-md w-full sm:w-96">
            <h1 class="text-2xl font-bold mb-4">エラーが発生しました。</h1>
            <p class="text-gray-500 mb-4">
              TOKENが既に無効である可能性があります。<br></br>再度お試しください。
            </p>
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
      <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">N/S CAPTCHA</h1>
        <div class="bg-white shadow-md rounded-md p-8 w-full sm:w-[30rem]">
          <div class="mb-6">
            <p class="bg-pink-400 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center">
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
