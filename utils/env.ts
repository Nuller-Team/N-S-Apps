import { Env } from "https://deno.land/x/env@v2.2.3/env.js";
const env = new Env();

const CLIENT_ID = env.require("GOOGLE_CLIENT_ID");
const CLIENT_SECRET = env.require("GOOGLE_CLIENT_SECRET");
const REDIRECT_URI = env.require("REDIRECT_URL");
const MONGO_URI = env.require("MONGODB_URL");

export default {
  CLIENT_ID,
  CLIENT_SECRET,
  MONGO_URI,
  REDIRECT_URI,
};
