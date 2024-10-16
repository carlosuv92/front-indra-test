import "./styles/Body.scss"
import family from "./assets/family.png"
import blurAsset from "./assets/blur-asset.png"
import blurRightAsset from "./assets/blur-asset-right.png"
import blurAssetMobile from "./assets/blur-asset-mobile.png"
import blurAssetRightMobile from "./assets/blur-asset-right-mobile.png"
import { useNavigate } from "react-router-dom"
import LoginForm from "./parts/LoginForm"
import { useEffect, useState } from "react"
import { FormError } from "../../../modules/Form/domain/FormError"
import { useForm } from "react-hook-form"
import { FetchTaskRepository } from "../../../modules/Users/infrastructure/FetchTaskRepository"
import { User } from "../../../modules/Users/domain/User"
import { LocalStorageRepository } from "../../../modules/Users/infrastructure/LocalStorageRepository"

const errorMessage = {
  document: "*El documento ingresado no es válido",
  phoneNumber: "*El celular ingresado no es válido",
  acceptPrivacyPolicy: "Por favor, acepta la Política de Privacidad.",
  acceptCommercialCommunications:
    "Por favor, acepta la Política de Comunicaciones Comerciales.",
}
const repository = FetchTaskRepository()
const localRepository = LocalStorageRepository()

export default function Body() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User>()
  useEffect(() => {
    repository.getUser().then(setUser)
  }, [])

  const [formData, setFormData] = useState({
    documentType: "DNI",
    documentNumber: "",
    phoneNumber: "",
    acceptPrivacyPolicy: false,
    acceptCommercialCommunications: false,
  })

  const [errors, setErrors] = useState<FormError>({
    document: null,
    phoneNumber: null,
    acceptPrivacyPolicy: null,
    acceptCommercialCommunications: null,
  })

  const [documentMaxLength, setDocumentMaxLength] = useState(8)
  const { register, handleSubmit } = useForm()

  const validateForm = () => {
    let hasError = false
    const newErrors: FormError = {
      document: null,
      phoneNumber: null,
      acceptPrivacyPolicy: null,
      acceptCommercialCommunications: null,
    }

    if (
      (formData.documentType === "DNI" &&
        formData.documentNumber.length !== 8) ||
      (formData.documentType === "RUC" && formData.documentNumber.length !== 11)
    ) {
      newErrors.document = errorMessage.document
      hasError = true
    }

    if (formData.phoneNumber.length < 1) {
      newErrors.phoneNumber = errorMessage.phoneNumber
      hasError = true
    }

    if (!formData.acceptPrivacyPolicy) {
      newErrors.acceptPrivacyPolicy = errorMessage.acceptPrivacyPolicy
      hasError = true
    }

    if (!formData.acceptCommercialCommunications) {
      newErrors.acceptCommercialCommunications =
        errorMessage.acceptCommercialCommunications
      hasError = true
    }

    setErrors(newErrors)
    return !hasError
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    }
    const newErrors = { ...errors }

    // Limpia los errores de los campos al escribir
    newErrors.document = null
    newErrors.phoneNumber = null
    newErrors.acceptPrivacyPolicy = null
    newErrors.acceptCommercialCommunications = null

    if (name === "documentType") {
      newFormData.documentNumber = ""
      setDocumentMaxLength(newFormData.documentType === "DNI" ? 8 : 11)
    } else if (name === "documentNumber") {
      if (
        (formData.documentType === "DNI" && value.length === 8) ||
        (formData.documentType === "RUC" && value.length === 11)
      ) {
        newErrors.document = null
      } else {
        newErrors.document = errorMessage.document
      }
    } else if (name === "phoneNumber") {
      if (value.length < 9) {
        newErrors.phoneNumber = errorMessage.phoneNumber
      }
    }

    setFormData(newFormData)
    setErrors(newErrors)
  }

  const onSubmit = handleSubmit((e) => {
    console.log("data", e)
    register("documentNumber")
    if (validateForm() && user) {
      console.log("Form valido", formData)
      const newUser: User = {
        documentType: formData.documentType,
        documentNumber: formData.documentNumber,
        phoneNumber: formData.phoneNumber,
        name: user.name,
        birthDay: user.birthDay,
        lastName: user.lastName,
      }
      localRepository.saveUser(newUser)
      navigate("/plans")
    }
  })

  return (
    <main className="main">
      <div className="main__content">
        <img src={family} alt="logo" className="main__family" />
        <div className="main__content__right">
          <div className="main__content__right__mobile">
            <div>
              <div className="main__badge">Seguro Salud Flexible</div>
              <h1>Creado para ti y tu familia</h1>
            </div>
            <img src={family} alt="logo" className="main__family__mobile" />
          </div>
          <hr className="hr__mobile" />
          <LoginForm
            onSubmit={onSubmit}
            errors={errors}
            formData={formData}
            onInputChange={handleInputChange}
            documentMaxLength={documentMaxLength}
          />
        </div>
      </div>
      <img src={blurAsset} className="main__blur" />
      <img src={blurAssetMobile} className="main__blur__mobile" />
      <img src={blurRightAsset} className="main__blur-right" />
      <img src={blurAssetRightMobile} className="main__blur-right__mobile" />
    </main>
  )
}
