import React, { useState } from 'react';
import { Sparkles, Loader } from 'lucide-react';
import { auditedSystems } from '../data/auditedSystems';
import {generateWithLocalLLM} from '../services/LLM.js';

export default function RemediationSimulator() {
  const biasedSystems = auditedSystems.filter(s => s.status === 'Bias Detected');
  const [selectedId, setSelectedId] = useState(biasedSystems[0]?.id || '');
  const [strategy, setStrategy] = useState('');
  const [simulationResult, setSimulationResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const selectedSystem = biasedSystems.find(s => s.id === selectedId);

  const handleSimulation = async () => {
    if (!strategy) return alert("Enter your remediation strategy.");

    setIsLoading(true);
    const prompt = `Analyze this proposed solution to a biased AI:

**System:** ${selectedSystem.name}
**Agency:** ${selectedSystem.agency}
**Bias:** ${selectedSystem.biasDetails.impact}
**Strategy:** ${strategy}

Write:
1. Potential Benefits
2. Potential Risks
3. Overall Assessment`;

    const result = await generateWithLocalLLM(prompt);
    setSimulationResult(result);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Remediation Simulator</h2>
      <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <select className="input" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          {biasedSystems.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <textarea className="textarea" rows={4} placeholder="Propose your fix..." value={strategy} onChange={(e) => setStrategy(e.target.value)} />
        <button onClick={handleSimulation} disabled={isLoading} className="btn bg-purple-600 hover:bg-purple-700 w-full">
          {isLoading ? <Loader className="animate-spin" /> : <Sparkles />}
          Simulate Consequences
        </button>
      </div>

      {simulationResult && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-2">Simulation Result</h3>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: simulationResult.replace(/\n/g, '<br />') }} />
        </div>
      )}
    </div>
  );
}
