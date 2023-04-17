// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/_app.tsx";
import * as $2 from "./routes/_middleware.ts";
import * as $3 from "./routes/api/token.ts";
import * as $4 from "./routes/api/verify_token.ts";
import * as $5 from "./routes/checker.tsx";
import * as $6 from "./routes/entry.tsx";
import * as $7 from "./routes/index.tsx";
import * as $8 from "./routes/login/callback.tsx";
import * as $9 from "./routes/result.tsx";
import * as $10 from "./routes/verify/[token].tsx";
import * as $$0 from "./islands/entry.tsx";
import * as $$1 from "./islands/token.tsx";
import * as $$2 from "./islands/verify_token.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/_app.tsx": $1,
    "./routes/_middleware.ts": $2,
    "./routes/api/token.ts": $3,
    "./routes/api/verify_token.ts": $4,
    "./routes/checker.tsx": $5,
    "./routes/entry.tsx": $6,
    "./routes/index.tsx": $7,
    "./routes/login/callback.tsx": $8,
    "./routes/result.tsx": $9,
    "./routes/verify/[token].tsx": $10,
  },
  islands: {
    "./islands/entry.tsx": $$0,
    "./islands/token.tsx": $$1,
    "./islands/verify_token.tsx": $$2,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
