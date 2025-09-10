import React from 'react';
import SeverityBadge from './SeverityBadge';
import { exportToMarkdown } from '../utils/exportUtils';

const AuditReport = ({ result, auditType, inputText }) => {
  if (!result) return null;

  if (result.error) {
    return (
      <div className="mt-6 bg-red-50 p-6 rounded-lg shadow-md border border-l-4 border-red-500">
        <h2 className="text-2xl font-bold mb-3 text-red-700">{result.error}</h2>
        <p className="text-red-800">{result.message}</p>
      </div>
    );
  }

  const findingsKey = Object.keys(result).find(key => Array.isArray(result[key]));
  const findings = findingsKey ? result[findingsKey] : [];

  const handleExport = () => {
    exportToMarkdown(result, auditType, inputText);
  };

  return (
    <div className="space-y-8 mt-8">
      {/* Header with Export Button */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-2xl font-bold text-white">Audit Report</h2>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-800 transition-colors text-sm"
        >
          Export to Markdown
        </button>
      </div>

      {/* Summary Section */}
      {result.summary && (
        <div>
          <h2 className="text-2xl font-bold mb-3 border-b pb-2 text-white">Audit Summary</h2>
          <p className="text-white bg-gray-900 p-4 rounded-md">{result.summary}</p>
        </div>
      )}

      {/* Findings Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-white">Detailed Findings</h2>
        <div className="space-y-6  bg-gray-900">
          {findings.length > 0 ? findings.map((item, index) => (
            <div key={index} className="bg-gray-900 text-white p-6 rounded-lg shadow-lg border">
              <div className="flex justify-between items-start mb-2 text-white">
                <h3 className="text-xl font-semibold text-white">
                  {item.title || item.issue || item.area || `Finding ${index + 1}`}
                </h3>
                {item.severity && <SeverityBadge severity={item.severity} />}
              </div>
              <div className="space-y-4">
                {Object.entries(item).map(([key, value]) => {
                  if (['title', 'issue', 'area', 'severity'].includes(key)) return null;
                  return (
                    <div key={key}>
                      <h4 className="font-semibold text-white capitalize">
                        {key.replace(/_/g, ' ')}
                      </h4>
                      <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded-md border border-gray-200 font-mono text-sm">
                        {value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )) : <p className='text-white'>No specific issues found.</p>}
        </div>
      </div>
    </div>
  );
};

export default AuditReport;
