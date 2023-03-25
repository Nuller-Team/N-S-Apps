// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_middleware.ts";
import * as $1 from "./routes/api/token.ts";
import * as $2 from "./routes/index.tsx";
import * as $3 from "./routes/login/callback.tsx";
import * as $4 from "./routes/n-s-capture.tsx";
import * as $5 from "./routes/test.tsx";
import * as $6 from "./routes/verify/[token].tsx";
import * as $$0 from "./islands/token.tsx";

const manifest = {
  routes: {
    "./routes/_middleware.ts": $0,
    "./routes/api/token.ts": $1,
    "./routes/index.tsx": $2,
    "./routes/login/callback.tsx": $3,
    "./routes/n-s-capture.tsx": $4,
    "./routes/test.tsx": $5,
    "./routes/verify/[token].tsx": $6,
  },
  islands: {
    "./islands/token.tsx": $$0,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
