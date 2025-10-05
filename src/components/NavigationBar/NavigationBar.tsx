import React from "react";
import type { NavigationBarProps } from "../../types/index";
import "./NavigationBar.css";

const NavigationBar: React.FC<NavigationBarProps> = ({
  onNavigate,
  activeSection,
  className = "",
}) => {
  const navigationItems = [
    {
      id: "starmap",
      label: "MAPA ESTELAR",
      icon: "🗺️",
      description: "Explorar misiones",
    },
    {
      id: "laboratory",
      label: "LABORATORIO VIRTUAL",
      icon: "🔬",
      description: "Experimentos",
    },
    {
      id: "profile",
      label: "PERFIL",
      icon: "👨‍🚀",
      description: "Mi progreso",
    },
    {
      id: "comic",
      label: "CÓMIC",
      icon: "📚",
      description: "Historias espaciales",
    },
  ];

  const handleNavigation = (sectionId: string) => {
    onNavigate(sectionId);
  };

  return (
    <nav
      className={`navigation-bar ${className}`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="navigation-bar__container">
        {navigationItems.map((item) => {
          // Usa operador ternario para valores literales específicos

          return (
            <button
              key={item.id}
              className={`navigation-bar__item ${
                activeSection === item.id ? "navigation-bar__item--active" : ""
              }`}
              onClick={() => handleNavigation(item.id)}
              aria-label={`${item.label}: ${item.description}`}
              aria-current={activeSection === item.id ? "page" : undefined}
              title={item.description}
            >
              <div className="navigation-bar__icon">{item.icon}</div>
              <span className="navigation-bar__label">{item.label}</span>

              {activeSection === item.id && (
                <div
                  className="navigation-bar__active-indicator"
                  aria-hidden="true"
                />
              )}

              <div className="navigation-bar__glow" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div className="navigation-bar__decoration" aria-hidden="true">
        <div className="navigation-bar__bg-glow" />
        <div className="navigation-bar__particles">
          <div className="navigation-bar__particle navigation-bar__particle--1" />
          <div className="navigation-bar__particle navigation-bar__particle--2" />
          <div className="navigation-bar__particle navigation-bar__particle--3" />
        </div>
      </div>
    </nav>
  );
};
export default NavigationBar;
