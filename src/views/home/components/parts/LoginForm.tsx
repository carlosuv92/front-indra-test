import "../styles/Login.scss"
import { FormItem } from "../../../../modules/Form/domain/Form"
import { FormError } from "../../../../modules/Form/domain/FormError"
import { faAngleDown, faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface LoginFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  errors: FormError
  formData: FormItem
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  documentMaxLength: number
}

const LoginForm = ({
  onSubmit,
  errors,
  formData,
  onInputChange,
  documentMaxLength,
}: LoginFormProps) => {
  return (
    <form onSubmit={onSubmit} role="form">
      <h2>
        Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
        asesoría. 100% online.
      </h2>
      <div className="inputSelect">
        <div className="inputSelect--select">
          <select id="documentType" name="documentType">
            <option value="DNI">DNI</option>
            <option value="RUC">RUC</option>
          </select>
          <FontAwesomeIcon icon={faAngleDown} className="i" />
        </div>

        <div className="input__login">
          <input
            type="text"
            id="document"
            name="documentNumber"
            placeholder=" "
            value={formData.documentNumber}
            onChange={onInputChange}
            maxLength={documentMaxLength}
            onInput={(e) => {
              const input = e.target as HTMLInputElement
              input.value = input.value.replace(/[^\d]/g, "")
            }}
          />

          <label htmlFor="document" className="before">
            <div className="paragraph font-br-sonoma-medium">
              Nro. de documento
            </div>
          </label>
        </div>
      </div>
      {errors.document && <div className="errorLabel">{errors.document}</div>}

      <div className="input__login mt-6">
        <input
          type="text"
          id="cel"
          name="phoneNumber"
          placeholder=" "
          value={formData.phoneNumber}
          onChange={onInputChange}
          maxLength={9}
          onInput={(e) => {
            const input = e.target as HTMLInputElement
            input.value = input.value.replace(/[^\d]/g, "")
          }}
        />

        <label htmlFor="cel" className="before">
          <div className="paragraph font-br-sonoma-medium">Celular</div>
        </label>
      </div>

      {errors.phoneNumber && (
        <div className="errorLabel">{errors.phoneNumber}</div>
      )}

      <div className="mt-4">
        <label
          className={`check__label ${
            errors.acceptPrivacyPolicy ? "error" : ""
          }`}
        >
          <input
            type="checkbox"
            name="acceptPrivacyPolicy"
            hidden
            checked={formData.acceptPrivacyPolicy}
            onChange={onInputChange}
          />

          <div className="check__label--box">
            {formData.acceptPrivacyPolicy && (
              <FontAwesomeIcon icon={faCheck} className="iconCheck" />
            )}
          </div>

          <div className="politics">Acepto la Política de Privacidad</div>
        </label>

        <label
          className={`check__label mt-4 ${
            errors.acceptCommercialCommunications ? "error" : ""
          }`}
        >
          <input
            type="checkbox"
            name="acceptCommercialCommunications"
            hidden
            checked={formData.acceptCommercialCommunications}
            onChange={onInputChange}
          />

          <div className="check__label--box">
            {formData.acceptCommercialCommunications && (
              <FontAwesomeIcon icon={faCheck} className="iconCheck" />
            )}
          </div>

          <div className="politics">
            Acepto la Política Comunicaciones Comerciales
          </div>
        </label>

        <div className="mt-4">
          <a href="#" className="terms ">
            Aplican Términos y Condiciones.
          </a>
        </div>

        <div className="block-btn mt-6">
          <button aria-label="clear" role="button" className="btnSubmit">
            Cotiza aqui
          </button>
        </div>
      </div>
    </form>
  )
}

export default LoginForm
