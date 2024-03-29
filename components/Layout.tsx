import type { ComponentChild, ComponentChildren, JSX } from "preact";
import { State } from "@/routes/_middleware.ts";

function Header(props: JSX.HTMLAttributes<HTMLElement>) {
  return (
    <>
      <nav class="py-4 border-b">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center">
            <a href="/">
              <image src="/logo.png" class={"h-11 p-1"}></image>
            </a>
            {props.children}
          </div>
        </div>
      </nav>
    </>
  );
}

function Footer(): JSX.Element {
  return (
    <>
      <footer class="bg-white">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div class="md:flex md:justify-between">
            <div class="mb-6 md:mb-0">
              <a href="https://n-s-apps.nuller.jp/" class="flex items-center">
                <img src="/logo.png" class="w-48 mr-3" alt="N/S Apps Logo" />
              </a>
            </div>
            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
                  Nuller
                </h2>
                <ul class="text-gray-600 font-medium">
                  <li class="mb-4">
                    <a href="https://nuller.jp/about/" class="hover:underline">
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://nuller.jp/project/"
                      class="hover:underline"
                    >
                      Project
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
                  Follow us
                </h2>
                <ul class="text-gray-600 font-medium">
                  <li class="mb-4">
                    <a
                      href="https://github.com/Nuller-Team"
                      class="hover:underline"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/Nuller_jp"
                      class="hover:underline"
                    >
                      Twitter
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
                  Legal
                </h2>
                <ul class="text-gray-600 font-medium">
                  <li class="mb-4">
                    <a
                      href="https://nuller.jp/privacy"
                      class="hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/docs/terms" class="hover:underline">
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
          <div class="sm:flex sm:items-center sm:justify-between">
            <span class="text-sm text-gray-500 sm:text-center">
              © 2023{" "}
              <a href="https://nuller.jp/" class="hover:underline">
                Nuller
              </a>
              . All Rights Reserved.
            </span>
            <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
              <a
                href="https://twitter.com/Nuller_jp"
                class="text-gray-500 hover:text-gray-900"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                <span class="sr-only">Twitter page</span>
              </a>
              <a
                href="https://github.com/Nuller-Team"
                class="text-gray-500 hover:text-gray-900"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">GitHub account</span>
              </a>
            </div>
            <div class="p-3">
              <a href="https://fresh.deno.dev">
                <img
                  width="197"
                  height="37"
                  src="https://fresh.deno.dev/fresh-badge.svg"
                  alt="Made with Fresh"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

interface LayoutProps {
  children: ComponentChildren;
  state: State;
}

export default function Layout(props: LayoutProps) {
  const headerNavItems = [
    !props.state.user?.id
      ? props.state.sessionId
        ? {
          href: "/signout",
          inner: (
            <span class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center disabled:(opacity-50 cursor-not-allowed)">
              Sign OUT
            </span>
          ),
        }
        : {
          href: "/signIn",
          inner: (
            <span class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center disabled:(opacity-50 cursor-not-allowed)">
              Sign In
            </span>
          ),
        }
      : {
        href: "/account",
        inner: (
          <div>
            <img
              src={props.state.user?.avatarUrl}
              class={"h-10 rounded-full"}
            ></img>
          </div>
        ),
      },
  ];
  return (
    <>
      <div class="flex flex-col min-h-screen">
        <Header>
          {" "}
          <Nav items={headerNavItems} />
        </Header>
        {props.children}
      </div>
      <Footer />
    </>
  );
}
function Nav(props: NavProps) {
  return (
    <nav>
      <ul
        class={`flex gap-x-8 gap-y-2 items-center justify-between h-full ${props.class ?? ""
          }`}
      >
        {props.items.map((item) => (
          <li>
            <a href={item.href}>{item.inner}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface NavProps extends JSX.HTMLAttributes<HTMLElement> {
  active?: string;
  items: (JSX.HTMLAttributes<HTMLAnchorElement> & { inner: ComponentChild })[];
}
