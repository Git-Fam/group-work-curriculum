import React, { useEffect, useRef } from 'react';
import '../assets/styles/RandomTextAnimation.css';

const RandomTextAnimation = () => {
  const containerRef = useRef(null);
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZあいうえお'; // 表示する文字

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createCharacter = () => {
      const char = document.createElement('div');
      char.classList.add('character');
      char.textContent =
        characters[Math.floor(Math.random() * characters.length)];
      // Math.random()で0以上1未満の数字を返し、characters.length(表示することができる、文字の数)とかける。Math.floorで整数で返す。

      const startX = Math.random() * 100;
      const startSize = Math.random() * 50 + 10;
      const initialRotation = Math.random() * 360;
      const riseDuration = Math.random() * 5000;
      const fallDuration = Math.random() * 6000;
      const delayBeforefall = 400;

      char.style.left = `${startX}vw`;
      char.style.fontSize = `${startSize}px`;
      char.style.transform = `rotate(${initialRotation}deg)`;
      char.style.top = `100%`;
      char.style.opacity = '1';

      container.appendChild(char);

      void char.offsetHeight;

      char.style.transition = `top ${riseDuration}ms linear, opacity ${riseDuration}ms linear, 
      transform ${riseDuration}ms linear`;

      requestAnimationFrame(() => {
        char.style.top = `-20vh`;
        char.style.transform = `rotate(${
          initialRotation + (Math.random() * 720 + 360)
        }deg)`;
      });

      const riseTimer = setTimeout(() => {
        if (!char || !char.parentNode) return;

        char.style.transition = `top ${fallDuration}ms linear, transform ${fallDuration}ms ease-in-out, opacity ${
          fallDuration * 0.7
        }ms ease-out`;

        requestAnimationFrame(() => {
          char.style.top = `110vh`;
          char.style.transform = `rotate(${
            parseFloat(char.style.transform.match(/-?\d+\.?\d*/)?.[0] || '0') +
            Math.random() * 720 +
            360
          }deg)`;
          char.style.opacity = '0';
        });

        const fallTimer = setTimeout(() => {
          if (char && char.parentNode) {
            char.remove();
          }
        }, fallDuration);

        char.fallTimer = fallTimer;
      }, riseDuration + delayBeforefall);

      char.riseTimer = riseTimer;

      const removeFallbackTimer = setTimeout(() => {
        if (char && char.parentNode) {
          char.remove();
        }
      }, riseDuration + delayBeforefall + fallDuration + 2000);

      char.removeFallbackTimer = removeFallbackTimer;
    };

    const intervalId = setInterval(createCharacter, 100);

    return () => {
      clearInterval(intervalId);
      if (container) {
        Array.from(container.children).forEach((child) => {
          const charElement = child;
          if (charElement.riseTimer) {
            clearTimeout(charElement.riseTimer);
          }
          if (charElement.fallTimer) {
            clearTimeout(charElement.fallTimer);
          }
          if (charElement.removeFallbackTimer) {
            clearTimeout(charElement.removeFallbackTimer);
          }
          charElement.remove();
        });
      }
    };
  }, []);

  return <div className="animation-container" ref={containerRef}></div>;
};

export default RandomTextAnimation;
