import "./styles/Footer.scss"
import logo from "./assets/RimacLogoBlack.svg"

export default function Footer() {
  return (
    <footer className="footer">
      <img className="footer__logo" src={logo} alt="logo" />
      <span className="footer__text">© 2023 RIMAC Seguros y Reaseguros.</span>
    </footer>
  )
}
