import "./styles/Header.scss"
import logo from "./assets/RimacLogo.svg"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate()

  const toHome = () => {
    navigate("/")
  }
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo" onClick={toHome} />
      <div className="header__contact">
        <span className="header__slogan">¡Compra por este medio!</span>
        <span className="header__number">(01) 411 6001</span>
      </div>
    </header>
  )
}
