// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $account from "./routes/account.tsx";
import * as $callback from "./routes/callback.tsx";
import * as $campus_alert_id_ from "./routes/campus-alert/[id].tsx";
import * as $campus_alert_index from "./routes/campus-alert/index.tsx";
import * as $docs_terms from "./routes/docs/terms.tsx";
import * as $emoji from "./routes/emoji.tsx";
import * as $entry from "./routes/entry.tsx";
import * as $grad_timer from "./routes/grad_timer.tsx";
import * as $guide from "./routes/guide.tsx";
import * as $index from "./routes/index.tsx";
import * as $pages from "./routes/pages.tsx";
import * as $profile from "./routes/profile.tsx";
import * as $result from "./routes/result.tsx";
import * as $signIn from "./routes/signIn.ts";
import * as $signout from "./routes/signout.ts";
import * as $times from "./routes/times.tsx";
import * as $verify from "./routes/verify.tsx";
import * as $campus_alert from "./islands/campus-alert.tsx";
import * as $emoji_1 from "./islands/emoji.tsx";
import * as $entry_1 from "./islands/entry.tsx";
import * as $grad_timer_1 from "./islands/grad_timer.tsx";
import * as $pages_1 from "./islands/pages.tsx";
import * as $profile_app from "./islands/profile-app.tsx";
import * as $times_1 from "./islands/times.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.ts": $_middleware,
    "./routes/account.tsx": $account,
    "./routes/callback.tsx": $callback,
    "./routes/campus-alert/[id].tsx": $campus_alert_id_,
    "./routes/campus-alert/index.tsx": $campus_alert_index,
    "./routes/docs/terms.tsx": $docs_terms,
    "./routes/emoji.tsx": $emoji,
    "./routes/entry.tsx": $entry,
    "./routes/grad_timer.tsx": $grad_timer,
    "./routes/guide.tsx": $guide,
    "./routes/index.tsx": $index,
    "./routes/pages.tsx": $pages,
    "./routes/profile.tsx": $profile,
    "./routes/result.tsx": $result,
    "./routes/signIn.ts": $signIn,
    "./routes/signout.ts": $signout,
    "./routes/times.tsx": $times,
    "./routes/verify.tsx": $verify,
  },
  islands: {
    "./islands/campus-alert.tsx": $campus_alert,
    "./islands/emoji.tsx": $emoji_1,
    "./islands/entry.tsx": $entry_1,
    "./islands/grad_timer.tsx": $grad_timer_1,
    "./islands/pages.tsx": $pages_1,
    "./islands/profile-app.tsx": $profile_app,
    "./islands/times.tsx": $times_1,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
