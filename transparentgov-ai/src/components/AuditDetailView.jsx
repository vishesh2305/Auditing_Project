import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PIE_COLORS } from '../data/auditedSystems';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function AuditDetailView({ system, onBack }) {
  const { name, agency, fairnessScore, biasDetails, xaiReport, lastAudit } = system;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <button onClick={onBack} className="flex items-center text-blue-600 hover:underline mb-6">
        <ArrowLeft className="mr-2 w-5 h-5" /> Back to Audits
      </button>

      <h2 className="text-3xl font-extrabold text-gray-800 mb-2">{name}</h2>
      <p className="text-sm text-gray-500 mb-4">{agency} • Last Audit: {lastAudit}</p>

      <div className="grid md:grid-cols-2 gap-8 mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Bias Analysis</h3>
          <p><strong>Impact:</strong> {biasDetails.impact}</p>
          <p><strong>Affected Groups:</strong> {biasDetails.affectedGroups.join(', ')}</p>
          <p><strong>Remediation:</strong> {biasDetails.remediation}</p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Fairness Score</h3>
          <p className="text-4xl font-bold text-blue-600">{fairnessScore}</p>
          <PieChart width={250} height={200}>
            <Pie
              data={[
                { name: 'Fairness', value: fairnessScore },
                { name: 'Bias', value: 100 - fairnessScore }
              ]}
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {PIE_COLORS.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">Explainable AI (XAI) Report</h3>
        <div className="prose max-w-none lg:prose-lg">
          <p><strong>Top Features Influencing Bias:</strong></p>
          <ul>
            {xaiReport.topFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <p className="mt-4"><strong>Explanation:</strong> {xaiReport.explanation}</p>
        </div>
      </div>
    </div>
  );
}
