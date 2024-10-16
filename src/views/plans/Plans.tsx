import { useEffect, useState } from "react"
import FirstSelector from "./components/FirstSelector"
import IcAddUserLight from "./assets/IcAddUserLight.png"
import IcProtectionLight from "./assets/IcProtectionLight.png"
import { FetchPlanRepository } from "../../modules/Plans/infrastructure/FetchPlanRepository"
import "./styles/Plans.scss"
import { useNavigate } from "react-router-dom"
import { Plan } from "../../modules/Plans/domain/Plan"
import PlanSelector from "./components/PlanSelector"
import { usePlanContext } from "./PlanContext"

const repository = FetchPlanRepository()

export default function Plans() {
  const navigate = useNavigate()
  const { setSelectedPlan } = usePlanContext()
  const [plans, setPlans] = useState<Plan[]>([])
  useEffect(() => {
    repository.getPlans().then((data) => {
      console.log(data) // Verifica el valor de data
      setPlans(data)
    })
  }, [])

  const [selected, setSelected] = useState(0)
  const [options] = useState([
    {
      id: 0,
      name: "Para mi",
      image: IcAddUserLight,
      description:
        "Cotiza tu seguro de salud y agrega familiares si así lo deseas.",
    },
    {
      name: "Para alguien más",
      id: 1,
      image: IcProtectionLight,
      description:
        "Realiza una cotización para uno de tus familiares o cualquier persona.",
    },
  ])

  const handleClick = (index: number) => {
    setSelected(index)
  }

  const selectPlan = (plan: Plan) => {
    setSelectedPlan(plan)
    navigate("/resume")
  }

  return (
    <div className="container">
      <div className="container__content">
        <div className="greetings">Rocío ¿Para quién deseas cotizar?</div>
        <div className="optionText">
          Selecciona la opción que se ajuste más a tus necesidades.
        </div>
      </div>
      <div className="container__selector">
        {options.map((option, index) => (
          <FirstSelector
            key={option.id}
            onClick={() => handleClick(index)}
            selected={selected === index}
            option={options[index]}
          />
        ))}
      </div>
      <div className="container_plans">
        {plans.map((plan, index) => (
          <PlanSelector
            key={index}
            plan={plan}
            onClick={() => selectPlan(plan)}
          />
        ))}
      </div>
    </div>
  )
}
