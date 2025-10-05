import React from 'react';
import type { UserProfileProps } from '../../types/index';
import './UserProfile.css';

const UserProfile: React.FC<UserProfileProps> = ({
  level,
  userName,
  badges,
  experience = 0,
  className = ''
}) => {
  const getExperienceForNextLevel = (currentLevel: number): number => {
    return currentLevel * 1000; // Simple formula: 1000 XP per level
  };

  const getCurrentLevelProgress = (exp: number, level: number): number => {
    const prevLevelExp = (level - 1) * 1000;
    const nextLevelExp = level * 1000;
    const currentLevelExp = exp - prevLevelExp;
    const totalLevelExp = nextLevelExp - prevLevelExp;
    return Math.min((currentLevelExp / totalLevelExp) * 100, 100);
  };

  const progress = getCurrentLevelProgress(experience, level);
  const nextLevelExp = getExperienceForNextLevel(level);
  const expToNext = nextLevelExp - experience;

  return (
    <div className={`user-profile ${className}`}>
      {/* User Avatar and Info */}
      <div className="user-profile__header">
        <div className="user-profile__avatar">
          <div className="user-profile__avatar-image">
            <span className="user-profile__avatar-icon" aria-hidden="true">
              👨‍🚀
            </span>
          </div>
          <div className="user-profile__level-badge">
            <span className="user-profile__level-text">NIVEL {level}</span>
          </div>
        </div>
        
        <div className="user-profile__info">
          <h2 className="user-profile__name">{userName}</h2>
          <div className="user-profile__title">CADETE CÓSMICO</div>
        </div>
      </div>

      {/* Experience Progress */}
      <div className="user-profile__progress-section">
        <div className="user-profile__progress-header">
          <span className="user-profile__progress-label">PROGRESO</span>
          <span className="user-profile__progress-exp">
            {experience} / {nextLevelExp} XP
          </span>
        </div>
        
        <div className="user-profile__progress-bar">
          <div 
            className="user-profile__progress-fill"
            style={{ width: `${progress}%` }}
          />
          <div className="user-profile__progress-glow" />
        </div>
        
        <div className="user-profile__progress-info">
          <span className="user-profile__exp-to-next">
            {expToNext > 0 ? `${expToNext} XP para siguiente nivel` : 'Nivel máximo alcanzado'}
          </span>
        </div>
      </div>

      {/* Badge Collection */}
      <div className="user-profile__badges-section">
        <h3 className="user-profile__badges-title">INSIGNIAS ({badges.length})</h3>
        
        <div className="user-profile__badges-grid">
          {badges.slice(0, 6).map(badge => (
            <div 
              key={badge.id} 
              className={`user-profile__badge user-profile__badge--${badge.rarity}`}
              title={`${badge.name}: ${badge.description}`}
            >
              <span className="user-profile__badge-icon" aria-hidden="true">
                {badge.icon}
              </span>
              <div className="user-profile__badge-glow" />
            </div>
          ))}
          
          {/* Empty badge slots */}
          {Array.from({ length: Math.max(0, 6 - badges.length) }, (_, i) => (
            <div key={`empty-${i}`} className="user-profile__badge user-profile__badge--empty">
              <span className="user-profile__badge-icon" aria-hidden="true">?</span>
            </div>
          ))}
        </div>

        {badges.length > 6 && (
          <div className="user-profile__badges-more">
            +{badges.length - 6} más
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="user-profile__stats">
        <div className="user-profile__stat">
          <span className="user-profile__stat-value">{badges.length}</span>
          <span className="user-profile__stat-label">Insignias</span>
        </div>
        <div className="user-profile__stat">
          <span className="user-profile__stat-value">{level}</span>
          <span className="user-profile__stat-label">Nivel</span>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="user-profile__decoration" aria-hidden="true">
        <div className="user-profile__star user-profile__star--1"></div>
        <div className="user-profile__star user-profile__star--2"></div>
        <div className="user-profile__star user-profile__star--3"></div>
      </div>
    </div>
  );
};

export default UserProfile;