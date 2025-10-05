import React, { useState } from 'react';
import type { LoginFormData } from '../../types';
import './LoginPanel.css';

interface LoginPanelProps {
  onLogin?: (data: LoginFormData) => void | Promise<void>;
}

const LoginPanel: React.FC<LoginPanelProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    // Limpiar error cuando el usuario empiece a escribir
    if (error) {
      setError(null);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      if (onLogin) {
        await onLogin(formData);
      } else {
        // Simulación de autenticación para desarrollo
        console.log('Login attempt:', formData);
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Login simulado exitoso');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Error en el inicio de sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="login-panel">
      {/* Logo NASA */}
      <div className="nasa-logo">
        <div className="logo-circle">
          <div className="logo-text">NASA</div>
          <div className="logo-orbit"></div>
          <div className="logo-stars">
            <span className="logo-star" role="img" aria-label="estrella">✦</span>
            <span className="logo-star" role="img" aria-label="estrella">✦</span>
            <span className="logo-star" role="img" aria-label="estrella">✦</span>
          </div>
        </div>
      </div>

      {/* Títulos */}
      <div className="login-header">
        <h1 className="main-title">EXPLORADORES CÓSMICOS DE LA NASA</h1>
        <h2 className="subtitle">MISIÓN ANDINA</h2>
      </div>

      {/* Mostrar error si existe */}
      {error && (
        <div className="error-message" role="alert">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      {/* Formulario */}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">NOMBRE DE CADETE</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Ingresa tu nombre de cadete"
            required
            disabled={isLoading}
            aria-describedby={error ? "error-message" : undefined}
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">CONTRASEÑA</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              required
              disabled={isLoading}
              aria-describedby={error ? "error-message" : undefined}
              autoComplete="current-password"
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={togglePasswordVisibility}
              disabled={isLoading}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
                      x1="1" y1="1" x2="23" y2="23" 
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
                      cx="12" cy="12" r="3" 
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
        </div>

        <button 
          type="submit" 
          className="login-button" 
          disabled={isLoading || !formData.username.trim() || !formData.password.trim()}
        >
          <div className="button-content">
            {isLoading ? (
              <div className="loading-spinner" aria-hidden="true"></div>
            ) : (
              <svg className="rocket-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path 
                  d="M12 2L2 7v10c0 5.55 3.84 7.29 9 8.5 5.16-1.21 9-2.95 9-8.5V7l-10-5z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="currentColor"
                />
              </svg>
            )}
            <span>{isLoading ? 'INICIANDO SESIÓN...' : 'INICIAR SESIÓN'}</span>
          </div>
          <div className="button-glow"></div>
        </button>
      </form>

      {/* Enlaces adicionales */}
      <div className="login-links">
        <button 
          type="button"
          className="forgot-password"
          onClick={() => console.log('Forgot password clicked')}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </div>
  );
};

export default LoginPanel;