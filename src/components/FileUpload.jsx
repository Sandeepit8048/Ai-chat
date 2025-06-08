import React, { useCallback, useState } from 'react';
import Waveform from './Waveform';
// import './FileUpload.css';

const acceptedFormats = ['.mp3', '.wav', '.m4a', '.aac'];
const maxFileSize = 50 * 1024 * 1024; // 50MB

const FileUpload = ({ setWorkflowStep, setAudioFile }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setError(null);
    
    // Check file type
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!acceptedFormats.includes(fileExtension)) {
      setError(`Unsupported file format. Please upload one of: ${acceptedFormats.join(', ')}`);
      return;
    }
    
    // Check file size
    if (file.size > maxFileSize) {
      setError(`File too large. Maximum size is ${maxFileSize / (1024 * 1024)}MB`);
      return;
    }
    
    // File is valid
    setAudioFile(file);
    setWorkflowStep(2); // Move to next step
  };

  return (
    <div className="file-upload-container">
      <h2>Upload Audio File</h2>
      
      <div 
        className={`dropzone ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="dropzone-content">
          <Waveform color1="#00b4db" color2="#0083b0" />
          <p>Drag & drop your audio file here</p>
          <p className="small">or</p>
          <label className="file-input-label">
            <input 
              type="file" 
              accept={acceptedFormats.join(',')} 
              onChange={handleChange}
              className="file-input"
            />
            Select File
          </label>
        </div>
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      <div className="file-requirements">
        <p>Supported formats: {acceptedFormats.join(', ')}</p>
        <p>Max size: {maxFileSize / (1024 * 1024)}MB</p>
      </div>
    </div>
  );
};

export default FileUpload;