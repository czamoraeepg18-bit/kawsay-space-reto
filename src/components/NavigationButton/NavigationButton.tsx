import React, { useState } from 'react';
import './NavigationButton.css';

interface NavigationButtonProps {
  icon?: string;
  text?: string;
  variant?: 'profile' | 'logic' | 'account' | 'info' | 'help' | 'question' | 'default';
  size?: 'small' | 'medium' | 'large';
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  tooltip?: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  icon,
  text,
  variant = 'default',
  size = 'medium',
  active = false,
  disabled = false,
  onClick,
  className = '',
  tooltip
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const buttonClasses = [
    'nav-button',
    `nav-button--${variant}`,
    `nav-button--${size}`,
    active && 'nav-button--active',
    disabled && 'nav-button--disabled',
    isHovered && 'nav-button--hovered',
    isPressed && 'nav-button--pressed',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="nav-button-container">
      <button
        className={buttonClasses}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        disabled={disabled}
        title={tooltip}
        aria-label={tooltip || text}
      >
        <div className="nav-button__glow" />
        <div className="nav-button__border" />
        <div className="nav-button__content">
          {icon && !text && (
            <span className="nav-button__icon nav-button__icon--only">
              {icon}
            </span>
          )}
          {icon && text && (
            <>
              <span className="nav-button__icon">{icon}</span>
              <span className="nav-button__text">{text}</span>
            </>
          )}
          {!icon && text && (
            <span className="nav-button__text nav-button__text--only">
              {text}
            </span>
          )}
        </div>
        <div className="nav-button__ripple" />
        {active && <div className="nav-button__indicator" />}
      </button>
      {tooltip && (
        <div className="nav-button__tooltip">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default NavigationButton; // Esta línea está presente y es correcta