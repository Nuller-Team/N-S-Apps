import { Handlers, PageProps } from "$fresh/server.ts";
import db from "utils/mongodb.ts";
import type { VerifyDataType } from "types/db.ts";

const Verify = db.collection<VerifyDataType>("Verify");

export const handler: Handlers = {
  async GET(req, ctx) {
    const token = ctx.params.token;
    if (!token) {
      return ctx.render("ERROR");
    }
    const check = await Verify.findOne({ token: token });
    if (!check) {
      return ctx.render("ERROR2");
    }
    await Verify.deleteMany({ token: token });
    return ctx.render();
  },
};

export default function verifyPage({ data }: PageProps<string>) {
  if (data == "ERROR" || data == "ERROR2") return ("ERROR");
  return ("HELLO");
}
