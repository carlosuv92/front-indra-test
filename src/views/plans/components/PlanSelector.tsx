import { Plan } from "../../../modules/Plans/domain/Plan"
import "../styles/PlanSelector.scss"

interface PlanSelectorProps {
  plan: Plan
  onClick: () => void
  selected: number
}

export default function PlanSelector({
  onClick,
  plan,
  selected,
}: PlanSelectorProps) {
  return (
    <div className="container__selector__plans">
      <div className="headerText">
        <div className="container__selector__plans__plan">
          <div className="container__selector__item__name">{plan.name}</div>
          <img src={plan.image} alt="logo" />
        </div>
        <div className="container__selector__plans__label">COSTO DEL PLAN</div>
        {selected == 1 && (
          <div className="container__selector__plans__amount__before">
            $ {plan.price} antes
          </div>
        )}
        <div className="container__selector__plans__amount">
          $ {plan.price - (selected == 1 ? plan.price * 0.05 : 0)} al mes
        </div>
      </div>
      <hr />
      <div className="mt-6 container__selector__plans__descriptions">
        <ul className="container__selector__plans__description">
          {plan.description.map((description, index) => (
            <li key={index}>{description}</li>
          ))}
        </ul>
      </div>
      <button className="buttonSelectPlan" onClick={onClick}>
        Seleccionar Plan
      </button>
    </div>
  )
}
