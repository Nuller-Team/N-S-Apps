import { IS_BROWSER } from "$fresh/runtime.ts";
import { createClient, SupabaseClient } from "supabase-client";

export const createSupabaseClient = () => {
	if (IS_BROWSER) {
		//@ts-ignore: We are setting window.env.SUPABASE_URL and window.env.SUPABASE_ANON_KEY in the browser
		const { SUPABASE_URL, SUPABASE_ANON_KEY } = globalThis.env;
		return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
	}
	return null as unknown as SupabaseClient;
};

export const supabase = createSupabaseClient();
