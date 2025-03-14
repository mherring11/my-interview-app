import React, { useState, useEffect } from 'react';
import { Play, Square, Mic, FileText, Download, Send } from 'lucide-react';

const InterviewApp = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [outputs, setOutputs] = useState([]);
  const [selectedTone, setSelectedTone] = useState("Professional");
  const [selectedTarget, setSelectedTarget] = useState("Summary");
  const [selectedFormat, setSelectedFormat] = useState("Text");
  const [selectedLength, setSelectedLength] = useState("Medium");
  const [selectedPattern, setSelectedPattern] = useState("");
  const [feedback, setFeedback] = useState("");
  const [activeTab, setActiveTab] = useState("record");
  const [processedOutput, setProcessedOutput] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // --- Sample transcript for demonstration ---
  const sampleTranscript = `Interviewer: Thank you for joining us today to discuss your experience implementing AI in healthcare...
  
Subject: Certainly. I've been working in healthcare technology for over 15 years...
  
Interviewer: What motivated your organization to adopt AI solutions?
  
Subject: We were facing challenges with patient data management and predictive analytics...
  
Interviewer: Can you describe the implementation process?
  
Subject: We started with a pilot program in our radiology department...
  
Interviewer: What results have you seen since implementation?
  
Subject: The impact has been substantial. We've seen a 34% reduction in wait times...`;

  // Simulate loading the transcript
  useEffect(() => {
    setTranscript(sampleTranscript);
  }, []);

  // --- Handlers ---
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const addOutput = () => {
    const newOutput = {
      tone: selectedTone,
      target: selectedTarget,
      format: selectedFormat,
      length: selectedLength,
      pattern: selectedPattern,
      feedback: feedback,
    };
    setOutputs([...outputs, newOutput]);
    setFeedback("");
  };

  const removeOutput = (index) => {
    const newOutputs = [...outputs];
    newOutputs.splice(index, 1);
    setOutputs(newOutputs);
  };

  const generateContent = () => {
    // In a real app, you'd send data to an API for processing.
    setProcessedOutput(`# AI in Healthcare: Transforming Patient Care
    
*This ${selectedTarget.toLowerCase()} presents key insights from an interview with the Chief Innovation Officer about their successful AI implementation.*

## Key Highlights

- 34% reduction in radiology wait times
- 28% improvement in early detection rates
- 22% increase in patient satisfaction scores

"The implementation took about six months from planning to full deployment. We focused heavily on staff training and created feedback mechanisms to continuously improve the system."

*Generated in a ${selectedTone.toLowerCase()} tone, with ${selectedLength.toLowerCase()} length and ${selectedPattern.toLowerCase()} pattern/direction as requested.*`);
    
    setShowPreview(true);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* --- Top Header --- */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Interview Transcript Processor</h1>
      </header>


      <div className="flex-1 flex justify-center overflow-hidden min-w-[1100px]">
        <div className="max-w-6xl w-full flex overflow-hidden">
          {/* --- Left Panel (1/2) --- */}
          <div className="w-2/3 flex flex-col border-r border-gray-200">
            {/* Tabs for Record / Transcript */}
            <div className="border-b border-gray-200 px-4 py-1 pb-1 flex space-x-2">
              <button
                className={`
                  px-4 py-2 bg-gray-50 text-gray-700 
                  appearance-none border-0
                  focus:outline-none transition-colors
                  hover:text-blue-700 hover:underline
                  ${activeTab === 'record' ? 'font-semibold' : ''}
                `}
                onClick={() => setActiveTab('record')}
              >
                Record
              </button>

              <button
                className={`
                  px-4 py-2 bg-gray-50 text-gray-700
                  appearance-none border-0
                  focus:outline-none transition-colors
                  hover:text-blue-700 hover:underline
                  ${activeTab === 'transcript' ? 'font-semibold' : ''}
                `}
                onClick={() => setActiveTab('transcript')}
              >
                Transcript
              </button>
            </div>

            {/* Left Panel Content */}
            <div className="flex-1 overflow-auto p-28">
              {activeTab === 'record' ? (
                // --- Record Tab ---
                <div className="flex flex-col items-center justify-center h-full">
                  <div
                    className={`w-32 h-32 rounded-full flex items-center justify-center mb-4 ${
                      isRecording ? 'bg-red-100 animate-pulse' : 'bg-gray-100'
                    }`}
                  >
                    <Mic
                      size={48}
                      className={isRecording ? 'text-red-500' : 'text-gray-500'}
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      className={`p-2 rounded-full ${
                        isRecording ? 'bg-red-100' : 'bg-blue-100'
                      }`}
                      onClick={toggleRecording}
                    >
                      {isRecording ? (
                        <Square size={24} className="text-red-500" />
                      ) : (
                        <Play size={24} className="text-blue-500" />
                      )}
                    </button>
                  </div>
                  {/* Added whitespace-nowrap here to force one line */}
                  <p className="mt-4 text-gray-600 whitespace-nowrap">
                    {isRecording ? 'Recording in progress...' : 'Click to start recording'}
                  </p>
                </div>
              ) : (
                // --- Transcript Tab ---
                <div className="h-full flex flex-col">
                  <div className="flex justify-between mb-2">
                    <h2 className="text-lg font-medium">Interview Transcript</h2>
                    <div>
                    <button
                      className={`
                        px-4 py-2 bg-gray-50 text-gray-700
                        appearance-none border-0
                        focus:outline-none transition-colors
                        hover:text-blue-700 hover:underline
                      `}
                    >
                      <Download size={16} className="inline mr-1" />
                      Export
                    </button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto bg-white border border-gray-200 rounded p-4">
                    <pre className="whitespace-pre-wrap">{transcript}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* --- Right Panel (1/2) --- */}
          <div className="w-2/3 flex flex-col">
            {showPreview ? (
              <>
                {/* --- Preview Panel --- */}
                <div className="flex-1 flex flex-col p-4 overflow-hidden">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-medium">Preview: {selectedTarget}</h2>
                    <button
                      className={`
                        px-4 py-2 bg-gray-50 text-gray-700
                        appearance-none border-0
                        focus:outline-none transition-colors
                        hover:text-blue-700 hover:underline
                      `}
                      onClick={() => setShowPreview(false)}
                    >
                      Back to Settings
                    </button>
                  </div>
                  <div className="flex-1 overflow-auto bg-white border border-gray-200 rounded p-4">
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap">{processedOutput}</pre>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-50">
                      <Download size={16} className="inline mr-1" />
                      Download
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      <Send size={16} className="inline mr-1" />
                      Share
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* --- Output Settings Panel --- */}
                <div className="flex-1 flex flex-col p-4 overflow-hidden">
                  <h2 className="text-lg font-medium mb-4">Output Settings</h2>

                  <div className="flex-1 overflow-auto">
                    {/* New Output Form */}
                    <div className="bg-white border border-gray-200 rounded p-4 mb-4">
                      <h3 className="font-medium mb-2">New Output</h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Tone */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tone
                          </label>
                          <select
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={selectedTone}
                            onChange={(e) => setSelectedTone(e.target.value)}
                          >
                            <option>Friendly</option>
                            <option>Professional</option>
                            <option>Educational</option>
                            <option>Persuasive</option>
                          </select>
                        </div>
                        {/* Target */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Target
                          </label>
                          <select
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={selectedTarget}
                            onChange={(e) => setSelectedTarget(e.target.value)}
                          >
                            <option>Social Post</option>
                            <option>Summary</option>
                            <option>Brief Article</option>
                            <option>Story Proposal</option>
                            <option>White Paper</option>
                            <option>Podcast</option>
                          </select>
                        </div>
                        {/* Output Format */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Output Format
                          </label>
                          <select
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={selectedFormat}
                            onChange={(e) => setSelectedFormat(e.target.value)}
                          >
                            <option>Text</option>
                            <option>HTML</option>
                            <option>Markup</option>
                            <option>Audio</option>
                          </select>
                        </div>
                        {/* Length */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Length
                          </label>
                          <select
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={selectedLength}
                            onChange={(e) => setSelectedLength(e.target.value)}
                          >
                            <option>Short</option>
                            <option>Medium</option>
                            <option>Long</option>
                          </select>
                        </div>
                      </div>
                      {/* Pattern/Direction (Optional) */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Target Pattern/Direction (Optional)
                          </label>
                          <input
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            placeholder="e.g., Problem-Solution, Hero's Journey, Case Study"
                            value={selectedPattern}
                            onChange={(e) => setSelectedPattern(e.target.value)}
                          />
                        </div>

                      {/* Feedback */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Feedback
                        </label>
                        <textarea
                          className="w-full border border-gray-300 rounded px-3 py-2 h-24"
                          placeholder="Provide additional instructions or guidance..."
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          onClick={addOutput}
                        >
                          Add to Queue
                        </button>
                      </div>
                    </div>
                    {/* Output Queue */}
                    <div className="bg-white border border-gray-200 rounded p-4 mb-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">
                          Output Queue ({outputs.length})
                        </h3>
                        {outputs.length > 0 && (
                          <button
                          className={`
                            px-4 py-2 bg-gray-50 text-gray-700
                            appearance-none border-0
                            focus:outline-none transition-colors
                            hover:text-blue-700 hover:underline
                          `}
                          onClick={generateContent}
                        >
                          Generate Content
                        </button>
                        )}
                      </div>
                      {outputs.length === 0 ? (
                        <p className="text-gray-500 text-sm italic">
                          No outputs queued yet
                        </p>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-auto">
                          {outputs.map((output, index) => (
                            <div
                              key={index}
                              className="flex justify-between bg-gray-50 p-2 rounded"
                            >
                              <div>
                                <span className="text-sm font-medium">
                                  {output.target}
                                </span>
                                <span className="text-xs text-gray-500 ml-2">
                                  {output.tone} · {output.format} · {output.length} · {output.pattern}
                                </span>
                              </div>
                              <button
                                className={`
                                  px-4 py-2 bg-gray-50 text-gray-700
                                  appearance-none border-0
                                  focus:outline-none transition-colors
                                  hover:text-blue-700 hover:underline
                                `}
                                onClick={() => removeOutput(index)}
                              >
                                ×
                              </button>

                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Generate Content Button */}
                    <div className="flex justify-center">
                      <button
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={outputs.length === 0}
                        onClick={generateContent}
                      >
                        <FileText size={20} className="inline mr-2" />
                        Generate Content
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewApp;
