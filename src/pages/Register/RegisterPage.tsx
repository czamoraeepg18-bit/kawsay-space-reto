import React from 'react';
import { useNavigate } from 'react-router-dom';
import CosmicCadetForm from '../../components/ui/CosmicCadetForm';
import type { RegisterFormData } from '../../types';
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterSubmit = async (formData: RegisterFormData): Promise<void> => {
    try {
      // Aquí puedes agregar la lógica de registro real
      console.log('Datos del registro:', formData);
      
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirigir al dashboard después del registro exitoso
      navigate('/dashboard');
    } catch (error) {
      console.error('Error en el registro:', error);
      // Aquí puedes manejar errores específicos
      throw error;
    }
  };

  const handleBackToLogin = (): void => {
    navigate('/login');
  };

  return (
    <div className="register-page">
      {/* Campo de estrellas de fondo */}
      <div className="stars-background">
        {/* Estrellas dinámicas generadas - Campo estelar denso */}
        {Array.from({ length: 200 }, (_, i) => (
          <div
            key={i}
            className={`star-bg star-${(i % 10) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${1 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Nebulosas de fondo */}
      <div className="nebula nebula-1" />
      <div className="nebula nebula-2" />
      <div className="nebula nebula-3" />
      <div className="nebula nebula-4" />

      {/* Lluvia de meteoritos */}
      <div className="meteor-shower">
        <div className="meteor meteor-1" />
        <div className="meteor meteor-2" />
        <div className="meteor meteor-3" />
        <div className="meteor meteor-4" />
        <div className="meteor meteor-5" />
        <div className="meteor meteor-6" />
      </div>

      {/* Estrellas fugaces múltiples */}
      <div className="shooting-star shooting-star-1" />
      <div className="shooting-star shooting-star-2" />
      <div className="shooting-star shooting-star-3" />
      <div className="shooting-star shooting-star-4" />

      {/* Contenido principal */}
      <div className="register-content">
        <CosmicCadetForm
          onSubmit={handleRegisterSubmit}
          onBackToLogin={handleBackToLogin}
        />
      </div>

      {/* Elementos decorativos adicionales */}
      <div className="cosmic-elements">
        <div className="planet planet-1" />
        <div className="planet planet-2" />
        <div className="planet planet-3" />
        <div className="planet planet-4" />
        <div className="planet planet-5" />
        <div className="planet planet-6" />
      </div>
    </div>
  );
};

export default RegisterPage;