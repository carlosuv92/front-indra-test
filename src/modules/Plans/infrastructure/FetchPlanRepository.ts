import { cleanPlan, Plan } from "../domain/Plan";
import { PlanRepository } from "../domain/PlanRepository";

export const FetchPlanRepository = (): PlanRepository => {
    return {
        getPlans: async () => {
            const response = await fetch("https://rimac-front-end-challenge.netlify.app/api/plans.json");
            const data = await response.json();
            if (data) {
                return cleanPlan(data.list) as Plan[];
            }
            throw new Error("No se pudo obtener los planes");
        },
    }
}
