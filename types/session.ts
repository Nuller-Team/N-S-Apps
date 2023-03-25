import { UserDataType } from "./db.ts";
interface State extends UserDataType {
  token: string;
}

export type { State };
