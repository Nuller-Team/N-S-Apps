import type {
	Handler as FreshHandler,
	Handlers as FreshHandlers,
} from "$fresh/server.ts";
import type { user } from "@/types/User.ts";

type MiddlewareProps = {
	user?: user;
};

export type Handler = FreshHandler<unknown, MiddlewareProps>;
export type Handlers = FreshHandlers<unknown, MiddlewareProps>;
