import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export const FetchUserRepository = (): UserRepository => {
    return {
        getUser: async () => {
            const response = await fetch("https://rimac-front-end-challenge.netlify.app/api/user.json");
            const data = await response.json() as User;
            return data;
        },
        saveUser: async () => { }

    }
}