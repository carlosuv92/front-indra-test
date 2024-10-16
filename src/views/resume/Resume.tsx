import { usePlanContext } from "../plans/PlanContext"
import "./styles/Resume.scss"

export default function Resume() {
  const { selectedPlan } = usePlanContext()

  return (
    <div>
      <div className="resume">
        Resumen del Seguro
        <div className="resume__content">
          <span>Precios calculados para:</span>
          <p>Nombre</p>
        </div>
      </div>
    </div>
  )
}
