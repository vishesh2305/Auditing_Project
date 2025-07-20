import React from 'react';

const SeverityBadge = ({ severity }) => {
  const severityStyles = {
    High: 'bg-red-100 text-red-800 border-red-400',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-400',
    Low: 'bg-green-100 text-green-800 border-green-400',
    Critical: 'bg-red-200 text-red-900 border-red-600 font-bold',
  };

  const style = severityStyles[severity] || 'bg-gray-100 text-gray-800 border-gray-400';

  return (
    <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full border ${style}`}>
      {severity}
    </span>
  );
};

export default SeverityBadge;