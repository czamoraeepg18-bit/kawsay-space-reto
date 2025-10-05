import React, { useState } from "react";
import type { RegisterFormData } from "../../types";
import "./CosmicCadetForm.css";

interface CosmicCadetFormProps {
  onSubmit?: (formData: RegisterFormData) => void | Promise<void>;
  onBackToLogin?: () => void;
  loading?: boolean;
}

// Define un tipo para los errores
type FormErrors = {
  [key in keyof RegisterFormData]?: string;
};

const CosmicCadetForm: React.FC<CosmicCadetFormProps> = ({
  onSubmit,
  onBackToLogin,
  loading = false,
}) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;

    // Limpiar error específico cuando el usuario empiece a escribir
    if (errors[name as keyof RegisterFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "El nombre de usuario es requerido";
    } else if (formData.username.length < 3) {
      newErrors.username = "Mínimo 3 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Debes aceptar los términos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Simulación para desarrollo
        console.log("Registro simulado:", formData);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Registro completado exitosamente");
      }
    } catch (error) {
      console.error("Error en registro:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackClick = (): void => {
    if (onBackToLogin) {
      onBackToLogin();
    }
  };

  const togglePasswordVisibility = (
    field: "password" | "confirmPassword"
  ): void => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  const isFormDisabled = loading || isSubmitting;

  return (
    <div className="cosmic-cadet-form">
      {/* Estrellas decorativas */}
      <div className="star star-1"></div>
      <div className="star star-2"></div>
      <div className="star star-3"></div>
      <div className="star star-4"></div>
      <div className="star star-5"></div>

      {/* Botón de regreso */}
      <button
        onClick={handleBackClick}
        className="back-button"
        disabled={isFormDisabled}
        aria-label="Volver al inicio de sesión"
        title="Volver al inicio de sesión"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M19 12H5M12 19l-7-7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Contenedor del formulario */}
      <div className="form-container">
        {/* Avatar/Logo */}
        <div className="cosmic-avatar">
          <span role="img" aria-label="cohete">
            🚀
          </span>
        </div>

        {/* Título */}
        <h1 className="cosmic-title">REGISTRO DE CADETE CÓSMICO</h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Campo Username */}
          <div className="form-group">
            <label htmlFor="username" className="cosmic-label">
              NOMBRE DE USUARIO:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Ej: AstroExplorer_7"
              className={`cosmic-input ${errors.username ? "error" : ""}`}
              disabled={isFormDisabled}
              autoComplete="username"
              aria-describedby={errors.username ? "username-error" : undefined}
            />
            {errors.username && (
              <div id="username-error" className="error-message" role="alert">
                {errors.username}
              </div>
            )}
          </div>

          {/* Campo Email */}
          <div className="form-group">
            <label htmlFor="email" className="cosmic-label">
              CORREO DE LA MISIÓN:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="tu_email@galaxia.com"
              className={`cosmic-input ${errors.email ? "error" : ""}`}
              disabled={isFormDisabled}
              autoComplete="email"
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <div id="email-error" className="error-message" role="alert">
                {errors.email}
              </div>
            )}
          </div>

          {/* Campo Password */}
          <div className="form-group">
            <label htmlFor="password" className="cosmic-label">
              CONTRASEÑA INTERPLANETARIA:
            </label>
            <div className="input-with-icon">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••••••••••"
                className={`cosmic-input ${errors.password ? "error" : ""}`}
                disabled={isFormDisabled}
                autoComplete="new-password"
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => togglePasswordVisibility("password")}
                disabled={isFormDisabled}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                title={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  {showPassword ? (
                    <>
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line
                        x1="1"
                        y1="1"
                        x2="23"
                        y2="23"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  ) : (
                    <>
                      <path
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  )}
                </svg>
              </button>
            </div>
            {errors.password && (
              <div id="password-error" className="error-message" role="alert">
                {errors.password}
              </div>
            )}
          </div>

          {/* Campo Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="cosmic-label">
              CONFIRMAR CONTRASEÑA:
            </label>
            <div className="input-with-icon">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••••••••••"
                className={`cosmic-input ${
                  errors.confirmPassword ? "error" : ""
                }`}
                disabled={isFormDisabled}
                autoComplete="new-password"
                aria-describedby={
                  errors.confirmPassword ? "confirm-password-error" : undefined
                }
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                disabled={isFormDisabled}
                aria-label={
                  showConfirmPassword
                    ? "Ocultar confirmación"
                    : "Mostrar confirmación"
                }
                title={
                  showConfirmPassword
                    ? "Ocultar confirmación"
                    : "Mostrar confirmación"
                }
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  {showConfirmPassword ? (
                    <>
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line
                        x1="1"
                        y1="1"
                        x2="23"
                        y2="23"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  ) : (
                    <>
                      <path
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  )}
                </svg>
              </button>
            </div>
            {errors.confirmPassword && (
              <div
                id="confirm-password-error"
                className="error-message"
                role="alert"
              >
                {errors.confirmPassword}
              </div>
            )}
          </div>

          {/* Checkbox Términos */}
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="cosmic-checkbox"
                disabled={isFormDisabled}
                aria-describedby={
                  errors.acceptTerms ? "terms-error" : undefined
                }
              />
              <span className="checkbox-text">
                Acepto los términos y condiciones galácticas
              </span>
            </label>
            {errors.acceptTerms && (
              <div id="terms-error" className="error-message" role="alert">
                {errors.acceptTerms}
              </div>
            )}
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="cosmic-submit-button"
            disabled={isFormDisabled}
          >
            {isSubmitting ? (
              <>
                <div className="loading-spinner" aria-hidden="true"></div>
                <span>CREANDO CUENTA...</span>
              </>
            ) : (
              <>
                <span role="img" aria-hidden="true">
                  🚀
                </span>
                <span>INICIAR REGISTRO</span>
              </>
            )}
          </button>
        </form>

        {/* Link de regreso */}
        <div className="login-link">
          <p>
            ¿Ya tienes cuenta?{" "}
            <button
              onClick={handleBackClick}
              className="link-button"
              disabled={isFormDisabled}
            >
              Inicia Sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CosmicCadetForm;
