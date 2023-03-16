interface UserCookieType {
  id: string;
  token: string;
}
interface UserDataType {
  id: string;
  email: string;
  school: "N" | "S";
  th: number;
}

export type { UserCookieType, UserDataType };
