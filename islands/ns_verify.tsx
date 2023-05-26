import { State } from "@/routes/_middleware.ts";

interface propsType {
  state: State
}

export default function NSverify({ state }: propsType) {
  const scData = state.user?.school!;
  return (
    <>
      <div class="flex justify-center items-center mt-10 w-100">
        <img src={state.user?.avatar_url} class="rounded-full"></img>
      </div>
      <div class="text-center mt-5">
        <h1 class="text-2xl font-bold">🎉あなたはN/S高生です🎉</h1>
        <p class="text-gray-500 mt-2">{scData.name}高等学校{scData.gen}期生</p>
      </div>
    </>
  );
}

