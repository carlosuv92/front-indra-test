import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export const userService = (repository: UserRepository) => {
    return {
        getUser: async () => await repository.getUser(),
        saveUser: async (user: User) => await repository.saveUser(user)
    }
}