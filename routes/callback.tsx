import { Handlers } from "fresh/compat";
import { State } from "@/routes/_middleware.ts";
import { handleCallback } from "@/utils/oauth2_client.ts";
import {
  deleteRedirectUrlCookie,
  getRedirectUrlCookie,
} from "@/utils/redirect.ts";
import { createUser, getUser, replaceUserSession, User } from "@/utils/db.ts";
import {
  createSessionToken,
  hashSessionToken,
  setAppSessionCookie,
} from "@/utils/auth_session.ts";
import { getGoogleUser } from "@/utils/google.ts";

interface CallbackResult {
  response: Response;
  tokens?: {
    accessToken?: string;
  };
}

// deno-lint-ignore no-explicit-any
export const handler: Handlers<any, State> = {
  async GET(ctx) {
    try {
      const req = ctx.req;
      const callbackResult = await handleCallback(req) as CallbackResult;

      const response = callbackResult.response;
      const accessToken = callbackResult.tokens?.accessToken;

      if (!accessToken) {
        console.error("Failed to get access token from callback result");
        return new Response("Failed to get access token", { status: 400 });
      }

      const appSessionToken = createSessionToken();
      const sessionId = await hashSessionToken(appSessionToken);
      setAppSessionCookie(response.headers, appSessionToken, req);

      const redirectUrl = getRedirectUrlCookie(req.headers);
      if (redirectUrl) {
        deleteRedirectUrlCookie(response.headers);
      }

      const googleUser = await getGoogleUser(accessToken);
      console.log("Google user:", JSON.stringify(googleUser, null, 2));

      const user = await getUser(googleUser.id);

      if (!user) {
        const school_name = googleUser.email.slice(-18, -17).toUpperCase();
        if (googleUser.email.endsWith("@nnn.ed.jp")) {
          let gen = Number(googleUser.email.split("_")[1].slice(0, 2));
          let school: User["school"]["name"] = "N";
          if (school_name === "N") {
            gen -= 15;
          } else if (school_name === "S") {
            gen -= 20;
            school = "S";
          } else if (school_name === "R") {
            gen -= 25;
            school = "R";
          }

          const user: User = {
            id: googleUser.id,
            email: googleUser.email,
            name: googleUser.name,
            school: {
              name: school,
              gen,
              admission_month: "",
            },
            avatarUrl: googleUser.picture,
            sessionId,
            googleAccessToken: accessToken,
          };
          await createUser(user);
        } else if (googleUser.email.endsWith("@n-jr.jp")) {
          const gen = Number(googleUser.email.split("_")[1].slice(0, 2));
          const user: User = {
            id: googleUser.id,
            email: googleUser.email,
            name: googleUser.name,
            school: {
              name: "NJR",
              gen,
              admission_month: "",
            },
            avatarUrl: googleUser.picture,
            sessionId,
            googleAccessToken: accessToken,
          };
          await createUser(user);
        }
      } else {
        console.log("Existing user:", user);
        await replaceUserSession({
          ...user,
          sessionId,
          googleAccessToken: accessToken,
        }, user.sessionId);
      }

      const savedUser = await getUser(googleUser.id);
      console.log("Saved user:", JSON.stringify(savedUser, null, 2));

      return response;
    } catch (error) {
      console.error("Callback handler error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
