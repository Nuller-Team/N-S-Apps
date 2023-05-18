interface user {
  id: string;
  email: string;
  name: string;
  school: {
    name: "N" | "S" | "NJR";
    gen: number;
    admission_month: "4" | "7" | "10" | "1" | "";
  };
  avatar_url: string;
  access_token: string;
}
export type { user };
