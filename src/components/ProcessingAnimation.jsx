import React, { useEffect, useState } from 'react';
import Waveform from './Waveform';
import './ProcessingAnimation.css';

const ProcessingAnimation = ({ setWorkflowStep, audioFile }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setWorkflowStep(3), 500); // Move to next step
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, [setWorkflowStep]);

  return (
    <div className="processing-animation">
      <h2>Uploading your file...</h2>
      
      <div className="wave-container">
        <Waveform 
          color1="#00b4db" 
          color2="#0083b0" 
          animate={true} 
          direction="right"
        />
      </div>
      
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="progress-text">{progress}%</p>
      
      <div className="file-info">
        <p>File: {audioFile?.name}</p>
        <p>Size: {(audioFile?.size / (1024 * 1024)).toFixed(2)} MB</p>
      </div>
    </div>
  );
};

export default ProcessingAnimation;