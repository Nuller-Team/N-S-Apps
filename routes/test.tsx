//import Header from "@/components/Header.tsx";
//import Footer from "@/components/Footer.tsx";
import Projects, { Project } from "@/components/Projects.tsx";
import apps from "@/data/apps.json" assert { type: "json" };
import { Head } from "$fresh/runtime.ts";

export default function Test() {
  return (
    <>
      <div class="flex flex-col min-h-screen">
        <div class="flex-1">
          <Showcase items={apps} />
        </div>
      </div>
    </>
  );
}

function Showcase({ items }: { items: Project[] }) {
  return (
    <section class="max-w-screen-lg mx-auto my-16 px(4 sm:6 md:8) space-y-4">
      <h2 class="text(3xl gray-600) font-bold">
        N/S Apps
      </h2>
      <p class="text-gray-600">
        N/S高生の開発チーム『Nuller』が開発した{" "}N/S高生のためのアプリです。
      </p>
      <Projects items={items} class="gap-16" />
    </section>
  );
}
