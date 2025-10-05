import React from 'react';
import './ArticleNavigation.css';

interface ArticleNavigationProps {
  onBack: () => void;
  onNext: () => void;
  showNext: boolean;
}

const ArticleNavigation: React.FC<ArticleNavigationProps> = ({
  onBack,
  onNext,
  showNext
}) => {
  return (
    <div className="article-navigation">
      <button
        className="article-navigation__button article-navigation__button--back"
        onClick={onBack}
        aria-label="Volver al mapa estelar"
      >
        <span className="article-navigation__icon">←</span>
        <span className="article-navigation__text">MAPA ESTELAR</span>
      </button>

      {showNext && (
        <button
          className="article-navigation__button article-navigation__button--next"
          onClick={onNext}
          aria-label="Continuar al cuestionario"
        >
          <span className="article-navigation__text">CUESTIONARIO</span>
          <span className="article-navigation__icon">→</span>
        </button>
      )}
    </div>
  );
};

export default ArticleNavigation;