const KV_PATH_KEY = "KV_PATH";
let path = undefined;
if (
  (await Deno.permissions.query({ name: "env", variable: KV_PATH_KEY }))
    .state === "granted"
) {
  path = Deno.env.get(KV_PATH_KEY);
}
export const kv = await Deno.openKv(path);

// Helpers
async function getValue<T>(
  key: Deno.KvKey,
  options?: { consistency?: Deno.KvConsistencyLevel },
) {
  const res = await kv.get<T>(key, options);
  return res.value;
}

async function _getValues<T>(
  selector: Deno.KvListSelector,
  options?: Deno.KvListOptions,
) {
  const values = [];
  const iter = kv.list<T>(selector, options);
  for await (const { value } of iter) values.push(value);
  return values;
}

// User
export interface User {
  id: string;
  email: string;
  name: string;
  school: {
    name: "N" | "S" | "R" | "NJR";
    gen: number;
    admission_month: "4" | "7" | "10" | "1" | "";
  };
  avatarUrl: string;

  sessionId: string;
}

/**
 * Creates a new user in KV. Throws if the user already exists.
 *
 * @example
 * ```ts
 * import { createUser, newUser } from "@/utils/db.ts";
 *
 * const user = {
 *   id: "id",
 *   login: "login",
 *   email: "example@nnn.ed.jp",
 *   school: {
 * }
 *   avatarUrl: "https://example.com/avatar-url",
 *   sessionId: "sessionId",
 * };
 * await createUser(user);
 * await incrementAnalyticsMetricPerDay("users_count", new Date());
 */
export async function createUser(user: User) {
  const usersKey = ["users", user.id];
  const usersBySessionKey = ["users_by_session", user.sessionId];

  const atomicOp = kv.atomic();

  const res = await atomicOp
    .check({ key: usersKey, versionstamp: null })
    .check({ key: usersBySessionKey, versionstamp: null })
    .set(usersKey, user)
    .set(usersBySessionKey, user)
    .commit();

  if (!res.ok) throw new Error(`Failed to create user: ${user}`);
}

export async function updateUser(user: User) {
  const usersKey = ["users", user.id];
  const usersBySessionKey = ["users_by_session", user.sessionId];

  const atomicOp = kv.atomic();

  const res = await atomicOp
    .set(usersKey, user)
    .set(usersBySessionKey, user)
    .commit();

  if (!res.ok) throw new Error(`Failed to update user: ${user}`);
}

export async function deleteUserBySession(sessionId: string) {
  await kv.delete(["users_by_session", sessionId]);
}

export async function getUser(id: string) {
  return await getValue<User>(["users", id]);
}

export async function getUserByLogin(login: string) {
  return await getValue<User>(["users_by_login", login]);
}

export async function getUserBySession(sessionId: string) {
  const usersBySessionKey = ["users_by_session", sessionId];
  return await getValue<User>(usersBySessionKey, {
    consistency: "eventual",
  }) ?? await getValue<User>(usersBySessionKey);
}

export async function getManyUsers(ids: string[]) {
  const keys = ids.map((id) => ["users", id]);
  const res = await kv.getMany<User[]>(keys);
  return res.map((entry) => entry.value!);
}
