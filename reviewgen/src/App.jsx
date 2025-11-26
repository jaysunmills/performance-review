import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { parseFile, parseFiles } from './utils/fileParser';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

// Competency definitions
const UNIVERSAL_CRITERIA = [
  { id: 'craft', name: 'Craft/Quality', description: 'Excellence in core role responsibilities' },
  { id: 'speed', name: 'Speed', description: 'Reasonable execution pace + proactive unblocking' },
  { id: 'adaptiveness', name: 'Adaptiveness', description: 'Willingness to change and flexibility' }
];

const ROLE_SPECIFIC_COMPETENCIES = [
  { id: 'code_quality', name: 'Code Quality', description: 'Clean, maintainable, well-tested code' },
  { id: 'system_design', name: 'System Design', description: 'Architectural thinking and scalability' },
  { id: 'mentoring', name: 'Mentoring', description: 'Helping others grow and learn' }
];

const RATING_LABELS = {
  1: { label: 'Unacceptable', color: 'text-red-600' },
  2: { label: 'Below Expectations', color: 'text-orange-600' },
  3: { label: 'Needs Improvement', color: 'text-yellow-600' },
  4: { label: 'Meets Expectations', color: 'text-green-600' }
};

function App() {
  // File state
  const [peerFiles, setPeerFiles] = useState([]);
  const [selfFile, setSelfFile] = useState(null);
  const [managerFile, setManagerFile] = useState(null);

  // Competency ratings state
  const [ratings, setRatings] = useState(() => {
    const initial = {};
    [...UNIVERSAL_CRITERIA, ...ROLE_SPECIFIC_COMPETENCIES].forEach(comp => {
      initial[comp.id] = { rating: 4, notes: '' };
    });
    return initial;
  });

  // Other state
  const [preserveVerbatim, setPreserveVerbatim] = useState(false);
  const [apiProvider, setApiProvider] = useState('openai'); // 'openai' or 'anthropic'
  const [apiKey, setApiKey] = useState('');
  const [generatedReview, setGeneratedReview] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  // Dropzone for peer feedback (multiple files)
  const onDropPeer = useCallback(async (acceptedFiles) => {
    try {
      const parsed = await parseFiles(acceptedFiles);
      setPeerFiles(prev => [...prev, ...parsed]);
      setError('');
    } catch (err) {
      setError(`Error parsing peer feedback: ${err.message}`);
    }
  }, []);

  const { getRootProps: getPeerRootProps, getInputProps: getPeerInputProps, isDragActive: isPeerDragActive } = useDropzone({
    onDrop: onDropPeer,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  // Dropzone for self review (single file)
  const onDropSelf = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    try {
      const parsed = await parseFile(acceptedFiles[0]);
      setSelfFile(parsed);
      setError('');
    } catch (err) {
      setError(`Error parsing self review: ${err.message}`);
    }
  }, []);

  const { getRootProps: getSelfRootProps, getInputProps: getSelfInputProps, isDragActive: isSelfDragActive } = useDropzone({
    onDrop: onDropSelf,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false
  });

  // Dropzone for manager review (single file)
  const onDropManager = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    try {
      const parsed = await parseFile(acceptedFiles[0]);
      setManagerFile(parsed);
      setError('');
    } catch (err) {
      setError(`Error parsing manager review: ${err.message}`);
    }
  }, []);

  const { getRootProps: getManagerRootProps, getInputProps: getManagerInputProps, isDragActive: isManagerDragActive } = useDropzone({
    onDrop: onDropManager,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false
  });

  // Handle rating change
  const handleRatingChange = (competencyId, rating) => {
    setRatings(prev => ({
      ...prev,
      [competencyId]: { ...prev[competencyId], rating: parseInt(rating) }
    }));
  };

  // Handle notes change
  const handleNotesChange = (competencyId, notes) => {
    setRatings(prev => ({
      ...prev,
      [competencyId]: { ...prev[competencyId], notes }
    }));
  };

  // Remove file handlers
  const removePeerFile = (index) => {
    setPeerFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeSelfFile = () => setSelfFile(null);
  const removeManagerFile = () => setManagerFile(null);

  // Build the prompt for AI
  const buildPrompt = () => {
    let prompt = `You are a performance review assistant. Generate a comprehensive, professional performance review based on the following inputs:\n\n`;

    // Add peer feedback
    if (peerFiles.length > 0) {
      prompt += `## 360 Peer Feedback\n\n`;
      peerFiles.forEach((file, idx) => {
        prompt += `### Peer Feedback ${idx + 1} (${file.filename})\n${file.content}\n\n`;
      });
    }

    // Add self review
    if (selfFile) {
      prompt += `## Employee Self-Review\n${selfFile.content}\n\n`;
    }

    // Add manager review or ratings
    if (managerFile && preserveVerbatim) {
      prompt += `## Manager Review (Preserve Verbatim)\n`;
      prompt += `The following manager notes should be included EXACTLY as written:\n${managerFile.content}\n\n`;
    } else if (managerFile && !preserveVerbatim) {
      prompt += `## Manager Notes\n${managerFile.content}\n\n`;
    }

    // Add competency ratings
    prompt += `## Competency Ratings\n\n`;
    prompt += `### Universal Criteria\n`;
    UNIVERSAL_CRITERIA.forEach(comp => {
      const { rating, notes } = ratings[comp.id];
      prompt += `- **${comp.name}**: ${rating}/4 (${RATING_LABELS[rating].label})`;
      if (notes) prompt += `\n  Manager notes: ${notes}`;
      prompt += `\n`;
    });

    prompt += `\n### Role-Specific Competencies\n`;
    ROLE_SPECIFIC_COMPETENCIES.forEach(comp => {
      const { rating, notes } = ratings[comp.id];
      prompt += `- **${comp.name}**: ${rating}/4 (${RATING_LABELS[rating].label})`;
      if (notes) prompt += `\n  Manager notes: ${notes}`;
      prompt += `\n`;
    });

    // Add instructions
    prompt += `\n## Instructions\n`;
    if (preserveVerbatim && managerFile) {
      prompt += `- Include the manager review notes EXACTLY as provided (verbatim)\n`;
    }
    prompt += `- Synthesize all feedback into a coherent, professional review\n`;
    prompt += `- Organize by: Summary, Strengths, Areas for Development, Development Plan\n`;
    prompt += `- Be specific and actionable\n`;
    prompt += `- Maintain a constructive, growth-oriented tone\n`;
    prompt += `- Ensure ratings are reflected in the narrative\n`;

    return prompt;
  };

  // Generate review with OpenAI
  const generateWithOpenAI = async (prompt) => {
    const client = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });

    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert HR professional who writes clear, constructive performance reviews.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    return response.choices[0].message.content;
  };

  // Generate review with Anthropic
  const generateWithAnthropic = async (prompt) => {
    const client = new Anthropic({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    return response.content[0].text;
  };

  // Handle generate review
  const handleGenerateReview = async () => {
    if (!apiKey) {
      setError('Please enter your API key');
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedReview('');

    try {
      const prompt = buildPrompt();

      let review;
      if (apiProvider === 'openai') {
        review = await generateWithOpenAI(prompt);
      } else {
        review = await generateWithAnthropic(prompt);
      }

      setGeneratedReview(review);
    } catch (err) {
      setError(`Error generating review: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ReviewGen</h1>
          <p className="text-lg text-gray-600">AI-Powered Performance Review Generator</p>
          <p className="text-sm text-gray-500 mt-1">Local-first • Privacy-focused • No data leaves your browser</p>
        </div>

        {/* API Configuration */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">AI Provider</label>
              <select
                value={apiProvider}
                onChange={(e) => setApiProvider(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="openai">OpenAI (GPT-4o)</option>
                <option value="anthropic">Anthropic (Claude 3.5 Sonnet)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Stored locally in your browser only</p>
            </div>
          </div>
        </div>

        {/* File Uploads - All three dropboxes in a row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* 360 Peer Feedback */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">360 Peer Feedback</h2>
            <div
              {...getPeerRootProps()}
              className={`drop-zone ${isPeerDragActive ? 'active' : ''}`}
            >
              <input {...getPeerInputProps()} />
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm text-gray-600">Drag & drop peer feedback files</p>
              <p className="text-xs text-gray-500 mt-1">Supports: .pdf, .docx, .txt (multiple files)</p>
            </div>
            {peerFiles.length > 0 && (
              <div className="file-list">
                <p className="text-sm font-medium text-gray-700 mb-2">{peerFiles.length} file(s) uploaded:</p>
                {peerFiles.map((file, idx) => (
                  <div key={idx} className="file-item">
                    <span className="text-sm text-gray-700">{file.filename}</span>
                    <button
                      onClick={() => removePeerFile(idx)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Self Review */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Self Review</h2>
            <div
              {...getSelfRootProps()}
              className={`drop-zone ${isSelfDragActive ? 'active' : ''}`}
            >
              <input {...getSelfInputProps()} />
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm text-gray-600">Drag & drop self-assessment</p>
              <p className="text-xs text-gray-500 mt-1">Supports: .pdf, .docx, .txt (single file)</p>
            </div>
            {selfFile && (
              <div className="file-list">
                <div className="file-item">
                  <span className="text-sm text-gray-700">{selfFile.filename}</span>
                  <button
                    onClick={removeSelfFile}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Manager Review */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Manager Review</h2>
            <div
              {...getManagerRootProps()}
              className={`drop-zone ${isManagerDragActive ? 'active' : ''}`}
            >
              <input {...getManagerInputProps()} />
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm text-gray-600">Drag & drop manager notes</p>
              <p className="text-xs text-gray-500 mt-1">Supports: .pdf, .docx, .txt (single file)</p>
            </div>
            {managerFile && (
              <div className="file-list">
                <div className="file-item">
                  <span className="text-sm text-gray-700">{managerFile.filename}</span>
                  <button
                    onClick={removeManagerFile}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preserveVerbatim}
                      onChange={(e) => setPreserveVerbatim(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">Preserve notes verbatim</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Competency Ratings - Separate section below */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Competency Ratings</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Universal Criteria */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Universal Criteria</h3>
              {UNIVERSAL_CRITERIA.map(comp => (
                <div key={comp.id} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">{comp.name}</label>
                    <span className={`text-sm font-bold ${RATING_LABELS[ratings[comp.id].rating].color}`}>
                      {ratings[comp.id].rating} - {RATING_LABELS[ratings[comp.id].rating].label}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={ratings[comp.id].rating}
                    onChange={(e) => handleRatingChange(comp.id, e.target.value)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                  </div>
                  <details className="mt-2">
                    <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">+ Add notes (optional)</summary>
                    <textarea
                      value={ratings[comp.id].notes}
                      onChange={(e) => handleNotesChange(comp.id, e.target.value)}
                      className="w-full mt-2 p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
                      rows="2"
                      placeholder="Optional notes..."
                    />
                  </details>
                </div>
              ))}
            </div>

            {/* Role-Specific Competencies */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Role-Specific Competencies</h3>
              {ROLE_SPECIFIC_COMPETENCIES.map(comp => (
                <div key={comp.id} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">{comp.name}</label>
                    <span className={`text-sm font-bold ${RATING_LABELS[ratings[comp.id].rating].color}`}>
                      {ratings[comp.id].rating} - {RATING_LABELS[ratings[comp.id].rating].label}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={ratings[comp.id].rating}
                    onChange={(e) => handleRatingChange(comp.id, e.target.value)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                  </div>
                  <details className="mt-2">
                    <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">+ Add notes (optional)</summary>
                    <textarea
                      value={ratings[comp.id].notes}
                      onChange={(e) => handleNotesChange(comp.id, e.target.value)}
                      className="w-full mt-2 p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
                      rows="2"
                      placeholder="Optional notes..."
                    />
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-center mb-6">
          <button
            onClick={handleGenerateReview}
            disabled={isGenerating || !apiKey}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-200 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Review...
              </span>
            ) : (
              '✨ Generate Performance Review'
            )}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Generated Review */}
        {generatedReview && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Generated Review</h2>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedReview);
                  alert('Review copied to clipboard!');
                }}
                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded"
              >
                Copy to Clipboard
              </button>
            </div>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded border border-gray-200">
                {generatedReview}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
