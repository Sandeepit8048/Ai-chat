import React, { useState } from 'react';
import './DownloadButton.css';

const DownloadButton = ({ audioFile, originalName }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleDownload = () => {
    if (!audioFile) return;
    
    setIsDownloading(true);
    setIsComplete(false);
    setDownloadProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setIsComplete(true);
          setTimeout(() => setIsComplete(false), 3000);
          
          // Actual download
          const url = URL.createObjectURL(audioFile);
          const a = document.createElement('a');
          a.href = url;
          a.download = originalName 
            ? `${originalName.replace(/\.[^/.]+$/, '')}_hindi.mp3`
            : 'hindi_audio.mp3';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  return (
    <div className="download-container">
      <button 
        className={`download-button ${isComplete ? 'complete' : ''}`}
        onClick={handleDownload}
        disabled={isDownloading}
      >
        {isComplete ? '✓ Downloaded!' : 'Download Hindi Audio'}
      </button>
      
      {isDownloading && (
        <div className="download-progress">
          <div 
            className="progress-bar" 
            style={{ width: `${downloadProgress}%` }}
          ></div>
        </div>
      )}
      
      {isComplete && (
        <p className="download-complete">File saved successfully!</p>
      )}
    </div>
  );
};

export default DownloadButton;