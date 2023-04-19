import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { User, UserCookie } from "@/utils/mongodb.ts";
import type {State} from "@/types/session.ts"

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>
) {
  const cookies = getCookies(req.headers);
  const remember_me = cookies["remember-me"];
  if (!remember_me) return ctx.next();
  const UserId = await UserCookie.findOne({ token: remember_me });
  if (!UserId) return ctx.next();
  const UserData = await User.findOne({ id: UserId.id });
  if (!UserData) return ctx.next();
  ctx.state = {
    id: UserData.id,
    email: UserData.email,
    school: UserData.school,
    gen: UserData.gen,
    admission_month: UserData.admission_month,
    token: remember_me,
  }
  return ctx.next();
}
