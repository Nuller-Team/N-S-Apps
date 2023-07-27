import { createGoogleOAuth2Client } from "kv_oauth";

export const oauth2Client = createGoogleOAuth2Client({
  redirectUri: `${Deno.env.get("REDIRECT_URI")}/callback`,
  defaults: {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ]
  },
});
