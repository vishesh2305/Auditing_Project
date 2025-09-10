import React from 'react';
import StatusBadge from './StatusBadge';

export default function AuditCard({
  system,
  onSelect = () => {},
  isCompareMode,
  onSelectForCompare = () => {},
  isSelected
}) {
  const handleClick = () => {
    if (isCompareMode && typeof onSelectForCompare === 'function') {
      onSelectForCompare(system.id);
    } else if (!isCompareMode && typeof onSelect === 'function') {
      onSelect(system);
    }
  };

  return (
    <div
      className={`bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl p-6 relative ${isCompareMode ? 'cursor-pointer' : ''} ${isSelected ? 'ring-2 ring-pink-500' : ''}`}
      onClick={handleClick}
    >
      {isCompareMode && (
        <div className="absolute top-2 right-2">
          <input
            type="checkbox"
            checked={isSelected}
            readOnly
            className="h-5 w-5 text-pink-600 border-gray-300 rounded"
          />
        </div>
      )}

      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-white mb-2">{system.name}</h3>
        <StatusBadge status={system.status} />
      </div>

      <p className="text-sm text-gray-500 mb-4">{system.agency}</p>
      <p className="text-white mb-4">{system.description}</p>

      <div className="flex justify-between items-center text-sm text-white">
        <span>
          Fairness Score:{' '}
          <span className="font-bold text-blue-600">{system.fairnessScore}</span>
        </span>
        <span>Last Audit: {system.lastAudit}</span>
      </div>
    </div>
  );
}