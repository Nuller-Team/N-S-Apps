import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { createOrGetUser, createSupabaseClient } from "@/utils/supabase.ts";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/utils/supabase_types.ts";

export interface State {
  session: Session | null;
  supabaseClient: SupabaseClient<Database>;
  createOrGetUser: () => Promise<Database["public"]["Tables"]["user"]["Row"] | undefined>;
}

export async function handler(
  request: Request,
  ctx: MiddlewareHandlerContext<State>
) {
  const headers = new Headers();
  const supabaseClient = createSupabaseClient(request.headers, headers);

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  ctx.state.session = session;
  ctx.state.supabaseClient = supabaseClient;
  ctx.state.createOrGetUser = async () =>
    await createOrGetUser(supabaseClient);
  return ctx.next();
}
