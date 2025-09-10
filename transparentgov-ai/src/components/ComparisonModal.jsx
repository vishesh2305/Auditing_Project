// src/components/ComparisonModal.jsx
import React from 'react';
import { X, Loader } from 'lucide-react';

export default function ComparisonModal({ result, isLoading, onClose }) {
  if (!result && !isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">AI-Powered Audit Comparison</h3>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-48">
            <Loader className="animate-spin text-pink-500" size={48} />
            <p className="mt-4 text-gray-600">Generating comparative analysis...</p>
          </div>
        ) : (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br />') }} />
        )}
      </div>
    </div>
  );
}
