import React from "react";
import type { Mission } from "../../types";
import "./MissionNewsPanel.css";

interface MissionNewsPanelProps {
  missions?: Mission[];
  onMissionClick?: (mission: Mission) => void;
}

const MissionNewsPanel: React.FC<MissionNewsPanelProps> = ({
  missions: externalMissions,
  onMissionClick,
}) => {
  const defaultMissions: Mission[] = [
    {
      id: 1,
      title: "NUEVA AVENTURA DESBLOQUEADA",
      subtitle: "Exploración Marciana",
      icon: "🚀",
      type: "new",
      badge: "!",
      color: "green",
    },
    {
      id: 2,
      title: "DESBLOQUEA EL PODER DE REGENERACIÓN",
      subtitle: "Biología Espacial",
      icon: "🧬",
      type: "power",
      badge: "⚡",
      color: "purple",
    },
    {
      id: 3,
      title: "MISIÓN COMPLETADA",
      subtitle: "Satélites Andinos",
      icon: "📡",
      type: "completed",
      badge: "✓",
      color: "blue",
    },
  ];

  const missions = externalMissions ?? defaultMissions;

  const getProgressWidthClass = (mission: Mission): string => {
    switch (mission.type) {
      case "completed":
        return "progress-width-100";
      case "new":
        return "progress-width-75";
      default:
        return "progress-width-50";
    }
  };

  const getProgressText = (mission: Mission): string => {
    switch (mission.type) {
      case "completed":
        return "Completado";
      case "new":
        return "Disponible";
      default:
        return "En progreso";
    }
  };

  const getActionText = (mission: Mission): string => {
    switch (mission.type) {
      case "completed":
        return "Ver Recompensas";
      case "new":
        return "Comenzar";
      default:
        return "Continuar";
    }
  };

  const handleMissionAction = (mission: Mission): void => {
    if (onMissionClick) {
      onMissionClick(mission);
    } else {
      console.log(`Acción en misión: ${mission.title}`);
    }
  };

  return (
    <div className="mission-news-panel">
      <div className="panel-title">
        <h3>NOTICIAS DE MISIÓN</h3>
        <div className="title-decoration">
          <span className="star">✦</span>
          <div className="line"></div>
          <span className="star">✦</span>
        </div>
      </div>

      <div className="missions-container">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className={`mission-card ${mission.type} mission-color-${mission.color}`}
          >
            <div className="mission-badge">
              <span className="badge-icon">{mission.badge}</span>
            </div>

            <div className="mission-icon">
              <span className="icon-emoji">{mission.icon}</span>
              <div className="icon-glow"></div>
            </div>

            <div className="mission-content">
              <h4 className="mission-title">{mission.title}</h4>
              <p className="mission-subtitle">{mission.subtitle}</p>
            </div>

            <div className="mission-progress">
              <div className="progress-bar">
                <div
                  className={`progress-fill ${getProgressWidthClass(mission)}`}
                ></div>
              </div>
              <span className="progress-text">{getProgressText(mission)}</span>
            </div>

            <button
              className="mission-action"
              onClick={() => handleMissionAction(mission)}
            >
              {getActionText(mission)}
            </button>
          </div>
        ))}
      </div>

      <div className="panel-footer">
        <button className="view-all-button">
          Ver Todas las Misiones
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MissionNewsPanel;
