import type { AppProps } from "$fresh/server.ts";
import UserHandler from "../islands/UserHandler.tsx";

export default function App({ Component }: AppProps) {
  return (
    <html>
      {/* @ts-ignore */}
      <main onTouchStart="">
        <Component />
      </main>
      <UserHandler />
      <script src="/env.js"></script>
    </html>
  );
}
