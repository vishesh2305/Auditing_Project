import React from 'react';

const placeholders = {
  'security-policy': 'Paste your full security policy text here...',
  'smart-contract': 'Paste your Solidity contract code here...',
  'accessibility': 'Paste the HTML of a web page or component here...',
  'code-quality': 'Paste a function or code snippet here...',
};

const AuditInput = ({ auditType, inputText, onInputChange, onRunAudit, isLoading }) => {
  return (
    <div className="mb-8 ">
      <h2 className="text-xl font-bold text-white mb-4 text-center">2. Provide Content to Audit</h2>
      <div className="bg-gray-900 p-6 rounded-lg shadow-md">
        <textarea
          className="w-full h-80 p-3 border rounded-md text-white bg-gray-900 font-mono text-sm"
          placeholder={placeholders[auditType] || 'Enter content...'}
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
        />
        <button
          onClick={onRunAudit}
          disabled={isLoading}
          className="mt-4 w-full px-6 py-3 bg-teal-500 text-white font-bold rounded-md hover:bg-teal-600 disabled:bg-gray-400 transition-all text-lg"
        >
          {isLoading ? 'Auditing...' : 'Run AI Audit'}
        </button>
      </div>
    </div>
  );
};

export default AuditInput;