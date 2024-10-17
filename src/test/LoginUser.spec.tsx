// LoginForm.test.tsx
import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import LoginForm from "../views/home/components/parts/LoginForm"
import { FormError } from "../modules/Form/domain/FormError"
import { FormItem } from "../modules/Form/domain/Form"
import "@testing-library/jest-dom"

describe("LoginForm", () => {
  it("should navigate to /plans on submit login", async () => {
    const mockOnSubmit = jest.fn()
    const mockErrors: FormError = {
      document: null,
      phoneNumber: null,
      acceptPrivacyPolicy: null,
      acceptCommercialCommunications: null,
    }
    const mockFormData: FormItem = {
      documentType: "DNI",
      documentNumber: "12345678",
      phoneNumber: "123456789",
      acceptPrivacyPolicy: true,
      acceptCommercialCommunications: true,
    }

    const mockOnInputChange = jest.fn()
    const mockDocumentMaxLength = 11

    render(
      <MemoryRouter initialEntries={["/"]}>
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
          <Route
            path="/plans"
            element={<div data-testid="plans"> Plans </div>}
          />
        </Routes>
      </MemoryRouter>
    )
    const form = screen.getByRole("form")
    expect(form).toBeInTheDocument()

    fireEvent.submit(form)
    expect(mockOnSubmit).toHaveBeenCalled()
  })
})

describe("LoginForm", () => {
  it("should error on submit login", async () => {
    const mockOnSubmit = jest.fn()
    const mockErrors: FormError = {
      document: "Error",
      phoneNumber: "Error",
      acceptPrivacyPolicy: "Error",
      acceptCommercialCommunications: "Error",
    }
    const mockFormData: FormItem = {
      documentType: "DNI",
      documentNumber: "12345678",
      phoneNumber: "123456789",
      acceptPrivacyPolicy: false,
      acceptCommercialCommunications: false,
    }
    const mockOnInputChange = jest.fn()
    const mockDocumentMaxLength = 11

    render(
      <MemoryRouter initialEntries={["/"]}>
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
          <Route
            path="/plans"
            element={<div data-testid="plans"> Plans </div>}
          />
        </Routes>
      </MemoryRouter>
    )
    const form = screen.getByRole("form")
    expect(form).toBeInTheDocument()

    const errorLabel = form.getElementsByClassName("errorLabel")
    expect(errorLabel).toHaveLength(2)
  })
})
