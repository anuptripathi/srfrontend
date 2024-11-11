import { User, UserTypes } from "../interfaces/user-types-enum";

export function isAccountOwner(user: User) {
  return user._id === user.accountId;
}

export function isAccountOwnerAdmin(user: User) {
  return isAccountOwner(user) && user.uType === UserTypes.ADMIN;
}
