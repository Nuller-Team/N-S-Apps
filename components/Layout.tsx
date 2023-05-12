import type { ComponentChild, ComponentChildren, JSX } from "preact";
import { Session } from "@supabase/supabase-js";
import { BUTTON_STYLES, NOTICE_STYLES } from "../utils/constants.ts";

export function Header(props: JSX.HTMLAttributes<HTMLElement>) {
  return (
    <>
      <nav class="py-4 border-b">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center">
            <a href="#" class="text-2xl font-bold text-black">
              N/S Apps
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
      <footer class="bg-gray-200 text-gray-700 flex flex-col justify-between items-center py-8 sm:py-16 lg:py-20">
        <div class="w-full max-w-screen-lg flex flex-col sm:flex-row justify-between items-center">
          <div class="logo">
            <a
              href="https://nuller.net"
              target="_top"
              class="text-black no-underline"
            >
              <img src="/nuller.png" class="w-16" alt="Nuller Logo"></img>
            </a>
          </div>
          <div class="links font-semibold text-lg flex flex-col sm:flex-row">
            <a
              href="https://nuller.net/about"
              target="_top"
              class="mr-4 mb-2 sm:mb-0"
            >
              About
            </a>
            <a
              href="https://nuller.net/project"
              target="_top"
              class="mr-4 mb-2 sm:mb-0"
            >
              Project
            </a>
            <a
              href="https://nuller.net/contact"
              target="_top"
              class="mr-4 mb-2 sm:mb-0"
            >
              Contact
            </a>
            <a
              href="https://nuller.net/privacy"
              target="_top"
              class="mr-4 mb-2 sm:mb-0"
            >
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
              <img
                src="/asset/twitter.png"
                alt="Twitter Logo"
                class="h-8"
              ></img>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

interface LayoutProps {
  children: ComponentChildren;
  session: Session | null;
}

export default function Layout(props: LayoutProps) {
  const headerNavItems = [
    props.session
      ? {
          href: "/home",
          inner: <div><img src={props.session.user.user_metadata.picture} class={"h-10 rounded-full"}></img></div>,
        }
      : {
          href: "/login",
          inner: <span class={BUTTON_STYLES}>Login</span>,
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
        class={`flex gap-x-8 gap-y-2 items-center justify-between h-full ${
          props.class ?? ""
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
