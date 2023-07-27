import { createGoogleOAuth2Client } from "kv_oauth";

export const oauth2Client = createGoogleOAuth2Client({
  redirectUri: "http://localhost:8000/callback",
  defaults: {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ]
  },
});
