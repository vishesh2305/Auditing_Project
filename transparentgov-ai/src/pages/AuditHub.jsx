import React, { useState } from 'react';
import AuditTypeSelector from '../components/AuditTypeSelector';
import AuditInput from '../components/AuditInput';
import AuditReport from '../components/AuditReport';
import { analyzeWithAI } from '../services/LLM'; 

const AuditHub = () => {
  const [auditType, setAuditType] = useState('security-policy');
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRunAudit = async () => {
    if (!inputText.trim()) {
      return;
    }
    
    setIsLoading(true);
    setAnalysisResult(null);

    const result = await analyzeWithAI(auditType, inputText);
    
    setAnalysisResult(result);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-2">Auditron AI</h1>
        <p className="text-lg text-gray-600">Your Universal AI-Powered Auditing Assistant</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <AuditTypeSelector selectedType={auditType} onTypeChange={setAuditType} />

        <AuditInput
          auditType={auditType}
          inputText={inputText}
          onInputChange={setInputText}
          onRunAudit={handleRunAudit}
          isLoading={isLoading}
        />

        {isLoading && <div className="text-center p-8">Analyzing... Please wait.</div>}
        {analysisResult && <AuditReport result={analysisResult} />}
      </div>
    </div>
  );
};

export default AuditHub;
