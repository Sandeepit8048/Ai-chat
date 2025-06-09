import React, { useState, useCallback, useRef, useEffect } from 'react';
import './FileUpload.css';

const acceptedFormats = ['.mp3', '.wav', '.m4a', '.aac'];
const maxFileSize = 50 * 1024 * 1024;

const FileUpload = ({ setWorkflowStep = () => {}, setAudioFile = () => {} }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const [localAudioFile, setLocalAudioFile] = useState(null);
  const [audioURL, setAudioURL] = useState(null);

  // Cleanup the object URL on file change/unmount
  useEffect(() => {
    if (localAudioFile) {
      const url = URL.createObjectURL(localAudioFile);
      setAudioURL(url);

      return () => {
        URL.revokeObjectURL(url);
        setAudioURL(null);
      };
    }
  }, [localAudioFile]);

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
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    if (!acceptedFormats.includes(fileExtension)) {
      setError(`Unsupported file format. Please upload: ${acceptedFormats.join(', ')}`);
      return;
    }

    if (file.size > maxFileSize) {
      setError(`File too large. Max size is ${maxFileSize / (1024 * 1024)}MB`);
      return;
    }

    setAudioFile(file);
    setLocalAudioFile(file);
    setWorkflowStep(2);
  };

  // Waveform canvas code same as before (omitted here for brevity)
  const Waveform = ({ color1 = '#00b4db', color2 = '#0083b0', animate = true, direction = 'left', intensity = 1 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = canvas.width = canvas.offsetWidth;
      const height = canvas.height = canvas.offsetHeight;
      let animationId, time = 0;

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
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();

        if (animate) {
          time += 0.05;
          animationId = requestAnimationFrame(drawWave);
        }
      };

      drawWave();
      return () => cancelAnimationFrame(animationId);
    }, [color1, color2, animate, direction, intensity]);

    return <canvas ref={canvasRef} className="waveform-canvas" />;
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
          <Waveform />
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

      {audioURL && (
        <div className="audio-preview">
          <p><strong>Preview:</strong> {localAudioFile.name}</p>
          <audio controls src={audioURL} />
        </div>
      )}

      <div className="file-requirements">
        <p>Supported formats: {acceptedFormats.join(', ')}</p>
        <p>Max size: {maxFileSize / (1024 * 1024)}MB</p>
      </div>
    </div>
  );
};

export default FileUpload;
