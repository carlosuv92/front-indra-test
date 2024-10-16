import { useEffect, useState } from "react"
import { LocalStorageRepository } from "../../modules/Users/infrastructure/LocalStorageRepository"
import { usePlanContext } from "../plans/PlanContext"
import "./styles/Resume.scss"
import { User } from "../../modules/Users/domain/User"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

const localRepository = LocalStorageRepository()

export default function Resume() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User>()
  useEffect(() => {
    localRepository.getUser().then((data) => {
      setUser(data)
    })
  }, [])
  const { selectedPlan } = usePlanContext()
  const returnToPlan = () => {
    navigate("/plans")
  }
  return (
    <div>
      <div className="resume">
        <div>
          <div className="resume__prev" onClick={() => returnToPlan()}>
            <FontAwesomeIcon
              style={{ marginRight: "10px" }}
              icon={faArrowCircleLeft}
            />
            Volver
          </div>
          <div className="resume__title">Resumen del Seguro</div>
          <div className="resume__content">
            <div className="resume__content__value">
              <span>PRECIO CALCULADOS PARA:</span>
              <p className="nameLead">
                {user?.name} {user?.lastName}
              </p>
              <hr />
              <div>
                <div className="resume__content__value__title">
                  Responsable de Pago
                </div>
                <div>
                  <span className="resume__content__value__type">
                    {user?.documentType}:{" "}
                  </span>{" "}
                  <span className="resume__content__value__type__val">
                    {user?.documentNumber}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="resume__content__value__type">
                    Celular:{" "}
                  </span>{" "}
                  <span className="resume__content__value__type__val">
                    {user?.phoneNumber}
                  </span>
                </div>
              </div>

              <div>
                <div className="resume__content__value__title">
                  Plan Elegido
                </div>
                <div>
                  <span className="resume__content__value__type__val">
                    {selectedPlan?.name}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="resume__content__value__type">
                    Costo del Plan:{" "}
                  </span>{" "}
                  <span className="resume__content__value__type__val">
                    $ {selectedPlan?.price} al mes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
