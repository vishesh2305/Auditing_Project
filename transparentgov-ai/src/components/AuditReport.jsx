import React from 'react';
import SeverityBadge from './SeverityBadge'; // Assuming this exists and is flexible

const AuditReport = ({ result }) => {
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

  return (
    <div className="space-y-8">
      {result.summary && (
        <div>
          <h2 className="text-2xl font-bold mb-3 border-b pb-2">Audit Summary</h2>
          <p className="text-gray-700 bg-gray-50 p-4 rounded-md">{result.summary}</p>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Detailed Findings</h2>
        <div className="space-y-6">
          {findings.length > 0 ? findings.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg border">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{item.title || item.issue || item.area}</h3>
                {item.severity && <SeverityBadge severity={item.severity} />}
              </div>
              <div className="space-y-4">
                {Object.entries(item).map(([key, value]) => {
                  if (['title', 'issue', 'area', 'severity'].includes(key)) return null;
                  return (
                    <div key={key}>
                      <h4 className="font-semibold text-gray-600 capitalize">{key.replace('_', ' ')}</h4>
                      <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded-md border border-gray-200 font-mono text-sm">{value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )) : <p>No specific issues found.</p>}
        </div>
      </div>
    </div>
  );
};

export default AuditReport;