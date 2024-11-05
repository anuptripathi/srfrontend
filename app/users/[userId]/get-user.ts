import { get } from "@/app/common/util/fetch";
import { User } from "../interfaces/user.interface";

export default async function getUser(userId: string) {
  return get<User>(`users/${userId}`);
}
