// src/pages/PolicySandbox.jsx

import React, { useState } from 'react';
// ▼ IMPORT our new structured analysis function and the new badge component
import { analyzePolicyStructured } from '../services/LLM';
import SeverityBadge from '../components/SeverityBadge';

const PolicySandbox = () => {
  const [policyText, setPolicyText] = useState('');
  // ▼ The state will now hold the structured object or null
  const [analysisResult, setAnalysisResult] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!policyText.trim()) {
      // You can set a structured error here too if you like
      return;
    }
    
    setIsLoading(true);
    setAnalysisResult(null); // Clear previous results

    // ▼ USE the new function
    const result = await analyzePolicyStructured(policyText);
    
    setAnalysisResult(result);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-4">Policy Sandbox</h1>
      <p className="text-gray-600 mb-6">
        Test and analyze security policies. The AI will return a structured audit report identifying key vulnerabilities.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <textarea
          className="w-full h-64 p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Paste your security policy here..."
          value={policyText}
          onChange={(e) => setPolicyText(e.target.value)}
        />
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {isLoading ? 'Analyzing...' : 'Generate Audit Report'}
        </button>
      </div>

      {/* ▼ NEW RENDERING LOGIC ▼ */}
      {isLoading && <div className="text-center p-4">Loading analysis...</div>}

      {analysisResult && (
        <div className="space-y-8">
          {/* --- Summary Section --- */}
          <div>
            <h2 className="text-2xl font-bold mb-3 border-b pb-2">Audit Summary</h2>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-md">
              {analysisResult.summary}
            </p>
          </div>

          {/* --- Vulnerabilities Section --- */}
          <div>
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Identified Vulnerabilities</h2>
            <div className="space-y-6">
              {analysisResult.vulnerabilities?.map((vuln, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-l-4" style={{borderColor: vuln.severity === 'High' ? '#ef4444' : vuln.severity === 'Medium' ? '#f59e0b' : '#22c55e'}}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{vuln.title}</h3>
                    <SeverityBadge severity={vuln.severity} />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-600">Description</h4>
                      <p className="text-gray-700">{vuln.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-600">Recommendation</h4>
                      <p className="text-gray-700 bg-green-50 p-3 rounded-md border border-green-200">{vuln.recommendation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicySandbox;