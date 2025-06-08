import React from 'react';
import FileUpload from '../components/FileUpload';
import ProcessingAnimation from '../components/ProcessingAnimation';
import ConversionAnimation from '../components/ConversionAnimation';
import AudioPlayer from '../components/AudioPlayer';
// import './HomePage.css';
// import './app.css'; // Assuming styles are in app.css

const HomePage = ({ 
  workflowStep, 
  setWorkflowStep, 
  audioFile, 
  setAudioFile,
  processedAudio,
  setProcessedAudio
}) => {
  return (
    <div className="workflow-container">
      {/* Left Section - File Upload */}
      <div className={`workflow-section ${workflowStep >= 1 ? 'active' : ''}`}>
        {workflowStep === 1 && (
          <FileUpload 
            setWorkflowStep={setWorkflowStep} 
            setAudioFile={setAudioFile}
          />
        )}
      </div>

      {/* Center Left - Processing Animation */}
      <div className={`workflow-section ${workflowStep >= 2 ? 'active' : ''}`}>
        {workflowStep === 2 && (
          <ProcessingAnimation 
            setWorkflowStep={setWorkflowStep} 
            audioFile={audioFile}
          />
        )}
      </div>

      {/* Center - AI Conversion */}
      <div className={`workflow-section ${workflowStep >= 3 ? 'active' : ''}`}>
        {workflowStep === 3 && (
          <div className="conversion-section">
            <h2>AI Voice Conversion</h2>
            <button 
              className="convert-button"
              onClick={() => setWorkflowStep(4)}
            >
              Convert to Hindi
            </button>
          </div>
        )}
      </div>

      {/* Center Right - Conversion Animation */}
      <div className={`workflow-section ${workflowStep >= 4 ? 'active' : ''}`}>
        {workflowStep === 4 && (
          <ConversionAnimation 
            setWorkflowStep={setWorkflowStep}
            setProcessedAudio={setProcessedAudio}
            audioFile={audioFile}
          />
        )}
      </div>

      {/* Right Section - Playback & Download */}
      <div className={`workflow-section ${workflowStep >= 5 ? 'active' : ''}`}>
        {workflowStep === 5 && (
          <AudioPlayer 
            audioFile={processedAudio}
            originalName={audioFile?.name}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;