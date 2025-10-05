import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "../../components/StarField/StarField";
import GlassPanel from "../../components/GlassPanel/GlassPanel";
import PlanetEarth from "../../components/PlanetEarth/PlanetEarth";
import NavigationButton from "../../components/NavigationButton/NavigationButton";
import "./MainDashboard.css";

// Import types (removido Astronaut ya que no se usa)
import {
  type Mission,
  type MainDashboardProps,
  type RouteNames,
  createNavigationError,
  createMissionError,
  DEFAULT_USER_NAME,
} from "../../types/index";

// Variable para detectar entorno de desarrollo (reemplazo de process.env)
const isDevelopment =
  import.meta.env?.DEV || window.location.hostname === "localhost";

// Constantes para evitar repetición
const ANIMATION_DELAYS = {
  LOAD: 500,
  WELCOME: 3000,
} as const;

const DEFAULT_MISSIONS: Mission[] = [
  {
    id: 1,
    title: "Misión Apollo",
    subtitle: "Explora la Luna",
    icon: "🌙",
    type: "new",
    badge: "NUEVO",
    color: "#00D4FF",
  },
  {
    id: 2,
    title: "Estación Espacial",
    subtitle: "Vive en el espacio",
    icon: "🛰️",
    type: "power",
    badge: "POWER",
    color: "#FF9500",
  },
  {
    id: 3,
    title: "Viaje a Marte",
    subtitle: "Planeta rojo",
    icon: "🚀",
    type: "completed",
    badge: "COMPLETADO",
    color: "#4ECDC4",
  },
];

const MainDashboard: React.FC<MainDashboardProps> = ({
  onNavigate,
  userName = DEFAULT_USER_NAME,
  systemStatus = {
    system: "online",
    connection: "stable",
    explorer: userName || DEFAULT_USER_NAME,
  },
}) => {
  const navigate = useNavigate();
  // Estados
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [missions] = useState<Mission[]>(DEFAULT_MISSIONS);

  // Efectos
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsLoaded(true);
    }, ANIMATION_DELAYS.LOAD);

    const timer2 = setTimeout(() => {
      setShowWelcomeAnimation(false);
    }, ANIMATION_DELAYS.WELCOME);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Limpiar errores después de 5 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Manejadores de eventos con manejo de errores
  const handleNavigation = useCallback(
    (route: string) => {
      try {
        setSelectedSection(route);

        if (onNavigate) {
          onNavigate(route);
        }

        // Log para debugging (usando variable en lugar de process.env)
        if (isDevelopment) {
          console.log(`Navegando a: ${route}`);
        }
        navigate("/starmap");
      } catch (err) {
        const navigationError = createNavigationError(
          err instanceof Error
            ? err.message
            : "Error desconocido en navegación",
          route,
          "button"
        );

        console.error("Error en navegación:", navigationError);
        setError(`Error al navegar a ${route}: ${navigationError.message}`);

        // Resetear estado en caso de error
        setSelectedSection(null);
      }
    },
    [onNavigate]
  );

  const handleEnterExploration = useCallback(() => {
    try {
      handleNavigation("missions");
    } catch (err) {
      console.error("Error al iniciar exploración:", err);
      setError("Error al iniciar la exploración");
    }
  }, [handleNavigation]);

  const handleMissionClick = useCallback(
    (missionId: number) => {
      try {
        const mission = missions.find((m) => m.id === missionId);
        if (!mission) {
          const missionError = createMissionError(
            `Misión con ID ${missionId} no encontrada`,
            missionId
          );
          throw new Error(missionError.message);
        }

        handleNavigation(`mission-${missionId}` as RouteNames);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error al seleccionar misión";
        console.error("Error al seleccionar misión:", err);
        setError(errorMessage);
      }
    },
    [missions, handleNavigation]
  );

  // Renderizado de componentes con manejo de errores
  const renderMissionCard = useCallback(
    (mission: Mission) => {
      try {
        return (
          <div
            key={mission.id}
            className={`main-dashboard__mission-card main-dashboard__mission-card--${mission.type}`}
            onClick={() => handleMissionClick(mission.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleMissionClick(mission.id);
              }
            }}
          >
            <div className="main-dashboard__mission-icon" aria-hidden="true">
              {mission.icon}
            </div>
            <div className="main-dashboard__mission-info">
              <h4 className="main-dashboard__mission-title">{mission.title}</h4>
              <p className="main-dashboard__mission-subtitle">
                {mission.subtitle}
              </p>
            </div>
            <div className="main-dashboard__mission-badge">{mission.badge}</div>
          </div>
        );
      } catch (err) {
        console.error(`Error renderizando misión ${mission.id}:`, err);
        return (
          <div
            key={`error-${mission.id}`}
            className="main-dashboard__mission-card main-dashboard__mission-card--error"
          >
            <div className="main-dashboard__mission-info">
              <h4 className="main-dashboard__mission-title">Error</h4>
              <p className="main-dashboard__mission-subtitle">
                No se pudo cargar
              </p>
            </div>
          </div>
        );
      }
    },
    [handleMissionClick]
  );

  // Renderizado de notificación de error
  const renderError = useMemo(() => {
    if (!error) return null;

    return (
      <div className="main-dashboard__error-notification" role="alert">
        <div className="main-dashboard__error-content">
          <span className="main-dashboard__error-icon">⚠️</span>
          <span className="main-dashboard__error-text">{error}</span>
          <button
            className="main-dashboard__error-close"
            onClick={() => setError(null)}
            aria-label="Cerrar notificación de error"
          >
            ×
          </button>
        </div>
      </div>
    );
  }, [error]);

  // Función para obtener el estado del sistema con colores
  const getSystemStatusClass = useCallback((status: string) => {
    switch (status) {
      case "online":
        return "main-dashboard__status-value--online";
      case "offline":
        return "main-dashboard__status-value--offline";
      case "maintenance":
        return "main-dashboard__status-value--maintenance";
      case "stable":
        return "main-dashboard__status-value--stable";
      case "unstable":
        return "main-dashboard__status-value--unstable";
      case "disconnected":
        return "main-dashboard__status-value--disconnected";
      default:
        return "main-dashboard__status-value--ready";
    }
  }, []);

  // Render principal con ErrorBoundary interno
  try {
    return (
      <div className="main-dashboard">
        {renderError}

        <StarField starCount={250} className="main-dashboard__starfield" />

        <GlassPanel
          curved
          animated
          glowEffect
          borderColor="cyan"
          size="fullscreen"
          className={`main-dashboard__panel ${
            isLoaded ? "main-dashboard__panel--loaded" : ""
          }`}
        >
          <div className="main-dashboard__content">
            {/* Navegación izquierda */}
            <nav
              className="main-dashboard__nav-left"
              role="navigation"
              aria-label="Navegación principal"
            >
              <NavigationButton
                icon="👤"
                text="PERFIL"
                variant="profile"
                size="large"
                active={selectedSection === "profile"}
                onClick={() => handleNavigation("profile")}
                tooltip="Ver mi perfil de astronauta"
              />
              <NavigationButton
                icon="⚙️"
                text="LÓGICA"
                variant="logic"
                size="large"
                active={selectedSection === "settings"}
                onClick={() => handleNavigation("settings")}
                tooltip="Configuración del sistema"
              />
              <NavigationButton
                icon="👥"
                text="EQUIPO"
                variant="account"
                size="large"
                active={selectedSection === "team"}
                onClick={() => handleNavigation("team")}
                tooltip="Mi equipo de exploración"
              />
            </nav>

            {/* Contenido central */}
            <main className="main-dashboard__center">
              <div className="main-dashboard__planet-container">
                <PlanetEarth
                  size={220}
                  rotationSpeed={25}
                  showAtmosphere
                  showClouds
                  showRocket
                  className="main-dashboard__planet"
                />
              </div>

              <div className="main-dashboard__branding">
                <div className="main-dashboard__nasa-logo">NASA</div>
                <div className="main-dashboard__nasa-subtitle">
                  NATIONAL AERONAUTICS
                  <br />
                  AND SPACE ADMINISTRATION
                </div>
              </div>

              <div
                className={`main-dashboard__welcome ${
                  showWelcomeAnimation
                    ? "main-dashboard__welcome--animated"
                    : ""
                }`}
              >
                <h1 className="main-dashboard__title">
                  ¡HOLA, FUTURO
                  <br />
                  <span className="main-dashboard__title-highlight">
                    EXPLORADOR!
                  </span>
                </h1>
                <p className="main-dashboard__subtitle">WELCOME, EXPLORER</p>
                <p className="main-dashboard__ready-text">
                  ¡ESTOY LISTO PARA LA AVENTURA!
                </p>
              </div>

              <button
                className="main-dashboard__enter-btn"
                onClick={handleEnterExploration}
                aria-label="Iniciar exploración espacial"
              >
                <span className="main-dashboard__enter-btn-text">ENTRAR</span>
                <div className="main-dashboard__enter-btn-glow"></div>
              </button>
            </main>

            {/* Navegación derecha */}
            <nav
              className="main-dashboard__nav-right"
              role="navigation"
              aria-label="Navegación secundaria"
            >
              <NavigationButton
                text="INFO"
                variant="info"
                size="large"
                active={selectedSection === "info"}
                onClick={() => handleNavigation("info")}
                tooltip="Información del sistema"
              />
              <NavigationButton
                icon="ℹ️"
                variant="question"
                size="large"
                active={selectedSection === "about"}
                onClick={() => handleNavigation("about")}
                tooltip="Acerca de la misión"
              />
              <NavigationButton
                icon="?"
                variant="question"
                size="large"
                active={selectedSection === "faq"}
                onClick={() => handleNavigation("faq")}
                tooltip="Preguntas frecuentes"
              />
              <NavigationButton
                text="HELP"
                variant="help"
                size="large"
                active={selectedSection === "help"}
                onClick={() => handleNavigation("help")}
                tooltip="Centro de ayuda"
              />
            </nav>
          </div>

          {/* Vista previa de misiones - Corregido el role de ARIA */}
          <section className="main-dashboard__missions-preview">
            <h2 className="main-dashboard__missions-title">
              MISIONES DISPONIBLES
            </h2>
            <div className="main-dashboard__missions-grid">
              {missions.map(renderMissionCard)}
            </div>
          </section>
        </GlassPanel>

        {/* Estado del sistema */}
        <aside
          className="main-dashboard__status"
          role="complementary"
          aria-label="Estado del sistema"
        >
          <div className="main-dashboard__status-item">
            <span className="main-dashboard__status-label">SISTEMA</span>
            <span
              className={`main-dashboard__status-value ${getSystemStatusClass(
                systemStatus.system
              )}`}
            >
              {systemStatus.system.toUpperCase()}
            </span>
          </div>
          <div className="main-dashboard__status-item">
            <span className="main-dashboard__status-label">CONEXIÓN</span>
            <span
              className={`main-dashboard__status-value ${getSystemStatusClass(
                systemStatus.connection
              )}`}
            >
              {systemStatus.connection.toUpperCase()}
            </span>
          </div>
          <div className="main-dashboard__status-item">
            <span className="main-dashboard__status-label">EXPLORADOR</span>
            <span className="main-dashboard__status-value main-dashboard__status-value--ready">
              {systemStatus.explorer}
            </span>
          </div>
        </aside>

        {/* Elementos flotantes decorativos */}
        <div className="main-dashboard__floating-elements" aria-hidden="true">
          <div className="main-dashboard__floating-particle main-dashboard__floating-particle--1"></div>
          <div className="main-dashboard__floating-particle main-dashboard__floating-particle--2"></div>
          <div className="main-dashboard__floating-particle main-dashboard__floating-particle--3"></div>
        </div>
      </div>
    );
  } catch (err) {
    console.error("Error crítico en MainDashboard:", err);

    // Fallback UI
    return (
      <div className="main-dashboard main-dashboard--error">
        <div className="main-dashboard__error-fallback">
          <div className="main-dashboard__error-icon">🚀</div>
          <h1>Error en el Sistema de Navegación</h1>
          <p>Ha ocurrido un error crítico en el panel de control.</p>
          <button
            onClick={() => window.location.reload()}
            className="main-dashboard__error-reload"
          >
            Reiniciar Sistema
          </button>
        </div>
      </div>
    );
  }
};

export default MainDashboard;
