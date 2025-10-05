import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArticleHeader from '../../components/MissionArticle/ArticleHeader';
import ArticleSection from '../../components/MissionArticle/ArticleSection';
import ResultsTable from '../../components/MissionArticle/ResultsTable';
import ArticleNavigation from '../../components/MissionArticle/ArticleNavigation';
import { NASA_ARTICLES } from '../../data/missions';
import './MissionArticlePage.css';

const MissionArticlePage: React.FC = () => {
  const { missionId } = useParams<{ missionId: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showQuizButton, setShowQuizButton] = useState(false);

  const articleId = `nasa-article-${missionId}`;
  const article = NASA_ARTICLES[articleId];

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(Math.min(progress, 100));
        
        if (progress >= 80) {
          setShowQuizButton(true);
        }
      }
    };

    const content = contentRef.current;
    if (content) {
      content.addEventListener('scroll', handleScroll);
      return () => content.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleBackToMap = () => {
    navigate('/starmap');
  };

  const handleStartQuiz = () => {
    navigate(`/quiz/${missionId}`);
  };

  if (!article) {
    return (
      <div className="mission-article-page mission-article-page--error">
        <div className="mission-article-page__error">
          <h2>Artículo no encontrado</h2>
          <p>El artículo "{missionId}" no está disponible.</p>
          <button onClick={handleBackToMap}>Volver al Mapa Estelar</button>
        </div>
      </div>
    );
  }

  // Renderizar sección según su tipo
  const renderSectionContent = (section: any) => {
    switch (section.type) {
      case 'text':
        return <p dangerouslySetInnerHTML={{ __html: section.content }} />;
      
      case 'list':
        return (
          <ul className="mission-article-page__list">
            {(section.content as string[]).map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        );
      
      case 'steps':
        return (
          <div className="mission-article-page__experiment-steps">
            {(section.content as any[]).map((step, index) => (
              <div key={index} className="mission-article-page__step">
                <div className="mission-article-page__step-number">{step.number}</div>
                <p dangerouslySetInnerHTML={{ __html: step.description }} />
              </div>
            ))}
          </div>
        );
      
      case 'table':
        return (
          <>
            <p className="mission-article-page__results-intro" 
               dangerouslySetInnerHTML={{ __html: section.content }} />
            <ResultsTable />
          </>
        );
      
      default:
        return <p>{section.content}</p>;
    }
  };

  return (
    <div className="mission-article-page">
      {/* Fondo espacial animado */}
      <div className="mission-article-page__background">
        <div className="mission-article-page__stars">
          {Array.from({ length: 150 }, (_, i) => (
            <div
              key={i}
              className="mission-article-page__star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        <div className="mission-article-page__nebula mission-article-page__nebula--orange" />
        <div className="mission-article-page__nebula mission-article-page__nebula--purple" />
      </div>

      {/* Header con navegación */}
      <ArticleHeader  
        missionId={missionId || ''}
        onBack={handleBackToMap}
      />

      {/* Contenido principal con scroll */}
      <div ref={contentRef} className="mission-article-page__content">
        <div className="mission-article-page__container">
          
          {/* Título principal */}
          <div className="mission-article-page__hero">
            <h1 className="mission-article-page__title">
              {article.title}
            </h1>
            <div className="mission-article-page__subtitle">
              <span className="mission-article-page__badge">
                🚀 EXPLORACIÓN ESPACIAL
              </span>
              <span className="mission-article-page__reading-time">
                ⏱️ {article.readingTime} min de lectura
              </span>
            </div>
          </div>

          {/* Renderizar todas las secciones dinámicamente */}
          {article.sections && article.sections.map((section, index) => (
            <ArticleSection
              key={index}
              icon={section.icon}
              title={section.title}
              className={`mission-article-page__section--${section.type || 'default'}`}
            >
              {renderSectionContent(section)}
            </ArticleSection>
          ))}

          {/* Conclusiones si existen */}
          {article.conclusions && article.conclusions.length > 0 && (
            <ArticleSection
              icon="✅"
              title="CONCLUSIÓN DE LA MISIÓN"
              className="mission-article-page__section--conclusion"
            >
              <div className="mission-article-page__conclusion-points">
                {article.conclusions.map((conclusion, index) => (
                  <div key={index} className="mission-article-page__conclusion-point">
                    <div className="mission-article-page__conclusion-icon">
                      {conclusion.icon}
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: conclusion.text }} />
                  </div>
                ))}
              </div>
            </ArticleSection>
          )}

          {/* Referencia */}
          {article.sourceUrl && (
            <div className="mission-article-page__reference">
              <h3>📚 Fuente Científica</h3>
              <a 
                href={article.sourceUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="mission-article-page__reference-link"
              >
                {article.sourceUrl}
              </a>
            </div>
          )}

        </div>
      </div>

      {/* Barra de progreso inferior */}
      <div className="mission-article-page__progress-bar">
        <div 
          className="mission-article-page__progress-fill"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="mission-article-page__progress-label">
          {Math.round(scrollProgress)}%
        </div>
      </div>

      {/* Botón de cuestionario */}
      {showQuizButton && (
        <button 
          className="mission-article-page__quiz-button"
          onClick={handleStartQuiz}
        >
          <span className="mission-article-page__quiz-icon">📝</span>
          <span className="mission-article-page__quiz-text">INICIAR CUESTIONARIO</span>
        </button>
      )}

      {/* Navegación flotante */}
      <ArticleNavigation 
        onBack={handleBackToMap}
        onNext={handleStartQuiz}
        showNext={showQuizButton}
      />
    </div>
  );
};

export default MissionArticlePage;