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
    const [day, month, year] = birthDay.split('-').map(Number); // Convertir a números
    const birthDate = new Date(year, month - 1, day); // Crear fecha correcta
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
};
