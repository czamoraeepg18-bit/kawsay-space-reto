import React from 'react';

const BackgroundScene: React.FC = () => {
  // Generate starfield
  const generateStarField = () => {
    return [...Array(300)].map((_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 70;
      const size = i % 5 === 4 ? 1 : i % 3 === 0 ? 3 : 2;
      const background = i % 5 === 4 ? '#ffd700' : i % 3 === 0 ? '#87ceeb' : 'white';
      const animationDelay = Math.random() * 2;

      return (
        <div
          key={`star-${i}`}
          className="star"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size}px`,
            background,
            animationDelay: `${animationDelay}s`
          }}
        />
      );
    });
  };

  const stars = generateStarField();

  return (
    <div className="background-scene">
      <style>{`
        .background-scene {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(
            to bottom,
            #0c1220 0%,
            #1a202c 20%,
            #2d1b69 40%,
            #5b21b6 55%,
            #7c2d12 65%,
            #f59e0b 80%,
            #fbbf24 90%,
            #fef3c7 100%
          );
          overflow: hidden;
          z-index: -1;
        }

        /* Sun */
        .sun {
          position: absolute;
          bottom: 25%;
          right: 8%;
          width: 120px;
          height: 120px;
          background: radial-gradient(
            circle,
            #fff8dc 0%,
            #ffd700 20%,
            #ff8c00 40%,
            #ff6347 70%,
            #ff4500 100%
          );
          border-radius: 50%;
          box-shadow: 
            0 0 50px rgba(255, 215, 0, 0.8),
            0 0 100px rgba(255, 140, 0, 0.6),
            0 0 150px rgba(255, 69, 0, 0.4),
            0 0 200px rgba(255, 99, 71, 0.2);
          animation: sun-pulse 4s ease-in-out infinite alternate;
          z-index: 5;
        }

        @keyframes sun-pulse {
          0% { 
            transform: scale(1);
            box-shadow: 
              0 0 50px rgba(255, 215, 0, 0.8),
              0 0 100px rgba(255, 140, 0, 0.6),
              0 0 150px rgba(255, 69, 0, 0.4),
              0 0 200px rgba(255, 99, 71, 0.2);
          }
          100% { 
            transform: scale(1.05);
            box-shadow: 
              0 0 60px rgba(255, 215, 0, 0.9),
              0 0 120px rgba(255, 140, 0, 0.7),
              0 0 180px rgba(255, 69, 0, 0.5),
              0 0 240px rgba(255, 99, 71, 0.3);
          }
        }

        /* Sun rays */
        .sun-rays {
          position: absolute;
          bottom: 25%;
          right: 8%;
          width: 120px;
          height: 120px;
          z-index: 4;
        }

        .sun-ray {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 2px;
          height: 80px;
          background: linear-gradient(
            to top,
            rgba(255, 215, 0, 0.8) 0%,
            rgba(255, 140, 0, 0.4) 50%,
            transparent 100%
          );
          transform-origin: bottom center;
          animation: ray-rotate 20s linear infinite;
        }

        .sun-ray:nth-child(1) { transform: translate(-50%, -50%) rotate(0deg); }
        .sun-ray:nth-child(2) { transform: translate(-50%, -50%) rotate(30deg); }
        .sun-ray:nth-child(3) { transform: translate(-50%, -50%) rotate(60deg); }
        .sun-ray:nth-child(4) { transform: translate(-50%, -50%) rotate(90deg); }
        .sun-ray:nth-child(5) { transform: translate(-50%, -50%) rotate(120deg); }
        .sun-ray:nth-child(6) { transform: translate(-50%, -50%) rotate(150deg); }
        .sun-ray:nth-child(7) { transform: translate(-50%, -50%) rotate(180deg); }
        .sun-ray:nth-child(8) { transform: translate(-50%, -50%) rotate(210deg); }
        .sun-ray:nth-child(9) { transform: translate(-50%, -50%) rotate(240deg); }
        .sun-ray:nth-child(10) { transform: translate(-50%, -50%) rotate(270deg); }
        .sun-ray:nth-child(11) { transform: translate(-50%, -50%) rotate(300deg); }
        .sun-ray:nth-child(12) { transform: translate(-50%, -50%) rotate(330deg); }

        @keyframes ray-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Enhanced sunrise glow */
        .sunrise-glow {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 60%;
          height: 50%;
          background: radial-gradient(
            ellipse at bottom right,
            rgba(255, 215, 0, 0.4) 0%,
            rgba(255, 140, 0, 0.3) 20%,
            rgba(255, 69, 0, 0.2) 40%,
            rgba(255, 99, 71, 0.1) 60%,
            transparent 80%
          );
          z-index: 1;
          animation: glow-pulse 6s ease-in-out infinite alternate;
        }

        @keyframes glow-pulse {
          0% { opacity: 0.6; }
          100% { opacity: 1; }
        }

        /* Atmospheric light rays */
        .atmospheric-rays {
          position: absolute;
          bottom: 20%;
          right: 10%;
          width: 300px;
          height: 200px;
          z-index: 2;
        }

        .light-beam {
          position: absolute;
          bottom: 0;
          right: 50px;
          width: 3px;
          height: 150px;
          background: linear-gradient(
            to top,
            rgba(255, 215, 0, 0.6) 0%,
            rgba(255, 140, 0, 0.3) 50%,
            transparent 100%
          );
          transform-origin: bottom center;
          animation: beam-sway 8s ease-in-out infinite;
        }

        .light-beam:nth-child(1) { 
          transform: rotate(-15deg);
          animation-delay: 0s;
        }
        .light-beam:nth-child(2) { 
          transform: rotate(-5deg);
          animation-delay: 1s;
          right: 80px;
        }
        .light-beam:nth-child(3) { 
          transform: rotate(5deg);
          animation-delay: 2s;
          right: 20px;
        }
        .light-beam:nth-child(4) { 
          transform: rotate(15deg);
          animation-delay: 3s;
          right: 110px;
        }

        @keyframes beam-sway {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        /* Stars */
        .stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 70%;
          z-index: 2;
        }

        .star {
          position: absolute;
          border-radius: 50%;
          animation: twinkle 2s infinite alternate;
        }

        @keyframes twinkle {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }

        /* Caballito de totora con cóndor */
        .totora-rider {
          position: absolute;
          top: 22%;
          right: 40%;
          animation: epic-journey 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          z-index: 15;
          filter: drop-shadow(0 0 37.5px rgba(255, 140, 0, 0.3));
        }

        .rider-container {
          position: relative;
          animation: water-bobbing 2s ease-in-out infinite;
        }

        /* Cóndor andino realista */
        .condor {
          position: absolute;
          top: -67.5px;
          left: 97.5px;
          z-index: 17;
          animation: condor-soaring 2s ease-in-out infinite;
          filter: 
            drop-shadow(0 0 30px rgba(0, 0, 0, 0.6))
            drop-shadow(0 0 60px rgba(139, 69, 19, 0.3));
          transform-origin: center;
        }

        .condor-body {
          width: 37.5px;
          height: 60px;
          background: linear-gradient(180deg, 
            #1a1a1a 0%, 
            #2d2d2d 20%, 
            #000000 60%, 
            #1a1a1a 100%
          );
          border-radius: 50% 50% 60% 60%;
          position: relative;
          box-shadow: 
            0 0 22.5px rgba(0, 0, 0, 0.5),
            inset 0 7.5px 15px rgba(255, 255, 255, 0.1);
        }

        .condor-head {
          position: absolute;
          top: -18px;
          left: 50%;
          transform: translateX(-50%);
          width: 18px;
          height: 22.5px;
          background: linear-gradient(180deg, 
            #ff6b47 0%, 
            #ff4757 40%, 
            #ff3742 100%
          );
          border-radius: 60% 60% 40% 40%;
          box-shadow: 0 0 12px rgba(255, 71, 87, 0.4);
        }

        .condor-beak {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 4.5px solid transparent;
          border-right: 4.5px solid transparent;
          border-top: 12px solid #2c2c54;
          filter: drop-shadow(0 1.5px 3px rgba(0, 0, 0, 0.3));
        }

        .condor-collar {
          position: absolute;
          top: 7.5px;
          left: 50%;
          transform: translateX(-50%);
          width: 42px;
          height: 12px;
          background: linear-gradient(180deg, 
            #ffffff 0%, 
            #f1f2f6 50%, 
            #ddd 100%
          );
          border-radius: 50%;
          box-shadow: 
            0 0 15px rgba(255, 255, 255, 0.6),
            inset 0 3px 6px rgba(0, 0, 0, 0.1);
        }

        .condor-wing-left {
          position: absolute;
          top: 12px;
          left: -67.5px;
          width: 75px;
          height: 30px;
          background: linear-gradient(45deg, 
            #1a1a1a 0%, 
            #2d2d2d 30%, 
            #000000 70%, 
            #1a1a1a 100%
          );
          border-radius: 50% 10% 80% 20%;
          transform-origin: right center;
          animation: wing-flap-left 2s ease-in-out infinite;
          box-shadow: 
            0 0 22.5px rgba(0, 0, 0, 0.4),
            inset 0 4.5px 12px rgba(255, 255, 255, 0.05);
        }

        .condor-wing-right {
          position: absolute;
          top: 12px;
          right: -67.5px;
          width: 75px;
          height: 30px;
          background: linear-gradient(-45deg, 
            #1a1a1a 0%, 
            #2d2d2d 30%, 
            #000000 70%, 
            #1a1a1a 100%
          );
          border-radius: 10% 50% 20% 80%;
          transform-origin: left center;
          animation: wing-flap-right 2s ease-in-out infinite;
          box-shadow: 
            0 0 22.5px rgba(0, 0, 0, 0.4),
            inset 0 4.5px 12px rgba(255, 255, 255, 0.05);
        }

        .wing-feathers-left {
          position: absolute;
          top: 3px;
          left: -12px;
          width: 52.5px;
          height: 4.5px;
          background: 
            repeating-linear-gradient(90deg, 
              #000000 0px, 
              #1a1a1a 4.5px, 
              #2d2d2d 9px, 
              #1a1a1a 13.5px
            );
          border-radius: 3px;
          opacity: 0.8;
        }

        .wing-feathers-right {
          position: absolute;
          top: 3px;
          right: -12px;
          width: 52.5px;
          height: 4.5px;
          background: 
            repeating-linear-gradient(-90deg, 
              #000000 0px, 
              #1a1a1a 4.5px, 
              #2d2d2d 9px, 
              #1a1a1a 13.5px
            );
          border-radius: 3px;
          opacity: 0.8;
        }

        .condor-tail {
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 18px;
          background: linear-gradient(180deg, 
            #1a1a1a 0%, 
            #000000 100%
          );
          border-radius: 0 0 60% 60%;
          box-shadow: inset 0 3px 6px rgba(255, 255, 255, 0.05);
        }

        /* Caballito de totora auténtico peruano */
        .totora-boat {
          width: 195px;
          height: 27px;
          position: relative;
          background: linear-gradient(to right, 
            #CD853F 0%,
            #DAA520 8%,
            #F4A460 18%,
            #FFD700 30%,
            #FFF8DC 45%,
            #FFEB3B 55%,
            #FFD700 70%,
            #F4A460 82%,
            #DAA520 92%,
            #CD853F 100%
          );
          border-radius: 0 90px 90px 0;
          transform: perspective(120px) rotateX(8deg);
          box-shadow: 
            0 12px 37.5px rgba(205, 133, 63, 0.5),
            0 6px 22.5px rgba(255, 215, 0, 0.3),
            inset 0 4.5px 12px rgba(255, 248, 220, 0.4),
            inset 0 -4.5px 12px rgba(205, 133, 63, 0.6);
          border: 1.5px solid rgba(218, 165, 32, 0.8);
        }

        .totora-boat::before {
          content: '';
          position: absolute;
          top: 1.5px;
          left: 3px;
          width: 189px;
          height: 24px;
          background: 
            repeating-linear-gradient(90deg, 
              rgba(255, 215, 0, 0.9) 0px, 
              rgba(255, 235, 59, 0.7) 1.5px, 
              rgba(255, 248, 220, 0.5) 3px, 
              rgba(255, 235, 59, 0.7) 4.5px, 
              rgba(255, 215, 0, 0.9) 6px,
              rgba(244, 164, 96, 0.3) 7.5px,
              rgba(218, 165, 32, 0.4) 9px
            );
          border-radius: 0 82.5px 82.5px 0;
          opacity: 0.95;
        }

        .boat-prow {
          position: absolute;
          top: -37.5px;
          right: -18px;
          width: 30px;
          height: 75px;
          background: linear-gradient(170deg, 
            #B8860B 0%, 
            #DAA520 15%, 
            #F4A460 30%, 
            #FFD700 45%, 
            #FFF8DC 60%, 
            #FFEB3B 75%, 
            #FFD700 90%, 
            #F4A460 100%
          );
          border-radius: 40% 60% 30% 20%;
          transform: rotate(-35deg) perspective(60px) rotateY(20deg);
          box-shadow: 
            0 0 22.5px rgba(255, 215, 0, 0.6),
            0 0 37.5px rgba(255, 235, 59, 0.3),
            inset 4.5px 0 15px rgba(255, 248, 220, 0.4),
            inset -1.5px 0 9px rgba(184, 134, 11, 0.5);
        }

        .boat-stern {
          position: absolute;
          top: -27px;
          left: -22.5px;
          width: 27px;
          height: 60px;
          background: linear-gradient(190deg, 
            #B8860B 0%, 
            #DAA520 20%, 
            #F4A460 35%, 
            #FFD700 50%, 
            #FFF8DC 65%, 
            #FFEB3B 80%, 
            #FFD700 100%
          );
          border-radius: 60% 40% 20% 30%;
          transform: rotate(25deg) perspective(60px) rotateY(-20deg);
          box-shadow: 
            0 0 18px rgba(255, 215, 0, 0.5),
            0 0 30px rgba(255, 235, 59, 0.2),
            inset -4.5px 0 12px rgba(255, 248, 220, 0.4),
            inset 1.5px 0 9px rgba(184, 134, 11, 0.5);
        }

        .mystical-propulsion {
          position: absolute;
          bottom: -22.5px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 30px;
          background: radial-gradient(ellipse at center, 
            rgba(0, 255, 255, 0.8) 0%, 
            rgba(30, 144, 255, 0.6) 40%, 
            rgba(0, 191, 255, 0.3) 70%,
            transparent 100%
          );
          border-radius: 50%;
          animation: mystical-glow 0.6s ease-in-out infinite alternate;
          box-shadow: 
            0 0 37.5px rgba(0, 255, 255, 0.4),
            0 0 75px rgba(30, 144, 255, 0.2);
        }

        /* Propulsores espaciales con luces debajo */
        .space-thrusters {
          position: absolute;
          bottom: -45px;
          left: 50%;
          transform: translateX(-50%);
          width: 180px;
          height: 60px;
          z-index: 16;
        }

        .thruster {
          position: absolute;
          bottom: 0;
          width: 15px;
          height: 45px;
          background: linear-gradient(
            to bottom,
            rgba(0, 150, 255, 0.9) 0%,
            rgba(0, 200, 255, 0.8) 20%,
            rgba(255, 255, 255, 0.9) 40%,
            rgba(0, 255, 255, 0.7) 70%,
            transparent 100%
          );
          border-radius: 50% 50% 0 0;
          animation: thruster-flame 0.3s ease-in-out infinite alternate;
          box-shadow: 
            0 0 15px rgba(0, 200, 255, 0.6),
            0 0 30px rgba(0, 255, 255, 0.4);
          transition: box-shadow 0.2s ease-in-out;
        }

        .thruster::after {
          content: '';
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 40px;
          background: linear-gradient(
            to bottom,
            rgba(0, 255, 255, 0.9) 0%,
            rgba(0, 200, 255, 0.7) 50%,
            transparent 100%
          );
          border-radius: 50% 50% 0 0;
          opacity: 0.8;
          animation: thruster-light 0.5s ease-in-out infinite alternate;
          box-shadow: 
            0 0 30px rgba(0, 255, 255, 0.8),
            0 0 60px rgba(0, 200, 255, 0.6),
            0 0 90px rgba(255, 255, 255, 0.4);
        }

        .thruster-left {
          left: 30px;
          animation-delay: 0s;
        }

        .thruster-center-left {
          left: 60px;
          animation-delay: 0.1s;
          height: 50px;
        }

        .thruster-center-right {
          right: 60px;
          animation-delay: 0.2s;
          height: 50px;
        }

        .thruster-right {
          right: 30px;
          animation-delay: 0.15s;
        }

        @keyframes thruster-flame {
          0% { 
            transform: scaleY(1) scaleX(0.8);
            opacity: 0.8;
            box-shadow: 
              0 0 15px rgba(0, 200, 255, 0.6),
              0 0 30px rgba(0, 255, 255, 0.4);
          }
          100% { 
            transform: scaleY(1.3) scaleX(1.1);
            opacity: 1;
            box-shadow: 
              0 0 30px rgba(0, 200, 255, 0.9),
              0 0 60px rgba(0, 255, 255, 0.7),
              0 0 90px rgba(255, 255, 255, 0.5);
          }
        }

        /* Luces de propulsores durante el movimiento */
        .totora-rider .space-thrusters .thruster {
          animation: thruster-glow 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes thruster-glow {
          0%, 5% { box-shadow: 0 0 15px rgba(0, 200, 255, 0.6), 0 0 30px rgba(0, 255, 255, 0.4); }
          10%, 15% { box-shadow: 0 0 30px rgba(0, 200, 255, 0.9), 0 0 60px rgba(0, 255, 255, 0.7), 0 0 90px rgba(255, 255, 255, 0.5); }
          20%, 25% { box-shadow: 0 0 40px rgba(0, 200, 255, 1), 0 0 80px rgba(0, 255, 255, 0.8), 0 0 120px rgba(255, 255, 255, 0.6); }
          30%, 35% { box-shadow: 0 0 30px rgba(0, 200, 255, 0.9), 0 0 60px rgba(0, 255, 255, 0.7), 0 0 90px rgba(255, 255, 255, 0.5); }
          40%, 45% { box-shadow: 0 0 20px rgba(0, 200, 255, 0.7), 0 0 40px rgba(0, 255, 255, 0.5); }
          50%, 55% { box-shadow: 0 0 30px rgba(0, 200, 255, 0.9), 0 0 60px rgba(0, 255, 255, 0.7), 0 0 90px rgba(255, 255, 255, 0.5); }
          60%, 65% { box-shadow: 0 0 40px rgba(0, 200, 255, 1), 0 0 80px rgba(0, 255, 255, 0.8), 0 0 120px rgba(255, 255, 255, 0.6); }
          70%, 75% { box-shadow: 0 0 30px rgba(0, 200, 255, 0.9), 0 0 60px rgba(0, 255, 255, 0.7), 0 0 90px rgba(255, 255, 255, 0.5); }
          80%, 85% { box-shadow: 0 0 20px rgba(0, 200, 255, 0.7), 0 0 40px rgba(0, 255, 255, 0.5); }
          90%, 95% { box-shadow: 0 0 30px rgba(0, 200, 255, 0.9), 0 0 60px rgba(0, 255, 255, 0.7), 0 0 90px rgba(255, 255, 255, 0.5); }
          100% { box-shadow: 0 0 15px rgba(0, 200, 255, 0.6), 0 0 30px rgba(0, 255, 255, 0.4); }
        }

        /* Luces debajo de los propulsores */
        @keyframes thruster-light {
          0% { 
            height: 40px;
            opacity: 0.8;
            transform: translateX(-50%) scaleY(1);
            box-shadow: 
              0 0 30px rgba(0, 255, 255, 0.8),
              0 0 60px rgba(0, 200, 255, 0.6),
              0 0 90px rgba(255, 255, 255, 0.4);
          }
          100% { 
            height: 70px;
            opacity: 1;
            transform: translateX(-50%) scaleY(1.8);
            box-shadow: 
              0 0 50px rgba(0, 255, 255, 1),
              0 0 100px rgba(0, 200, 255, 0.9),
              0 0 150px rgba(255, 255, 255, 0.6);
          }
        }

        /* Partículas de escape */
        .thruster-particles {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 80px;
          z-index: 14;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle,
            rgba(0, 255, 255, 1) 0%,
            rgba(0, 200, 255, 0.8) 50%,
            transparent 100%
          );
          border-radius: 50%;
          animation: particle-trail 1s ease-out infinite;
        }

        .particle:nth-child(1) { left: 20%; animation-delay: 0s; }
        .particle:nth-child(2) { left: 35%; animation-delay: 0.1s; }
        .particle:nth-child(3) { left: 50%; animation-delay: 0.2s; }
        .particle:nth-child(4) { left: 65%; animation-delay: 0.15s; }
        .particle:nth-child(5) { left: 80%; animation-delay: 0.05s; }

        @keyframes particle-trail {
          0% { 
            transform: translateY(0px) scale(1);
            opacity: 1;
          }
          100% { 
            transform: translateY(60px) scale(0.2);
            opacity: 0;
          }
        }

        /* Ondas de energía */
        .energy-waves {
          position: absolute;
          bottom: -60px;
          left: 50%;
          transform: translateX(-50%);
          width: 150px;
          height: 150px;
          z-index: 13;
        }

        .energy-wave {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 100%;
          border: 2px solid rgba(0, 255, 255, 0.6);
          border-radius: 50%;
          animation: energy-pulse 2s ease-out infinite;
        }

        .energy-wave:nth-child(1) { animation-delay: 0s; }
        .energy-wave:nth-child(2) { animation-delay: 0.5s; }
        .energy-wave:nth-child(3) { animation-delay: 1s; }

        @keyframes energy-pulse {
          0% {
            transform: translateX(-50%) scale(0.3);
            opacity: 1;
            border-color: rgba(0, 255, 255, 0.8);
          }
          100% {
            transform: translateX(-50%) scale(1.2);
            opacity: 0;
            border-color: rgba(0, 255, 255, 0);
          }
        }

        /* Animaciones */
        @keyframes mystical-glow {
          0%, 100% { opacity: 0.8; transform: scale(1.1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes condor-soaring {
          0%, 100% { 
            transform: translateY(0) rotateY(0deg) rotateZ(0deg);
            filter: drop-shadow(0 0 30px rgba(0, 0, 0, 0.6));
          }
          50% { 
            transform: translateY(-7.5px) rotateY(10deg) rotateZ(2deg);
            filter: drop-shadow(0 0 52.5px rgba(0, 0, 0, 0.8));
          }
        }

        @keyframes wing-flap-left {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-25deg); }
        }

        @keyframes wing-flap-right {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(25deg); }
        }

        @keyframes epic-journey {
          0% { 
            transform: translateX(140vw) translateY(0px) rotateZ(0deg);
            filter: drop-shadow(0 0 37.5px rgba(255, 140, 0, 0.3));
          }
          5% { 
            transform: translateX(120vw) translateY(-22.5px) rotateZ(-2deg);
          }
          10% { 
            transform: translateX(105vw) translateY(-45px) rotateZ(-4deg);
          }
          15% { 
            transform: translateX(90vw) translateY(-37.5px) rotateZ(-3deg);
          }
          20% { 
            transform: translateX(78vw) translateY(-60px) rotateZ(-5deg);
          }
          25% { 
            transform: translateX(66vw) translateY(-52.5px) rotateZ(-4deg);
          }
          30% { 
            transform: translateX(56vw) translateY(-30px) rotateZ(-2deg);
          }
          35% { 
            transform: translateX(47vw) translateY(-15px) rotateZ(-1deg);
          }
          40% { 
            transform: translateX(38vw) translateY(7.5px) rotateZ(1deg);
          }
          45% { 
            transform: translateX(30vw) translateY(22.5px) rotateZ(3deg);
          }
          50% { 
            transform: translateX(23vw) translateY(37.5px) rotateZ(4deg);
          }
          55% { 
            transform: translateX(17vw) translateY(30px) rotateZ(3deg);
          }
          60% { 
            transform: translateX(12vw) translateY(15px) rotateZ(2deg);
          }
          65% { 
            transform: translateX(7vw) translateY(-7.5px) rotateZ(0deg);
          }
          70% { 
            transform: translateX(3vw) translateY(-22.5px) rotateZ(-2deg);
          }
          75% { 
            transform: translateX(-1vw) translateY(-37.5px) rotateZ(-4deg);
          }
          80% { 
            transform: translateX(-5vw) translateY(-52.5px) rotateZ(-5deg);
          }
          85% { 
            transform: translateX(-10vw) translateY(-60px) rotateZ(-6deg);
          }
          90% { 
            transform: translateX(-15vw) translateY(-52.5px) rotateZ(-5deg);
          }
          95% { 
            transform: translateX(-20vw) translateY(-30px) rotateZ(-3deg);
          }
          100% { 
            transform: translateX(-30vw) translateY(0px) rotateZ(0deg);
            filter: drop-shadow(0 0 60px rgba(255, 140, 0, 0.5));
          }
        }

        @keyframes water-bobbing {
          0%, 100% { 
            transform: translateY(0px) rotateX(0deg);
          }
          50% { 
            transform: translateY(-4.5px) rotateX(2deg);
          }
        }

        /* Montañas andinas más suaves y menos puntiagudas */
        .mountains {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50%;
          z-index: 1;
        }

        .mountain {
          position: absolute;
          bottom: 0;
        }

        /* Montaña izquierda - forma más suave */
        .mountain-1 {
          left: 0;
          width: 0;
          height: 0;
          border-left: 300px solid transparent;
          border-right: 400px solid transparent;
          border-bottom: 400px solid #4a4033; /* Tierra marrón oscuro */
          border-radius: 70% 70% 30% 30%; /* Más redondeado */
        }

        /* Montaña central - menos puntiaguda */
        .mountain-2 {
          left: 20%;
          width: 0;
          height: 0;
          border-left: 350px solid transparent;
          border-right: 450px solid transparent;
          border-bottom: 450px solid #3e2f1a; /* Marrón rojizo */
          border-radius: 75% 75% 40% 40%; /* Más redondeado */
        }

        /* Montaña derecha - suave y menos puntiaguda */
        .mountain-3 {
          right: 0;
          width: 0;
          height: 0;
          border-left: 320px solid transparent;
          border-right: 300px solid transparent;
          border-bottom: 380px solid #4a4033; /* Tierra marrón oscuro */
          border-radius: 65% 65% 35% 35%; /* Más redondeado */
        }

        /* Enhanced horizon gradient */
        .horizon-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 300px;
          background: linear-gradient(
            to top,
            rgba(255, 215, 0, 0.4) 0%,
            rgba(255, 140, 0, 0.3) 20%,
            rgba(255, 69, 0, 0.2) 40%,
            rgba(255, 99, 71, 0.1) 60%,
            rgba(147, 0, 211, 0.05) 80%,
            transparent 100%
          );
          z-index: 0;
        }

        /* Morning clouds */
        .morning-clouds {
          position: absolute;
          top: 30%;
          left: 0;
          width: 100%;
          height: 40%;
          z-index: 6;
        }

        .cloud {
          position: absolute;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50px;
          animation: cloud-drift 40s linear infinite;
        }

        .cloud::before,
        .cloud::after {
          content: '';
          position: absolute;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
        }

        .cloud-1 {
          width: 80px;
          height: 30px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .cloud-1::before {
          width: 40px;
          height: 40px;
          top: -15px;
          left: 10px;
        }

        .cloud-1::after {
          width: 30px;
          height: 30px;
          top: -10px;
          right: 10px;
        }

        .cloud-2 {
          width: 100px;
          height: 40px;
          top: 10%;
          right: 20%;
          animation-delay: 10s;
        }

        .cloud-2::before {
          width: 50px;
          height: 50px;
          top: -20px;
          left: 15px;
        }

        .cloud-2::after {
          width: 35px;
          height: 35px;
          top: -15px;
          right: 15px;
        }

        @keyframes cloud-drift {
          from { transform: translateX(-200px); }
          to { transform: translateX(calc(100vw + 200px)); }
        }
      `}</style>

      {/* Sunrise glow behind mountains */}
      <div className="sunrise-glow"></div>
      
      {/* Enhanced horizon gradient */}
      <div className="horizon-gradient"></div>
      
      {/* Sun */}
      <div className="sun"></div>
      
      {/* Sun rays */}
      <div className="sun-rays">
        <div className="sun-ray"></div>
        <div className="sun-ray"></div>
        <div className="sun-ray"></div>
        <div className="sun-ray"></div>
        <div className="sun-ray"></div>
        <div className="sun-ray"></div>
        <div className="sun-ray"></div>
        <div className="sun-ray"></div>
        <div className="sun-ray"></div>
        <div className="sun-ray"></div>
        <div className="sun-ray"></div>
        <div className="sun-ray"></div>
      </div>

      {/* Atmospheric light beams */}
      <div className="atmospheric-rays">
        <div className="light-beam"></div>
        <div className="light-beam"></div>
        <div className="light-beam"></div>
        <div className="light-beam"></div>
      </div>

      {/* Montañas andinas suaves en el fondo */}
      <div className="mountains">
        <div className="mountain mountain-1"></div>
        <div className="mountain mountain-2"></div>
        <div className="mountain mountain-3"></div>
      </div>

      {/* Stars */}
      <div className="stars">
        {stars}
      </div>

      {/* Morning clouds */}
      <div className="morning-clouds">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
      </div>

      {/* Caballito de totora con cóndor */}
      <div className="totora-rider">
        <div className="rider-container">
          <div className="condor">
            <div className="condor-body">
              <div className="condor-head">
                <div className="condor-beak"></div>
              </div>
              <div className="condor-collar"></div>
            </div>
            <div className="condor-wing-left">
              <div className="wing-feathers-left"></div>
            </div>
            <div className="condor-wing-right">
              <div className="wing-feathers-right"></div>
            </div>
            <div className="condor-tail"></div>
          </div>
          <div className="totora-boat">
            <div className="boat-prow"></div>
            <div className="boat-stern"></div>
          </div>
          <div className="mystical-propulsion"></div>
          
          {/* Propulsores espaciales con luces debajo */}
          <div className="space-thrusters">
            <div className="thruster thruster-left"></div>
            <div className="thruster thruster-center-left"></div>
            <div className="thruster thruster-center-right"></div>
            <div className="thruster thruster-right"></div>
          </div>

          {/* Partículas de escape */}
          <div className="thruster-particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>

          {/* Ondas de energía */}
          <div className="energy-waves">
            <div className="energy-wave"></div>
            <div className="energy-wave"></div>
            <div className="energy-wave"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundScene;