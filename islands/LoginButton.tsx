import { ComponentChildren } from "preact";
import { supabase } from "../utils/supabase-client.ts"

type LoginButtonType = {
  children: ComponentChildren;
};

export default function LoginButton(props: LoginButtonType) {
  const login = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/",
      }
    })
  }
  return (
    <>
    <button class={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center"} onClick={login}>{props.children}</button>
    </>
  )
}