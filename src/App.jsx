import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  const [workflowStep, setWorkflowStep] = useState(1); // 1-5 for each step
  const [audioFile, setAudioFile] = useState(null);
  const [processedAudio, setProcessedAudio] = useState(null);

  return (
    <div className="app">
      <HomePage 
        workflowStep={workflowStep}
        setWorkflowStep={setWorkflowStep}
        audioFile={audioFile}
        setAudioFile={setAudioFile}
        processedAudio={processedAudio}
        setProcessedAudio={setProcessedAudio}
      />
    </div>
  );
}

export default App;