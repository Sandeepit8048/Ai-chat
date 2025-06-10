import React, { useEffect, useRef } from 'react';
import './Waveform.css';

const Waveform = ({ color1 = '#00b4db', color2 = '#0083b0', animate = false, direction = 'left', intensity = 1 }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    let animationId;
    let time = 0;
    
    const drawWave = () => {
      ctx.clearRect(0, 0, width, height);
      
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      ctx.fillStyle = gradient;
      
      const segments = 50;
      const segmentWidth = width / segments;
      const centerY = height / 2;
      const maxAmplitude = height * 0.4 * intensity;
      
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      
      for (let i = 0; i <= segments; i++) {
        const x = i * segmentWidth;
        const offset = direction === 'right' ? time : -time;
        const y = centerY + Math.sin((i * 0.2) + offset) * maxAmplitude;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
      
      if (animate) {
        time += 0.08;
        animationId = requestAnimationFrame(drawWave);
      }
    };
    
    drawWave();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [color1, color2, animate, direction, intensity]);

  return (
    <canvas 
      ref={canvasRef} 
      className="waveform-canvas"
    />
  );
};

export default Waveform;