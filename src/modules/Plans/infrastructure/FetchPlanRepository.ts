import { cleanPlan, Plan } from "../domain/Plan";
import { PlanRepository } from "../domain/PlanRepository";
import { LocalStorageRepository } from "../../Users/infrastructure/LocalStorageRepository"
import { User } from "../../Users/domain/User";


export const FetchPlanRepository = (): PlanRepository => {
    const { getUser } = LocalStorageRepository()
    return {
        getPlans: async () => {
            const user: User = await getUser()
            const response = await fetch("https://rimac-front-end-challenge.netlify.app/api/plans.json");
            const data = await response.json();
            if (data) {
                let ageUser = validateAge(user.birthDay)
                return cleanPlan(data.list, ageUser) as Plan[];
            }
            throw new Error("No se pudo obtener los planes");
        },
    }
}


export const validateAge = (birthDay: string): number => {
    const date = new Date(birthDay);
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    if (today.getMonth() < date.getMonth()) {
        age--;
    }
    if (today.getMonth() === date.getMonth() && today.getDate() < date.getDate()) {
        age--;
    }
    return age;
}
