// src/components/AuditTypeSelector.jsx

import React from 'react';

const auditTypes = [
  { id: 'security-policy', name: 'Security Policy', icon: '🛡️' },
  { id: 'smart-contract', name: 'Smart Contract', icon: '📄' },
  { id: 'accessibility', name: 'Web Accessibility', icon: '♿' },
  { id: 'code-quality', name: 'Code Quality', icon: '💻' },
];

const AuditTypeSelector = ({ selectedType, onTypeChange }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">1. Choose Audit Type</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {auditTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`p-4 rounded-lg text-center font-semibold border-2 transition-all duration-200 ${
              selectedType === type.id
                ? 'bg-blue-600 text-white border-blue-700 shadow-lg scale-105'
                : 'bg-white hover:bg-gray-50 border-gray-200'
            }`}
          >
            <span className="text-3xl mb-2 block">{type.icon}</span>
            {type.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AuditTypeSelector;
