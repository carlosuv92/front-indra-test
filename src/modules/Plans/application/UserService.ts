import { PlanRepository } from "../domain/PlanRepository"

export const userService = (repository: PlanRepository) => {
    return {
        getUser: async () => await repository.getPlans(),
    }
}