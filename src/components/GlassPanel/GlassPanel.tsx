import React, { type ReactNode } from 'react';
import './GlassPanel.css';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  curved?: boolean;
  animated?: boolean;
  glowEffect?: boolean;
  borderColor?: 'blue' | 'cyan' | 'purple' | 'white';
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  opacity?: 'light' | 'medium' | 'strong';
}

const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  curved = true,
  animated = true,
  glowEffect = true,
  borderColor = 'cyan',
  size = 'large',
  opacity = 'medium'
}) => {
  const panelClasses = [
    'glass-panel',
    curved && 'glass-panel--curved',
    animated && 'glass-panel--animated',
    glowEffect && 'glass-panel--glow',
    `glass-panel--${borderColor}`,
    `glass-panel--${size}`,
    `glass-panel--${opacity}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={panelClasses}>
      {/* Efecto de brillo superior */}
      {glowEffect && <div className="glass-panel__shine" />}
      
      {/* Bordes luminosos */}
      <div className="glass-panel__border-glow" />
      
      {/* Contenido */}
      <div className="glass-panel__content">
        {children}
      </div>
      
      {/* Efectos de reflexión */}
      <div className="glass-panel__reflection" />
      
      {/* Partículas flotantes opcionales */}
      {animated && (
        <div className="glass-panel__particles">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="glass-panel__particle" />
          ))}
        </div>
      )}
    </div>
  );
};

export default GlassPanel;