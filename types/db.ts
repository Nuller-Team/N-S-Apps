interface UserCookieType {
  id: string;
  token: string;
}
interface UserDataType {
  id: string;
  email: string;
  school: "N" | "S";
  gen: number;
}

interface VerifyDataType {
  token: string;
  name: string;
  school: "N" | "S";
  gen: number;
}

export type { UserCookieType, UserDataType, VerifyDataType };
