export enum UserTypes {
  SUPERADMIN = "superadmin",
  PARTNER = "partner",
  ADMIN = "admin",
  ENDUSER = "enduser", // can be moderator/supervisor as per role
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  uType: string;
  roleId: string;
}
