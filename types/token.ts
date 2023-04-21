interface tokenResponse {
  status: "Error" | "Success";
  school?: "N" | "S" | "NJR";
  text: string;
}

export type { tokenResponse };
