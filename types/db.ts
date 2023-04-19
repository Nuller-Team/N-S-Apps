interface UserCookieType {
  id: string;
  token: string;
}

interface UserDataType {
  id: string;
  email: string;
  school: "N" | "S";
  gen: number;
  admission_month: "4" | "7" | "10" | "1" | "";
}

interface VerifyDataType {
  token: string;
  name: string;
  id: string;
  school: "N" | "S";
  gen: number;
  times: number;
}

export type { UserCookieType, UserDataType, VerifyDataType };
