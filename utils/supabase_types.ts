export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      user: {
        Row: {
          email: string;
          school: "N" | "S" | "NJR";
          gen: number;
          admission_month: "4" | "7" | "10" | "1";
          name: string;
          image: string;
        };
        Insert: {
          email: string;
          school: "N" | "S" | "NJR";
          gen: number;
          admission_month?: "4" | "7" | "10" | "1";
          name?: string;
          image?: string;
        };
        Update: {
          email?: string;
          school?: "N" | "S" | "NJR";
          gen?: number;
          admission_month?: "4" | "7" | "10" | "1";
          name?: string;
          image?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
