import { MongoClient } from "mongoDB/mod.ts";
import env from "./env.ts";

const client = new MongoClient();
await client.connect(`${env.MONGO_URI}?authMechanism=SCRAM-SHA-1`);
const db = client.database("N-S-CAPTCHA");

export default db;
