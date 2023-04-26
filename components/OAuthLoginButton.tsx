// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Provider } from "@supabase/supabase-js";
import type { ComponentChild } from "preact";
const BASE_BUTTON_STYLES =
  "px-4 py-2 bg-pink-700 text-white text-lg rounded-full hover:bg-black transition duration-300 disabled:(opacity-50 cursor-not-allowed)";
interface OAuthLoginButtonProps {
  children: ComponentChild;
}

export default function OAuthLoginButton(props: OAuthLoginButtonProps) {
  return (
    <form action="/api/oauth" method="POST">
      <input type="hidden" value="google" name="provider" />
      <button
        type="submit"
        class={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center"}
      >
        {props.children}
      </button>
    </form>
  );
}
