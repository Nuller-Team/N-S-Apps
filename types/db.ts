interface UserCookieType {
  id: string;
  token: string;
}
interface UserDataType {
  id: string;
  school: "N" | "S";
  th: number;
}

export type { UserCookieType, UserDataType };
