import type { ComponentChildren } from "preact";
type TitleType = {
  children: ComponentChildren;
};

export default function Title(props: TitleType) {
  return (
      <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">N/S CAPTCHA</h1>
        {props.children}
      </div>
  );
}
