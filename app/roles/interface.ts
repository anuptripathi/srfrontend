import { Permission } from "../permissions/interface";
export interface Role {
  _id: string;
  name: string;
  description: string;
  permissions?: Permission[];
  uType?: string;
}
