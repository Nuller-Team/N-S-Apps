import env from "./env.ts";

export const auth_url = `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=${env.CLIENT_ID}&redirect_uri=${env.SERVER_URL}/login/callback`