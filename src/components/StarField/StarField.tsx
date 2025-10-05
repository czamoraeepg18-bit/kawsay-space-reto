import React, { useEffect, useState } from 'react';
import './StarField.css';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: number;
  twinkleSpeed: number;
}

interface StarFieldProps {
  starCount?: number;
  className?: string;
}

const StarField: React.FC<StarFieldProps> = ({ 
  starCount = 200, 
  className = '' 
}) => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = (): Star[] => {
      return Array.from({ length: starCount }, (_, index) => ({
        id: index,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        animationDelay: Math.random() * 3,
        twinkleSpeed: Math.random() * 2 + 2
      }));
    };

    setStars(generateStars());
  }, [starCount]);

  return (
    <div className={`starfield ${className}`}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.animationDelay}s`,
            animationDuration: `${star.twinkleSpeed}s`
          }}
        />
      ))}
    </div>
  );
};

export default StarField; // Asegúrate de que esta línea esté presente y sin errores