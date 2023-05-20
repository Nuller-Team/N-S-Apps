import type {
  Handler as FreshHandler,
  Handlers as FreshHandlers,
} from "$fresh/server.ts";
import { State } from "@/routes/_middleware.ts";

export type Handler = FreshHandler<unknown, State>;
export type Handlers = FreshHandlers<unknown, State>;
