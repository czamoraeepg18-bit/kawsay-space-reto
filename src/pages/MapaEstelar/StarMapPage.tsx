import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StarMap from '../../components/StarMap/StarMap';
import { createUserProgress } from '../../types/index';
import type { UserProgress} from '../../types/index';
import './StarMapPage.css';

const StarMapPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('kawsayspace-user-progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.warn('Error loading user progress:', error);
      }
    }
    
    return {
      ...createUserProgress(),
      level: 5,
      experience: 450,
      completedMissions: [],
      badges: []
    };
  });

  // Recargar progreso cuando se regrese al mapa
  useEffect(() => {
    const handleFocus = () => {
      const saved = localStorage.getItem('kawsayspace-user-progress');
      if (saved) {
        try {
          const progress = JSON.parse(saved);
          setUserProgress(progress);
          console.log('🔄 Progreso recargado:', progress);
        } catch (error) {
          console.warn('Error reloading progress:', error);
        }
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleMissionSelect = useCallback((missionId: string) => {
    console.log('Mission selected:', missionId);
    navigate(`/mission/${missionId}`);
  }, [navigate]);

  const handleNavigation = useCallback((route: string) => {
    console.log('Navigating to:', route);
    
    switch (route) {
      case 'starmap':
        break;
      case 'laboratory':
        alert('Laboratorio Virtual - Próximamente disponible');
        break;
      case 'profile':
        alert('Perfil de Usuario - Próximamente disponible');
        break;
      case 'comic':
        alert('Cómic Espacial - Próximamente disponible');
        break;
      default:
        console.warn('Unknown route:', route);
    }
  }, []);

  const handleBackToDashboard = useCallback(() => {
    navigate('/dashboard');
  }, [navigate]);

  return (
    <div className="star-map-page">
      <button 
        className="star-map-page__back-button"
        onClick={handleBackToDashboard}
        aria-label="Regresar al panel principal"
        title="Regresar al panel principal"
      >
        <span className="star-map-page__back-icon">←</span>
        <span className="star-map-page__back-text">Dashboard</span>
      </button>

      <StarMap
        onMissionSelect={handleMissionSelect}
        onNavigate={handleNavigation}
        userProgress={userProgress}
      />
    </div>
  );
};

export default StarMapPage;