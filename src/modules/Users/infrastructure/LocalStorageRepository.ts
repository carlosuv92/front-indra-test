import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export const LocalStorageRepository = (): UserRepository => {
    return {
        getUser: async () => {
            const user = localStorage.getItem("user");
            if (user) {
                return JSON.parse(user);
            }
            return null;
        },
        saveUser: async (user: User) => {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }
}