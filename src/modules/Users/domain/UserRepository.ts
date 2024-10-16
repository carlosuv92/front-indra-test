import { User } from "./User";

export interface UserRepository {
    getUser(): Promise<User>
    saveUser(user: User): Promise<void>
}