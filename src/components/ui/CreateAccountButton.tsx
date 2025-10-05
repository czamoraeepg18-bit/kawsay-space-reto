import React from 'react';
import type { CreateAccountButtonProps } from '../../types';
import './CreateAccountButton.css';

const CreateAccountButton: React.FC<CreateAccountButtonProps> = ({ onClick }) => {
  const handleClick = (): void => {
    if (onClick) {
      onClick();
    } else {
      console.log('Navegando a crear cuenta...');
    }
  };

  return (
    <button className="create-account-button" onClick={handleClick}>
      <div className="button-content">
        <div className="flag-icon">
          <div className="flag">
            <div className="flag-stripe red"></div>
            <div className="flag-stripe white"></div>
            <div className="flag-stripe red"></div>
          </div>
        </div>
        <span className="button-text">CREAR CUENTA</span>
      </div>
      <div className="button-glow"></div>
    </button>
  );
};

export default CreateAccountButton;