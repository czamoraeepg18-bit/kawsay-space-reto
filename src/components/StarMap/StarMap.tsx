import React, { useState, useEffect, useCallback } from 'react';
import PlanetNode from './PlanetNode';
import UserProfile from '../UserProfile/UserProfile';
import MissionPanel from '../MissionPanel/MissionPanel';
import NavigationBar from '../NavigationBar/NavigationBar';
import ConnectionLines from './ConnectionLines';
import StarField from '../StarField/StarField';
import { STAR_MAP_MISSIONS } from '../../data/missions';
import type { StarMapMission, Badge } from '../../types/index';
import './StarMap.css';

interface UserProgress {
  level: number;
  completedMissions: string[];
  badges: Badge[];
  currentMission?: string;
  experience?: number;
  totalMissionsCompleted?: number;
}

interface StarMapProps {
  onMissionSelect?: (missionId: string) => void;
  onNavigate?: (route: string) => void;
  userProgress?: UserProgress;
}

const DEFAULT_USER_PROGRESS: UserProgress = {
  level: 5,
  completedMissions: [],
  badges: [],
  currentMission: undefined,
  experience: 450,
  totalMissionsCompleted: 0
};

const StarMap: React.FC<StarMapProps> = ({
  onMissionSelect,
  onNavigate,
  userProgress = DEFAULT_USER_PROGRESS
}) => {
  const [missions, setMissions] = useState<StarMapMission[]>([]);
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const [activeMissions, setActiveMissions] = useState<StarMapMission[]>([]);
  const [unlockedPowers, setUnlockedPowers] = useState<string[]>([]);

  // Inicializar y actualizar misiones basado en el progreso del usuario
  useEffect(() => {
    const updatedMissions = STAR_MAP_MISSIONS.map((mission: StarMapMission) => {
      // Primera misión (bone-loss) siempre desbloqueada
      const isFirstMission = mission.id === 'bone-loss';
      
      // Verificar si alguna misión prerequisito está completada
      const hasCompletedPrerequisites = STAR_MAP_MISSIONS.some((prerequisite: StarMapMission) =>
        prerequisite.connections.includes(mission.id) &&
        userProgress.completedMissions.includes(prerequisite.id)
      );

      // Verificar si esta misión está completada
      const isCompleted = userProgress.completedMissions.includes(mission.id);

      return {
        ...mission,
        isLocked: !isFirstMission && !hasCompletedPrerequisites && !isCompleted,
        isCompleted
      };
    });

    setMissions(updatedMissions);

    // Misiones activas (disponibles pero no completadas)
    const active = updatedMissions.filter((mission: StarMapMission) => 
      !mission.isLocked && !mission.isCompleted
    );
    setActiveMissions(active);

    // Poderes desbloqueados
    const powers = userProgress.completedMissions
      .map((missionId: string) => {
        const mission = updatedMissions.find((m: StarMapMission) => m.id === missionId);
        return mission ? `${mission.name} - ${mission.description}` : '';
      })
      .filter(Boolean);
    setUnlockedPowers(powers);

  }, [userProgress.completedMissions]);

  const handleMissionClick = useCallback((missionId: string) => {
    const mission = missions.find((m: StarMapMission) => m.id === missionId);
    
    if (!mission) return;
    
    if (mission.isLocked) {
      console.log(`Misión ${mission.name} está bloqueada`);
      return;
    }

    setSelectedMission(missionId);
    onMissionSelect?.(missionId);
  }, [missions, onMissionSelect]);

  const handleNavigation = useCallback((route: string) => {
    onNavigate?.(route);
  }, [onNavigate]);

  return (
    <div className="star-map">
      {/* StarField Component - Campo de estrellas animado */}
      <StarField starCount={300} className="star-map__starfield-bg" />
      
      {/* Vía Láctea */}
      <div className="star-map__milky-way">
        <div className="milky-way__core"></div>
        <div className="milky-way__band milky-way__band--1"></div>
        <div className="milky-way__band milky-way__band--2"></div>
        <div className="milky-way__band milky-way__band--3"></div>
        <div className="milky-way__stars-dense"></div>
      </div>
      
      <div className="star-map__starfield">
        <div className="star-map__nebula star-map__nebula--purple"></div>
        <div className="star-map__nebula star-map__nebula--blue"></div>
        <div className="star-map__nebula star-map__nebula--orange"></div>
        
        {/* Meteoritos */}
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={`meteor-${i}`}
            className="star-map__meteor"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${Math.random() * 40}%`,
              animationDelay: `${i * 5 + Math.random() * 4}s`,
              animationDuration: `${1.2 + Math.random() * 0.8}s`
            }}
          />
        ))}
        
        {/* Constelaciones de fondo */}
        <div className="star-map__constellation star-map__constellation--1">
          <div className="constellation-star" style={{ left: '15%', top: '20%' }}></div>
          <div className="constellation-star" style={{ left: '18%', top: '23%' }}></div>
          <div className="constellation-star" style={{ left: '20%', top: '18%' }}></div>
          <div className="constellation-star" style={{ left: '22%', top: '25%' }}></div>
          <svg className="constellation-lines">
            <line x1="15%" y1="20%" x2="18%" y2="23%" />
            <line x1="18%" y1="23%" x2="20%" y2="18%" />
            <line x1="20%" y1="18%" x2="22%" y2="25%" />
          </svg>
        </div>
        
        <div className="star-map__constellation star-map__constellation--2">
          <div className="constellation-star" style={{ left: '75%', top: '30%' }}></div>
          <div className="constellation-star" style={{ left: '78%', top: '28%' }}></div>
          <div className="constellation-star" style={{ left: '80%', top: '35%' }}></div>
          <div className="constellation-star" style={{ left: '76%', top: '37%' }}></div>
          <svg className="constellation-lines">
            <line x1="75%" y1="30%" x2="78%" y2="28%" />
            <line x1="78%" y1="28%" x2="80%" y2="35%" />
            <line x1="80%" y1="35%" x2="76%" y2="37%" />
            <line x1="76%" y1="37%" x2="75%" y2="30%" />
          </svg>
        </div>
        
        {/* Galaxia distante */}
        <div className="star-map__galaxy star-map__galaxy--spiral" 
             style={{ left: '85%', top: '15%' }}></div>
        <div className="star-map__galaxy star-map__galaxy--elliptical" 
             style={{ left: '10%', top: '70%' }}></div>
        
        {/* Cometas */}
        {Array.from({ length: 2 }, (_, i) => (
          <div
            key={`comet-${i}`}
            className="star-map__comet"
            style={{
              left: `${20 + i * 40}%`,
              top: `${10 + i * 30}%`,
              animationDelay: `${i * 15}s`
            }}
          />
        ))}
        
        {/* Polvo estelar brillante */}
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={`stardust-${i}`}
            className="star-map__stardust"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Auroras espaciales */}
        <div className="star-map__aurora star-map__aurora--1"></div>
        <div className="star-map__aurora star-map__aurora--2"></div>
        
        {/* Supernovas lejanas */}
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={`supernova-${i}`}
            className="star-map__supernova"
            style={{
              left: `${25 + i * 30}%`,
              top: `${40 + i * 15}%`,
              animationDelay: `${i * 8}s`
            }}
          />
        ))}
        
        {/* Estrellas fugaces rápidas */}
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={`shooting-star-${i}`}
            className="star-map__shooting-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${i * 7 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <UserProfile
        level={userProgress.level}
        userName="Cadete Cósmico"
        badges={userProgress.badges}
        experience={userProgress.experience}
        className="star-map__user-profile"
      />

      <MissionPanel
        activeMissions={activeMissions}
        unlockedPowers={unlockedPowers}
        className="star-map__mission-panel"
      />

      <ConnectionLines
        missions={missions}
        className="star-map__connections"
      />

      <div className="star-map__nodes">
        {missions.map((mission: StarMapMission) => (
          <PlanetNode
            key={mission.id}
            mission={mission}
            isSelected={selectedMission === mission.id}
            onClick={() => handleMissionClick(mission.id)}
            style={{
              left: `${mission.position.x}%`,
              top: `${mission.position.y}%`
            }}
          />
        ))}
      </div>

      <NavigationBar
        onNavigate={handleNavigation}
        activeSection="starmap"
        className="star-map__navigation"
      />

      <div className="star-map__floating-elements">
        <div className="star-map__cosmic-dust star-map__cosmic-dust--1"></div>
        <div className="star-map__cosmic-dust star-map__cosmic-dust--2"></div>
        <div className="star-map__cosmic-dust star-map__cosmic-dust--3"></div>
      </div>
    </div>
  );
};

export default StarMap;