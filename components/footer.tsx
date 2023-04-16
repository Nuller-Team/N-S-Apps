import { JSX } from "preact/jsx-runtime";

export function Footer(): JSX.Element {
  return (
    <>
      <footer class="bg-gray-200 text-gray-700 flex flex-col justify-between items-center py-8 sm:py-16 lg:py-20">
        <div class="w-full max-w-screen-lg flex flex-col sm:flex-row justify-between items-center">
          <div class="logo">
            <a
              href="https://nuller.net"
              target="_top"
              class="text-black no-underline"
            >
              <img
                src="/nuller.png"
                class="w-16"
                alt="Nuller Logo"
              >
              </img>
            </a>
          </div>
          <div class="links font-semibold text-lg flex flex-col sm:flex-row">
            <a href="https://nuller.net/about" target="_top" class="mr-4 mb-2 sm:mb-0">About</a>
            <a href="https://nuller.net/project" target="_top" class="mr-4 mb-2 sm:mb-0">
              Project
            </a>
            <a href="https://nuller.net/contact" target="_top" class="mr-4 mb-2 sm:mb-0">
              Contact
            </a>
            <a href="https://nuller.net/privacy" target="_top" class="mr-4 mb-2 sm:mb-0">
              Privacy Policy
            </a>
          </div>
        </div>
        <div class="flex justify-end items-center p-4">
          <div class="ml-4">
            <a href="https://github.com/Nuller-Team" target="_top">
              <img src="/asset/github.png" alt="Github Icon" class="h-8"></img>
            </a>
          </div>
          <div class="ml-4">
            <a href="https://twitter.com/Nuller_jp" target="_top">
              <img src="/asset/twitter.png" alt="Twitter Logo" class="h-8">
              </img>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
