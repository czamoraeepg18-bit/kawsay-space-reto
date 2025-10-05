import React, { useState } from 'react';
import type { Astronaut } from '../../types';
import './AstronautPanel.css';

interface AstronautPanelProps {
  selectedAstronaut?: number;
  onAstronautSelect?: (id: number) => void;
}

// Componente para avatar SVG de astronauta masculino
const MaleAstronautAvatar: React.FC<{ skinTone: string }> = ({ skinTone }) => (
  <svg width="80" height="80" viewBox="0 0 80 80" className="astronaut-svg">
    <defs>
      <radialGradient id="helmetGradient" cx="0.3" cy="0.3" r="0.8">
        <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
        <stop offset="70%" stopColor="rgba(255,255,255,0.3)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
      </radialGradient>
      <linearGradient id="suitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>
    </defs>
    
    {/* Casco/Helmet fondo */}
    <circle cx="40" cy="35" r="28" fill="url(#suitGradient)" stroke="#64748b" strokeWidth="2"/>
    
    {/* Cara */}
    <circle cx="40" cy="32" r="18" fill={skinTone} />
    
    {/* Ojos */}
    <circle cx="35" cy="29" r="2.5" fill="#1f2937" />
    <circle cx="45" cy="29" r="2.5" fill="#1f2937" />
    <circle cx="35.5" cy="28.5" r="1" fill="#ffffff" />
    <circle cx="45.5" cy="28.5" r="1" fill="#ffffff" />
    
    {/* Nariz */}
    <path d="M40 32 L38 35 L42 35 Z" fill={skinTone} opacity="0.7"/>
    
    {/* Boca */}
    <path d="M37 37 Q40 39 43 37" stroke="#1f2937" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    
    {/* Cabello */}
    <path d="M25 25 Q40 15 55 25 Q52 20 40 18 Q28 20 25 25" fill="#4b5563" />
    
    {/* Traje espacial - cuerpo */}
    <rect x="25" y="55" width="30" height="20" rx="5" fill="url(#suitGradient)" stroke="#64748b" strokeWidth="1"/>
    
    {/* Panel de control del traje */}
    <rect x="32" y="60" width="16" height="8" rx="2" fill="#1e293b" stroke="#3b82f6" strokeWidth="1"/>
    
    {/* Indicadores LED */}
    <circle cx="35" cy="62" r="1.5" fill="#ef4444" />
    <circle cx="40" cy="62" r="1.5" fill="#22c55e" />
    <circle cx="45" cy="62" r="1.5" fill="#3b82f6" />
    
    {/* Botones */}
    <circle cx="37" cy="66" r="1" fill="#6b7280" stroke="#9ca3af" strokeWidth="0.5"/>
    <circle cx="43" cy="66" r="1" fill="#6b7280" stroke="#9ca3af" strokeWidth="0.5"/>
    
    {/* Reflejo del casco */}
    <ellipse cx="35" cy="25" rx="8" ry="15" fill="url(#helmetGradient)" opacity="0.6" transform="rotate(-15 35 25)"/>
    
    {/* Borde del casco */}
    <circle cx="40" cy="35" r="28" fill="none" stroke="#94a3b8" strokeWidth="3" opacity="0.8"/>
  </svg>
);

// Componente para avatar SVG de astronauta femenino
const FemaleAstronautAvatar: React.FC<{ skinTone: string }> = ({ skinTone }) => (
  <svg width="80" height="80" viewBox="0 0 80 80" className="astronaut-svg">
    <defs>
      <radialGradient id="helmetGradientF" cx="0.3" cy="0.3" r="0.8">
        <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
        <stop offset="70%" stopColor="rgba(255,255,255,0.3)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
      </radialGradient>
      <linearGradient id="suitGradientF" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>
    </defs>
    
    {/* Casco/Helmet fondo */}
    <circle cx="40" cy="35" r="28" fill="url(#suitGradientF)" stroke="#64748b" strokeWidth="2"/>
    
    {/* Cara */}
    <circle cx="40" cy="32" r="18" fill={skinTone} />
    
    {/* Ojos (más expresivos) */}
    <ellipse cx="35" cy="29" rx="3" ry="2.5" fill="#1f2937" />
    <ellipse cx="45" cy="29" rx="3" ry="2.5" fill="#1f2937" />
    <circle cx="35.5" cy="28.5" r="1.2" fill="#ffffff" />
    <circle cx="45.5" cy="28.5" r="1.2" fill="#ffffff" />
    
    {/* Pestañas */}
    <path d="M32 27 L38 26.5" stroke="#1f2937" strokeWidth="0.8" strokeLinecap="round"/>
    <path d="M42 26.5 L48 27" stroke="#1f2937" strokeWidth="0.8" strokeLinecap="round"/>
    
    {/* Nariz */}
    <path d="M40 32 L38.5 34.5 L41.5 34.5 Z" fill={skinTone} opacity="0.7"/>
    
    {/* Boca (sonrisa más suave) */}
    <path d="M37 37 Q40 38.5 43 37" stroke="#be185d" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    
    {/* Cabello largo */}
    <path d="M25 25 Q40 15 55 25 Q55 30 52 35 Q40 18 28 35 Q25 30 25 25" fill="#92400e" />
    <path d="M28 35 Q35 40 40 38 Q45 40 52 35" stroke="#92400e" strokeWidth="2" fill="none"/>
    
    {/* Traje espacial - cuerpo */}
    <rect x="25" y="55" width="30" height="20" rx="5" fill="url(#suitGradientF)" stroke="#64748b" strokeWidth="1"/>
    
    {/* Panel de control del traje */}
    <rect x="32" y="60" width="16" height="8" rx="2" fill="#1e293b" stroke="#ec4899" strokeWidth="1"/>
    
    {/* Indicadores LED */}
    <circle cx="35" cy="62" r="1.5" fill="#f59e0b" />
    <circle cx="40" cy="62" r="1.5" fill="#10b981" />
    <circle cx="45" cy="62" r="1.5" fill="#8b5cf6" />
    
    {/* Botones */}
    <circle cx="37" cy="66" r="1" fill="#6b7280" stroke="#9ca3af" strokeWidth="0.5"/>
    <circle cx="43" cy="66" r="1" fill="#6b7280" stroke="#9ca3af" strokeWidth="0.5"/>
    
    {/* Reflejo del casco */}
    <ellipse cx="35" cy="25" rx="8" ry="15" fill="url(#helmetGradientF)" opacity="0.6" transform="rotate(-15 35 25)"/>
    
    {/* Borde del casco */}
    <circle cx="40" cy="35" r="28" fill="none" stroke="#94a3b8" strokeWidth="3" opacity="0.8"/>
  </svg>
);

const AstronautPanel: React.FC<AstronautPanelProps> = ({ 
  selectedAstronaut: externalSelected,
  onAstronautSelect 
}) => {
  const [internalSelected, setInternalSelected] = useState<number>(0);
  const selectedAstronaut = externalSelected ?? internalSelected;
  
  const astronauts: Astronaut[] = [
    { 
      id: 0, 
      name: 'Alex Chen', 
      color: '#4CAF50', 
      avatar: 'male',
      mission: 'ISS Commander',
      status: 'active'
    },
    { 
      id: 1, 
      name: 'Dr. Maya Rodriguez', 
      color: '#2196F3', 
      avatar: 'female',
      mission: 'Mars Mission Specialist',
      status: 'on-mission'
    },
    { 
      id: 2, 
      name: 'Carlos Santos', 
      color: '#FF9800', 
      avatar: 'male',
      mission: 'Lunar Operations',
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Sofia Nakamura', 
      color: '#E91E63', 
      avatar: 'female',
      mission: 'Space Research',
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Diego Kowalski', 
      color: '#9C27B0', 
      avatar: 'male',
      mission: 'EVA Specialist',
      status: 'inactive'
    }
  ];

  const handleAstronautSelect = (id: number): void => {
    if (onAstronautSelect) {
      onAstronautSelect(id);
    } else {
      setInternalSelected(id);
    }
  };

  const getSkinTone = (id: number): string => {
    const skinTones = ['#fdbcb4', '#f1c27d', '#e0ac69', '#c68642', '#8b5a2b'];
    return skinTones[id % skinTones.length];
  };

  const renderAvatarSVG = (astronaut: Astronaut, size: 'large' | 'small' = 'large'): React.ReactNode => {
    const skinTone = getSkinTone(astronaut.id);
    const svgSize = size === 'large' ? 80 : 40;
    
    if (astronaut.avatar === 'female') {
      return (
        <div style={{ width: svgSize, height: svgSize }}>
          <FemaleAstronautAvatar skinTone={skinTone} />
        </div>
      );
    } else {
      return (
        <div style={{ width: svgSize, height: svgSize }}>
          <MaleAstronautAvatar skinTone={skinTone} />
        </div>
      );
    }
  };

  const getStatusColor = (status?: string): string => {
    switch (status) {
      case 'active': return '#22c55e';
      case 'on-mission': return '#f59e0b';
      case 'inactive': return '#6b7280';
      default: return '#22c55e';
    }
  };

  const getStatusText = (status?: string): string => {
    switch (status) {
      case 'active': return 'Disponible';
      case 'on-mission': return 'En misión';
      case 'inactive': return 'Fuera de servicio';
      default: return 'Disponible';
    }
  };

  return (
    <div className="astronaut-panel">
      <div className="panel-header">
        <button 
          className="nav-button"
          aria-label="Navegar hacia atrás"
          title="Ir atrás"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
      </div>
      
      <div className="main-astronaut">
        <div 
          className={`astronaut-avatar main astronaut-${selectedAstronaut}`}
          data-astronaut-color={astronauts[selectedAstronaut].color}
          style={{ borderColor: astronauts[selectedAstronaut].color }}
        >
          <div className="avatar-inner">
            {renderAvatarSVG(astronauts[selectedAstronaut], 'large')}
          </div>
        </div>
        
        <div className="astronaut-info">
          <div className="astronaut-name">{astronauts[selectedAstronaut].name}</div>
          <div className="astronaut-mission">{astronauts[selectedAstronaut].mission}</div>
          <div className="astronaut-status">
            <div 
              className="status-indicator"
              style={{ backgroundColor: getStatusColor(astronauts[selectedAstronaut].status) }}
            ></div>
            <span>{getStatusText(astronauts[selectedAstronaut].status)}</span>
          </div>
        </div>
      </div>
      
      <div className="astronaut-selection" role="group" aria-label="Seleccionar astronauta">
        {astronauts.map((astronaut) => {
          const isSelected = selectedAstronaut === astronaut.id;
          return (
            <button
              key={astronaut.id}
              className={`astronaut-option astronaut-option-${astronaut.id} ${isSelected ? 'active' : ''}`}
              onClick={() => handleAstronautSelect(astronaut.id)}
              style={{ 
                borderColor: isSelected ? astronaut.color : 'transparent',
                boxShadow: isSelected ? `0 0 15px ${astronaut.color}40` : 'none'
              }}
              aria-label={`Seleccionar astronauta ${astronaut.name}`}
              aria-current={isSelected ? "true" : undefined}
              title={`${astronaut.name} - ${astronaut.mission}`}
            >
              <div className="option-avatar">
                {renderAvatarSVG(astronaut, 'small')}
              </div>
              <div className="option-info">
                <div className="option-name">{astronaut.name.split(' ')[0]}</div>
                <div 
                  className="option-status"
                  style={{ color: getStatusColor(astronaut.status) }}
                >
                  {getStatusText(astronaut.status)}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AstronautPanel;