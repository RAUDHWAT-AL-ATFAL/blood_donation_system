import React, { useState, useEffect } from 'react';
import './BloodlinkSplash.css';

const BloodlinkSplash = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Inaandaa Mfumo...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 300); // Muda mdogo kabla ya kufunga Splash
          return 100;
        }

        const nextProgress = prevProgress + 2;

        // Kubadilisha ujumbe wa mfumo kulingana na asilimia
        if (nextProgress === 30) {
          setStatusText('Inahakiki Mfumo wa AES-256...');
        } else if (nextProgress === 65) {
          setStatusText('Inaunganisha na Benki ya Damu...');
        } else if (nextProgress === 90) {
          setStatusText('Kila Doti. Kila Maisha. Tayari!');
        }

        return nextProgress;
      });
    }, 40); // Jumla ya muda = ~2.5 hadi 3 Sekunde

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="splash-overlay">
      <div className="splash-content">
        <p className="splash-tagline">🩸 MFUMO WA KIMATAIFA WA KUOKOA MAISHA</p>
        
        <div className="progress-container">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="splash-status">
          <span>{statusText}</span>
          <span className="gold-text">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default BloodlinkSplash;
