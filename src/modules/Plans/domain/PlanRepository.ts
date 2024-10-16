import { Plan } from "./Plan";

export interface PlanRepository {
    getPlans(): Promise<Plan[]>
}