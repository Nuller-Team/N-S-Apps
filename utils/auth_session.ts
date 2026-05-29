import { deleteCookie, getCookies, setCookie } from "@std/http/cookie";

export const APP_SESSION_COOKIE_NAME = "app_session";
const SESSION_BYTES = 32;
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function base64Url(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function createSessionToken() {
  const bytes = new Uint8Array(SESSION_BYTES);
  crypto.getRandomValues(bytes);
  return base64Url(bytes);
}

export async function hashSessionToken(token: string) {
  const data = new TextEncoder().encode(token);
  return toHex(await crypto.subtle.digest("SHA-256", data));
}

export function getAppSessionToken(headers: Headers) {
  return getCookies(headers)[APP_SESSION_COOKIE_NAME];
}

export function setAppSessionCookie(
  headers: Headers,
  token: string,
  req: Request,
) {
  setCookie(headers, {
    name: APP_SESSION_COOKIE_NAME,
    value: token,
    path: "/",
    httpOnly: true,
    secure: new URL(req.url).protocol === "https:",
    sameSite: "Lax",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export function deleteAppSessionCookie(headers: Headers) {
  deleteCookie(headers, APP_SESSION_COOKIE_NAME, { path: "/" });
}
