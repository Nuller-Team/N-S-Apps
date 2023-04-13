// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/_middleware.ts";
import * as $2 from "./routes/api/token.ts";
import * as $3 from "./routes/checker.tsx";
import * as $4 from "./routes/entry.tsx";
import * as $5 from "./routes/index.tsx";
import * as $6 from "./routes/login/callback.tsx";
import * as $7 from "./routes/result.tsx";
import * as $8 from "./routes/verify/[token].tsx";
import * as $$0 from "./islands/entry.tsx";
import * as $$1 from "./islands/token.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/_middleware.ts": $1,
    "./routes/api/token.ts": $2,
    "./routes/checker.tsx": $3,
    "./routes/entry.tsx": $4,
    "./routes/index.tsx": $5,
    "./routes/login/callback.tsx": $6,
    "./routes/result.tsx": $7,
    "./routes/verify/[token].tsx": $8,
  },
  islands: {
    "./islands/entry.tsx": $$0,
    "./islands/token.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
