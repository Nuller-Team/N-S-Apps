interface UserCookieType {
  id: string;
  token: string;
}

interface UserDataType {
  id: string;
  email: string;
  school: "N" | "S" | "NJR";
  gen: number;
  admission_month: "4" | "7" | "10" | "1" | "";
}

interface VerifyDataType {
  token: string;
  name: string;
  id: string;
  school: "N" | "S" | "NJR";
  gen: number;
}

export type { UserCookieType, UserDataType, VerifyDataType };
