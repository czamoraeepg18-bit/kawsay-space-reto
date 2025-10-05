import React, { useState, useCallback, useEffect } from "react";
import { PLANET_CONFIGS } from "../../types/index";
import type { StarMapMission } from "../../types/index";
import "./PlanetNode.css";

interface PlanetNodeProps {
  mission: StarMapMission;
  isSelected?: boolean;
  onClick: (missionId: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

const PlanetNode: React.FC<PlanetNodeProps> = ({
  mission,
  isSelected = false,
  onClick,
  style,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [nodeRef, setNodeRef] = useState<HTMLDivElement | null>(null);

  const planetConfig = PLANET_CONFIGS[mission.planetType];

  // Set CSS custom properties for the planet
  useEffect(() => {
    if (nodeRef && planetConfig) {
      nodeRef.style.setProperty("--planet-color", planetConfig.color);
      nodeRef.style.setProperty(
        "--atmosphere-color",
        planetConfig.atmosphereColor
      );
    }
  }, [nodeRef, planetConfig]);

  const handleClick = useCallback(() => {
    if (!mission.isLocked) {
      onClick(mission.id);
    }
  }, [mission.id, mission.isLocked, onClick]);

  const handleMouseEnter = useCallback(() => {
    if (!mission.isLocked) {
      setIsHovered(true);
    }
  }, [mission.isLocked]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  const nodeClasses = [
    "planet-node",
    `planet-node--${mission.planetType}`,
    mission.isLocked && "planet-node--locked",
    mission.isCompleted && "planet-node--completed",
    isSelected && "planet-node--selected",
    isHovered && "planet-node--hovered",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const ariaPressed = String(isSelected);
  const ariaDisabled = String(mission.isLocked);
  return (
    <div
      ref={setNodeRef}
      className={nodeClasses}
      style={style}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={mission.isLocked ? -1 : 0}
      aria-label={`${mission.name}: ${mission.description}${
        mission.isLocked ? " (Bloqueado)" : ""
      }`}
      {...(isSelected ? { "aria-pressed": "true" } : { "aria-pressed": "false" })}
      {...(mission.isLocked ? { "aria-disabled": "true" } : { "aria-disabled": "false" })}
    >
      {/* Planet Visual */}
      <div className="planet-node__planet">
        {/* Planet Core */}
        <div className="planet-node__core">
          <span className="planet-node__icon" aria-hidden="true">
            {planetConfig.icon}
          </span>
        </div>

        {/* Planet Ring (for certain planet types) */}
        {planetConfig.hasRing && <div className="planet-node__ring"></div>}

        {/* Atmosphere/Glow */}
        <div className="planet-node__atmosphere"></div>

        {/* Orbital Elements */}
        <div className="planet-node__orbital">
          <div className="planet-node__orbital-dot"></div>
        </div>
      </div>

      {/* Mission Info */}
      <div className="planet-node__info">
        <h3 className="planet-node__name">{mission.name}</h3>
        <p className="planet-node__description">{mission.description}</p>
      </div>

      {/* Status Indicators */}
      <div className="planet-node__status">
        {mission.isLocked && (
          <div className="planet-node__lock" aria-hidden="true">
            🔒
          </div>
        )}
        {mission.isCompleted && (
          <div className="planet-node__checkmark" aria-hidden="true">
            ✓
          </div>
        )}
      </div>

      {/* Pulse Effect for Available Missions */}
      {!mission.isLocked && !mission.isCompleted && (
        <div className="planet-node__pulse" aria-hidden="true"></div>
      )}

      {/* Hover Tooltip */}
      {isHovered && !mission.isLocked && (
        <div className="planet-node__tooltip" role="tooltip">
          <div className="planet-node__tooltip-content">
            <h4>{mission.name}</h4>
            <p>{mission.description}</p>
            <div className="planet-node__tooltip-action">
              Click para explorar
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanetNode;
