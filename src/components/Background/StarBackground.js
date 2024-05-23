// src/StarBackground.js

import React, { useEffect, useRef } from 'react';
import './StarBackground.css';

const StarBackground = () => {
  const starsRef = useRef();

  useEffect(() => {
    const starsContainer = starsRef.current;

    const createStar = (sizeClass, duration) => {
      const star = document.createElement('div');
      star.className = `star ${sizeClass}`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `-${Math.random() * duration}s`;
      starsContainer.appendChild(star);
    };

    const createStars = (count, sizeClass, duration) => {
      for (let i = 0; i < count; i++) {
        createStar(sizeClass, duration);
      }
    };

    createStars(2100, 'small-star', 50);
    createStars(500, 'medium-star', 100);
    createStars(100, 'big-star', 150);
  }, []);

  return (
    <div id="star-container" className="star-container" ref={starsRef}>
      <div id="title" className="title mt-[200px]">
        <span>
          Proteus Nebule
          <br />
          Battle Card Game
        </span>
      </div>
    </div>
  );
};

export default StarBackground;
