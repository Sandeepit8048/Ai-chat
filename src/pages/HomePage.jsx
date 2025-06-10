import React from 'react';
import FileUpload from '../components/FileUpload';
import ProcessingAnimation from '../components/ProcessingAnimation';
import ConversionAnimation from '../components/ConversionAnimation';
import AudioPlayer from '../components/AudioPlayer';


const HomePage = ({
  workflowStep,
  setWorkflowStep,
  audioFile,
  setAudioFile,
  processedAudio,
  setProcessedAudio
}) => {
  return (
    <div className=" min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 md:px-6 py-4">
     <div>
      <h1 className="text-3xl font-bold mb-4 text-red-600">AI Voice Conversion</h1>
     </div>
      <div className="w-full max-w-6xl flex flex-col  lg:flex-row justify-between items-center gap-8">

        <div className="flex flex-col items-center space-y-3 w-full lg:w-1/3">
          {workflowStep === 1 ? (
            <FileUpload setWorkflowStep={setWorkflowStep} setAudioFile={setAudioFile} />
          ) : (
            <>
              <div className="w-40 h-40 border-2 border-dashed rounded-lg flex items-center justify-center">
                <p className="text-center">Drop 'n' Down</p>
              </div>
              <p className="text-sm text-gray-400 text-center max-w-[10rem]">
                Upload your audio and let our AI transcribe it for you
              </p>
              <a href="#" className="text-xs text-purple-400 hover:underline">
                Learn more
              </a>
            </>
          )}
        </div>

        <div className="text-center w-full lg:w-1/3 space-y-4">
          <p className="text-lg font-medium">How can I help you?</p>
          <button className="bg-purple-600 text-white rounded-full px-3 py-1 text-sm">
            OrderMozarella
          </button> 
          <div className="flex flex-wrap gap-2 justify-center">
            <button className="bg-purple-600 text-white rounded-full px-3 py-1 text-sm">
              #MakeTeamCall
            </button>

            {workflowStep === 2 && (
              <ProcessingAnimation setWorkflowStep={setWorkflowStep} audioFile={audioFile} />
            )}

            {workflowStep === 3 && (
              <div className="conversion-section space-y-2">
                <h2 className="text-xl font-semibold">AI Voice Conversion</h2>
                <button
                  className="bg-purple-700 px-4 py-2 rounded-full"
                  onClick={() => setWorkflowStep(4)}
                >
                  Convert to Hindi
                </button>
              </div>
            )}

            {workflowStep === 4 && (
              <ConversionAnimation
                setWorkflowStep={setWorkflowStep}
                setProcessedAudio={setProcessedAudio}
                audioFile={audioFile}
              />
            )}

            {workflowStep < 2 && (
              <button
                className="bg-purple-700 p-4 rounded-full"
                onClick={() => setWorkflowStep(2)}
              >
                Mic🎤
              </button>
            )}

            <button className="bg-purple-600 text-white rounded-full px-3 py-1 text-sm">
              OrderCoffee
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-300">
            <span>🎛 Automation</span>
            <span>🎧 Sound Devices</span>
            <span>🔊 Volume</span>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4 w-full lg:w-1/3">
          {workflowStep === 5 ? (
            <AudioPlayer audioFile={processedAudio} originalName={audioFile?.name} />
          ) : (
            <>
              <button className="bg-gray-800 p-2 rounded-lg">Download⬇️</button>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full" />
                <span className="text-sm">Microphone</span>
                <span className="bg-gray-700 text-xs px-1 rounded">LHI</span>
              </div>
              <div className="w-1 h-24 bg-green-400 rounded-full" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
