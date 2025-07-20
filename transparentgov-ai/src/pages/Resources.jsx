import React from 'react';

export default function Resources() {
  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Educational Resources</h2>
      <div className="space-y-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-2">What is Algorithmic Bias?</h3>
          <p className="text-gray-700">
            Algorithmic bias occurs when a computer system reflects the implicit values of its creators. In public AI, this can lead to discrimination, even if unintentional.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-2">Why is Blockchain Important for Audits?</h3>
          <p className="text-gray-700">
            Blockchain offers a tamper-proof ledger. Audits stored on-chain can't be altered, creating trust and verifiability.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-2">How Can I Use This Platform?</h3>
          <p className="text-gray-700">
            Explore audits, analyze bias, use AI features to ask questions or raise concerns with agencies—all built into the platform.
          </p>
        </div>
      </div>
    </div>
  );
}
