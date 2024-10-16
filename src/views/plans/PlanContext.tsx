// PlanContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react"
import { Plan } from "../../modules/Plans/domain/Plan"

interface PlanContextType {
  selectedPlan: Plan | null
  setSelectedPlan: (plan: Plan | null) => void
}

const PlanContext = createContext<PlanContextType | undefined>(undefined)

export const PlanProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

  return (
    <PlanContext.Provider value={{ selectedPlan, setSelectedPlan }}>
      {children}
    </PlanContext.Provider>
  )
}

export const usePlanContext = () => {
  const context = useContext(PlanContext)
  if (!context) {
    throw new Error("usePlanContext must be used within a PlanProvider")
  }
  return context
}
