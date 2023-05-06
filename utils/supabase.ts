import "dotenv";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase_types.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

export const supabase = createClient<Database>(
	SUPABASE_URL,
	SUPABASE_ANON_KEY,
);

export const supabaseAdminClient = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

export const supabaseAs = (access_token: string) => {
	return createClient(
		SUPABASE_URL,
		SUPABASE_ANON_KEY,
		{
			global: {
				headers: {
					"Authorization": `Bearer ${access_token}`,
				},
			},
		},
	);
};
