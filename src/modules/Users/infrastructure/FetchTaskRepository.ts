import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export const FetchTaskRepository = (): UserRepository => {
    return {
        getUser: async () => {
            const response = await fetch("https://rimac-front-end-challenge.netlify.app/api/user.json");
            const data = await response.json() as User;
            console.log(data);
            return data;
        },
        saveUser: async () => { }

    }
}