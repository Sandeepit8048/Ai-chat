import React, { useEffect, useState } from 'react';
import Waveform from './Waveform';
import './ConversionAnimation.css';

const ConversionAnimation = ({ setWorkflowStep, setProcessedAudio, audioFile }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Preparing conversion...');
  
  useEffect(() => {
    // Simulate conversion process
    const steps = [
      { progress: 20, status: 'Extracting text...' },
      { progress: 40, status: 'Translating to Hindi...' },
      { progress: 60, status: 'Generating voice...' },
      { progress: 80, status: 'Finalizing audio...' },
      { progress: 100, status: 'Conversion complete!' }
    ];
    
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress);
        setStatus(steps[currentStep].status);
        currentStep++;
      } else {
        clearInterval(interval);
        
        // Simulate getting processed audio (in a real app, this would be from an API)
        const processedBlob = new Blob([audioFile], { type: audioFile.type });
        const processedFile = new File([processedBlob], `${audioFile.name.replace(/\.[^/.]+$/, '')}_hindi.mp3`, {
          type: audioFile.type
        });
        
        setProcessedAudio(processedFile);
        setTimeout(() => setWorkflowStep(5), 1000); // Move to next step
      }
    }, 1500);
    
    return () => clearInterval(interval);
  }, [setWorkflowStep, setProcessedAudio, audioFile]);

  return (
    <div className="conversion-animation">
      <h2>Converting to Hindi...</h2>
      
      <div className="wave-container">
        <Waveform 
          color1="#ff7e5f" 
          color2="#feb47b" 
          animate={true} 
          direction="right"
          intensity={progress / 100}
        />
        
        {/* Particle effects */}
        <div className="particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="particle" 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.5 + 0.5
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="status-text">{status}</p>
      <p className="progress-text">{progress}%</p>
    </div>
  );
};

export default ConversionAnimation;