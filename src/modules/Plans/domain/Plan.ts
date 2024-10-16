export interface Plan {
    name: string;
    price: number;
    age: number;
    image?: any;
    description: string[];
}

type MapImagesKeys = 'Plan en Casa' | 'Plan en Casa y Clínica' | 'Plan en Casa + Chequeo ';

export const mapImages: Record<MapImagesKeys, string> = {
    'Plan en Casa': '/IcHomeLight.png',
    'Plan en Casa y Clínica': '/IcHospitalLight.png',
    'Plan en Casa + Chequeo ': '/IcHomeLight.png',
}

export function cleanPlan(plans: Plan[]): Plan[] {
    let newPlans: Plan[] = [];

    plans.forEach(plan => {
        if (plan.name in mapImages) {
            newPlans.push({
                ...plan,
                image: mapImages[plan.name as MapImagesKeys],
            });
        }
    });

    return newPlans;
}
