import React from 'react';
import { ChevronsRight } from 'lucide-react';

export default function Methodology() {
  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Our Auditing Methodology</h2>
      <div className="prose max-w-none lg:prose-xl space-y-6">
        <p>We assess AI systems across fairness, explainability, and integrity using:</p>

        <div>
          <h3 className="flex items-center">
            <ChevronsRight className="text-blue-500 mr-2" /> 1. Fairness Assessment
          </h3>
          <p>
            We use metrics like Demographic Parity and Equalized Odds to detect disparities across caste, gender, geography, and more.
          </p>
        </div>

        <div>
          <h3 className="flex items-center">
            <ChevronsRight className="text-blue-500 mr-2" /> 2. Explainable AI (XAI)
          </h3>
          <p>
            Using SHAP and LIME, we identify which features influence AI decisions the most to uncover hidden biases.
          </p>
        </div>

        <div>
          <h3 className="flex items-center">
            <ChevronsRight className="text-blue-500 mr-2" /> 3. Blockchain Verification
          </h3>
          <p>
            Each audit result is cryptographically hashed and stored on blockchain—ensuring permanent, tamper-proof records.
          </p>
        </div>
      </div>
    </div>
  );
}
