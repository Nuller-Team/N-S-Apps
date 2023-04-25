import { UnknownPageProps } from "$fresh/server.ts";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <>
      <div class="bg-gray-100 flex flex-col justify-center items-center h-screen">
        <div class="text-center">
          <h1 class="text-6xl font-bold text-gray-700">404</h1>
          <p class="text-gray-700 text-2xl mt-4">
            あなたが探しているページは見つかりませんでした！
          </p>
          <a href="/" class="text-gray-700 text-xl underline mt-4">
            Go back to the homepage
          </a>
        </div>
      </div>
    </>
  );
}
