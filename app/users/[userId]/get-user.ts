import { get } from "@/app/common/utils/fetch";
import { User } from "../interfaces/user.interface";

export default async function getUser(userId: string) {
  return get<User>(`users/${userId}`);
}
