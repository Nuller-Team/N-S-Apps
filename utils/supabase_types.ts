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
          id: string;
          email: string;
          school: "N" | "S" | "NJR";
          gen: number;
          admission_month: "4" | "7" | "10" | "1";
          name: {
            full: string;
            given: string;
            family: string;
          };
          image: string;
        };
        Insert: {
          id: string;
          email: string;
          school: "N" | "S" | "NJR";
          gen: number;
          admission_month?: "4" | "7" | "10" | "1";
          name?: {
            full?: string;
            given?: string;
            family?: string;
          };
          image?: string;
        };
        Update: {
          id?: string;
          email?: string;
          school?: "N" | "S" | "NJR";
          gen?: number;
          admission_month?: "4" | "7" | "10" | "1";
          name?: {
            full?: string;
            given?: string;
            family?: string;
          };
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
