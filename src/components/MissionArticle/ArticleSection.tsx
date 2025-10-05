import React from 'react';
import './ArticleSection.css';

interface ArticleSectionProps {
  icon: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ArticleSection: React.FC<ArticleSectionProps> = ({ 
  icon, 
  title, 
  children, 
  className = '' 
}) => {
  return (
    <section className={`article-section ${className}`}>
      <div className="article-section__header">
        <span className="article-section__icon">{icon}</span>
        <h2 className="article-section__title">{title}</h2>
      </div>
      <div className="article-section__content">
        {children}
      </div>
    </section>
  );
};

export default ArticleSection;