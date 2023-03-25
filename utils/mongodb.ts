import { MongoClient } from "mongoDB/mod.ts";
import env from "./env.ts";
import type {
  UserCookieType,
  UserDataType,
  VerifyDataType,
} from "@/types/db.ts";

const client = new MongoClient();
await client.connect(`${env.MONGO_URI}?authMechanism=SCRAM-SHA-1`);
const db = client.database("N-S-CAPTCHA");

const User = db.collection<UserDataType>("User");
const UserCookie = db.collection<UserCookieType>("UserCookie");
const Verify = db.collection<VerifyDataType>("Verify");

export default db;
export { User, UserCookie, Verify };
