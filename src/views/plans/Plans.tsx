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
import { LocalStorageRepository } from "../../modules/Users/infrastructure/LocalStorageRepository"
import { User } from "../../modules/Users/domain/User"

const repository = FetchPlanRepository()
const localRepository = LocalStorageRepository()

export default function Plans() {
  const navigate = useNavigate()
  const { setSelectedPlan } = usePlanContext()
  const [plans, setPlans] = useState<Plan[]>([])
  const [step, setStep] = useState(300)
  const [user, setUser] = useState<User>()

  const getPlans = async () => {
    let data = await repository.getPlans()
    setPlans(data)
    if (plans.length == 2) {
      setStep(150)
    }
  }

  useEffect(() => {
    getPlans()
    localRepository.getUser().then((data) => {
      setUser(data)
    })

    validateMediaQuery()
  }, [])

  const [selected, setSelected] = useState<number | null>(null)
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
    getPlans()
  }

  const selectPlan = (plan: Plan) => {
    let price = plan.price
    let newPlan = {
      ...plan,
      price: selected == 1 ? price - price * 0.05 : price,
    }
    setSelectedPlan(newPlan)
    navigate("/resume")
  }

  const handlePrev = (index: number) => {
    let stepVal = (1 - index) * (plans.length == 3 ? 300 : 150)
    setStep(stepVal)
  }

  const validateMediaQuery = () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setStep(0)
    }
  }

  return (
    <div className="container">
      <div className="container__content">
        <div className="greetings" data-testid="greetings">
          {user?.name} ¿Para quién deseas cotizar?
        </div>
        <div className="optionText">
          Selecciona la opción que se ajuste más a tus necesidades.
        </div>
      </div>
      <div className="container__selector">
        {options.map((option, index) => (
          <div>
            <FirstSelector
              key={option.id}
              onClick={() => handleClick(index)}
              selected={selected === index}
              option={options[index]}
            />
          </div>
        ))}
      </div>
      {selected != null && (
        <>
          <div
            className="container_plans"
            style={{ transform: `translateX(${step}px)` }}
          >
            {plans.map((plan, index) => (
              <PlanSelector
                key={index}
                plan={plan}
                onClick={() => selectPlan(plan)}
                selected={selected}
              />
            ))}
          </div>
          <div className="buttonNumbers">
            {plans.map((_, index) => (
              <button
                className="buttonNext"
                onClick={() => handlePrev(index)}
                key={index}
              >
                {`${index + 1}`}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
