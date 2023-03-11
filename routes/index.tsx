import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div>
      <button class="bg-indigo-700 font-semibold text-white py-2 px-4 rounded">ボタン</button>
      </div>
    </>
  );
}
