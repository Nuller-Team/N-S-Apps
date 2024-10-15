import { Handlers } from "$fresh/server.ts";
import { State } from "@/routes/_middleware.ts";

import { handleCallback } from "kv_oauth";
import { oauth2Client } from "@/utils/oauth2_client.ts";
import {
  deleteRedirectUrlCookie,
  getRedirectUrlCookie,
} from "@/utils/redirect.ts";
import {
  createUser,
  deleteUserBySession,
  getUser,
  updateUser,
  User,
} from "@/utils/db.ts";

async function getGoogleUser(accessToken: string): Promise<GoogleUser> {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
  );
  if (!response.ok) {
    await response.body?.cancel();
    throw new Error();
  }
  return (await response.json()) as GoogleUser;
}

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  hd: string;
}

// deno-lint-ignore no-explicit-any
export const handler: Handlers<any, State> = {
  async GET(req, _ctx) {
    const { response, accessToken, sessionId } = await handleCallback(
      req,
      oauth2Client,
      getRedirectUrlCookie(req.headers),
    );
    deleteRedirectUrlCookie(response.headers);

    const googleUser = await getGoogleUser(accessToken);

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
        }

        const user: User = {
          id: googleUser.id,
          email: googleUser.email,
          name: googleUser.name,
          school: {
            name: school,
            gen: gen,
            admission_month: "",
          },
          avatarUrl: googleUser.picture,

          sessionId: sessionId,
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
            gen: gen,
            admission_month: "",
          },
          avatarUrl: googleUser.picture,

          sessionId: sessionId,
        };
        await createUser(user);
      }
    } else {
      await deleteUserBySession(sessionId);
      await updateUser({ ...user, sessionId });
    }
    return response;
  },
};
