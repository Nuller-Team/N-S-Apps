import { createHelpers, type OAuth2ClientConfig } from "kv_oauth";

const redirectUri = Deno.env.get("REDIRECT_URI");
if (!redirectUri) {
  throw new Error("REDIRECT_URI environment variable is not set");
}

const oauthConfig: OAuth2ClientConfig = {
  clientId: Deno.env.get("GOOGLE_CLIENT_ID") || "",
  clientSecret: Deno.env.get("GOOGLE_CLIENT_SECRET") || "",
  authorizationEndpointUri: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenUri: "https://www.googleapis.com/oauth2/v4/token",
  redirectUri: `${redirectUri}/callback`,
  defaults: {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  },
};

const { signIn, handleCallback, signOut, getSessionId } = createHelpers(
  oauthConfig,
  {
    cookieOptions: {
      name: "auth_session",
    },
  },
);

export { getSessionId, handleCallback, signIn, signOut };
