import { asset, Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";
import { Footer } from "../components/footer.tsx";

export default function App(props: AppProps) {
  return (
    <>
    <props.Component />
    <Footer />
    </>
  )
}