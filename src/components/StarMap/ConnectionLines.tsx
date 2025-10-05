import React, { useMemo } from 'react';
import type { ConnectionLinesProps, ConnectionLine } from '../../types/index';
import './ConnectionLines.css';

const ConnectionLines: React.FC<ConnectionLinesProps> = ({
  missions,
  className = ''
}) => {
  const connectionLines = useMemo(() => {
    const lines: ConnectionLine[] = [];
    
    missions.forEach(mission => {
      mission.connections.forEach(connectionId => {
        const connectedMission = missions.find(m => m.id === connectionId);
        if (connectedMission) {
          const isActive = !mission.isLocked || !connectedMission.isLocked;
          
          lines.push({
            fromMission: mission.id,
            toMission: connectionId,
            fromPosition: mission.position,
            toPosition: connectedMission.position,
            isActive
          });
        }
      });
    });
    
    return lines;
  }, [missions]);


  return (
    <div className={`connection-lines ${className}`}>
      <svg 
        className="connection-lines__svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
      >
        <defs>
          {/* Gradient definitions for different line states */}
          <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 212, 255, 0.8)" />
            <stop offset="50%" stopColor="rgba(0, 255, 136, 0.8)" />
            <stop offset="100%" stopColor="rgba(0, 212, 255, 0.8)" />
          </linearGradient>
          
          <linearGradient id="inactiveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
          </linearGradient>

          <linearGradient id="completedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(52, 199, 89, 0.8)" />
            <stop offset="50%" stopColor="rgba(0, 255, 136, 0.8)" />
            <stop offset="100%" stopColor="rgba(52, 199, 89, 0.8)" />
          </linearGradient>

          {/* Filter for glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Pattern for animated dashes */}
          <pattern id="dashPattern" patternUnits="userSpaceOnUse" width="20" height="2">
            <rect width="10" height="2" fill="rgba(0, 212, 255, 0.6)" />
            <rect x="10" width="10" height="2" fill="transparent" />
          </pattern>
        </defs>

        {connectionLines.map((line, index) => {
          const fromMission = missions.find(m => m.id === line.fromMission);
          const toMission = missions.find(m => m.id === line.toMission);
          
          if (!fromMission || !toMission) return null;

          const isCompleted = fromMission.isCompleted && toMission.isCompleted;
          const isActive = line.isActive && !fromMission.isLocked;
          const isLocked = fromMission.isLocked && toMission.isLocked;

          let strokeUrl = 'url(#inactiveGradient)';
          let strokeOpacity = 0.3;
          let strokeWidth = 1;
          
          if (isCompleted) {
            strokeUrl = 'url(#completedGradient)';
            strokeOpacity = 0.8;
            strokeWidth = 2;
          } else if (isActive) {
            strokeUrl = 'url(#activeGradient)';
            strokeOpacity = 0.6;
            strokeWidth = 1.5;
          }

          return (
            <g key={`${line.fromMission}-${line.toMission}-${index}`}>
              {/* Main connection line */}
              <line
                x1={line.fromPosition.x}
                y1={line.fromPosition.y}
                x2={line.toPosition.x}
                y2={line.toPosition.y}
                stroke={strokeUrl}
                strokeWidth={strokeWidth}
                strokeOpacity={strokeOpacity}
                filter={isActive ? "url(#glow)" : undefined}
                className={`
                  connection-lines__line
                  ${isActive ? 'connection-lines__line--active' : ''}
                  ${isCompleted ? 'connection-lines__line--completed' : ''}
                  ${isLocked ? 'connection-lines__line--locked' : ''}
                `}
              />

              {/* Animated flow for active connections */}
              {isActive && !isCompleted && (
                <line
                  x1={line.fromPosition.x}
                  y1={line.fromPosition.y}
                  x2={line.toPosition.x}
                  y2={line.toPosition.y}
                  stroke="url(#dashPattern)"
                  strokeWidth="3"
                  strokeOpacity="0.4"
                  className="connection-lines__flow"
                />
              )}

              {/* Connection nodes at endpoints */}
              <circle
                cx={line.fromPosition.x}
                cy={line.fromPosition.y}
                r="1.5"
                fill={isActive ? "#00D4FF" : "rgba(255, 255, 255, 0.3)"}
                className="connection-lines__node"
              />
              
              <circle
                cx={line.toPosition.x}
                cy={line.toPosition.y}
                r="1.5"
                fill={isActive ? "#00D4FF" : "rgba(255, 255, 255, 0.3)"}
                className="connection-lines__node"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default ConnectionLines;