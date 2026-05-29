import { State } from "@/routes/_middleware.ts";
import { Handler, Handlers } from "fresh/compat";

export type Handler = FreshHandler<unknown, State>;
export type Handlers = FreshHandlers<unknown, State>;
