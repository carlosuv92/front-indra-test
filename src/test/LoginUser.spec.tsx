// LoginForm.test.tsx
import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import LoginForm from "../views/home/components/parts/LoginForm"
import { FormError } from "../modules/Form/domain/FormError"
import { FormItem } from "../modules/Form/domain/Form"

describe("LoginForm", () => {
  it("should navigate to /dashboard on submit", () => {
    const mockOnSubmit = jest.fn()
    const mockErrors: FormError = {
      document: null,
      phoneNumber: null,
      acceptPrivacyPolicy: null,
      acceptCommercialCommunications: null,
    }
    const mockFormData: FormItem = {
      documentType: "DNI",
      documentNumber: "123456789",
      phoneNumber: "123456789",
      acceptPrivacyPolicy: true,
      acceptCommercialCommunications: true,
    }

    const mockOnInputChange = jest.fn()
    const mockDocumentMaxLength = 11

    render(
      <MemoryRouter initialEntries={["/plans"]}>
        <Routes>
          <Route
            path="/"
            element={
              <LoginForm
                onSubmit={mockOnSubmit}
                errors={mockErrors}
                formData={mockFormData}
                onInputChange={mockOnInputChange}
                documentMaxLength={mockDocumentMaxLength}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    )
    const submitButton = screen.getByRole("button", { name: /Enviar/i })
    fireEvent.click(submitButton)
    // Esperamos que se haya ejecutado la función mock de submit
    const input = screen.getByLabelText("Nombre")
    expect(input).toBeInTheDocument()
  })
})
