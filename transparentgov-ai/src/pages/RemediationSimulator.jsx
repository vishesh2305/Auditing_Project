// src/pages/RemediationSimulator.jsx
import React, { useState } from 'react';

import { Sparkles, Loader, Copy, Download } from 'lucide-react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import { generateCodeRemediation, scoreCodeWithAI } from '../services/LLM.js';

import { exportToMarkdown } from '../utils/exportUtils.js';
import { copyToClipboard } from '../utils/exportUtils.js';

import ScoreDisplay from '../components/ScoreDisplay.jsx';

export default function RemediationSimulator() {
    const [vulnerableCode, setVulnerableCode] = useState('');
    const [vulnerabilityDescription, setVulnerabilityDescription] = useState('');
    const [fixedCode, setFixedCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [originalCodeScores, setOriginalCodeScores] = useState(null);
    const [fixedCodeScores, setFixedCodeScores] = useState(null);

    const handleSimulation = async () => {
        if (!vulnerableCode.trim() || !vulnerabilityDescription.trim()) {
            alert("Please provide both the code snippet and a description of the vulnerability.");
            return;
        }

        setIsLoading(true);
        setFixedCode('');
        setError(null);
        setOriginalCodeScores(null);
        setFixedCodeScores(null);

        try {
            const remediationResult = await generateCodeRemediation(vulnerableCode, vulnerabilityDescription);

            if (remediationResult.error) {
                setError(remediationResult);
                setIsLoading(false);
                return;
            }

            if (remediationResult.fixedCode) {
                setFixedCode(remediationResult.fixedCode);

                const [originalScores, fixedScores] = await Promise.all([
                    scoreCodeWithAI(vulnerableCode),
                    scoreCodeWithAI(remediationResult.fixedCode),
                ]);

                setOriginalCodeScores(originalScores);
                setFixedCodeScores(fixedScores);
            }
        } catch (err) {
            console.error("Unexpected error during simulation:", err);
            setError({ error: "Unexpected Error", message: err.message });
        }

        setIsLoading(false);
    };

    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in bg-gray-900">
            <h2 className="text-4xl font-extrabold text-white mb-4">Interactive Code Remediation</h2>
            <p className="text-white mb-6">
                Paste your code, describe the vulnerability, and let the AI generate a proposed fix.
            </p>

                <div className="bg-gray-900 p-6 rounded-lg shadow-md space-y-4 mb-8">
                <div>
                    <label htmlFor="vulnerable-code" className="block text-sm font-medium text-white mb-1">
                        1. Paste Vulnerable Code Snippet
                    </label>
                    <textarea
                        id="vulnerable-code"
                        className="w-full h-64 p-3 border rounded-md bg-gray-900 text-white font-mono text-sm"
                        placeholder="function vulnerable(...) { ... }"
                        value={vulnerableCode}
                        onChange={(e) => setVulnerableCode(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="vulnerability-description" className="block text-sm font-medium text-white mb-1">
                        2. Describe the Vulnerability
                    </label>
                    <textarea
                        id="vulnerability-description"
                        className="w-full h-24 p-3 border rounded-md bg-gray-900 text-white"
                        placeholder="e.g., 'This code is vulnerable to SQL injection  because the input is not sanitized.'"
                        value={vulnerabilityDescription}
                        onChange={(e) => setVulnerabilityDescription(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleSimulation}
                    disabled={isLoading || !vulnerableCode.trim() || !vulnerabilityDescription.trim()}
                    className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-teal-500 text-white font-bold rounded-md hover:bg-teal-700 disabled:bg-gray-400 transition-colors"
                >
                    {isLoading ? <Loader className="animate-spin" /> : <Sparkles />}
                    {isLoading ? 'Generating Fix...' : 'Generate AI-Powered Code Fix'}
                </button>
            </div>

            {error && (
                <div className="mt-8 bg-red-50 p-6 rounded-lg shadow-md border border-l-4 border-red-500">
                    <h3 className="text-2xl font-bold mb-3 text-red-700">{error.error}</h3>
                    <p className="text-red-800">{error.message}</p>
                </div>
            )}

            {fixedCode && (
                <div className="mt-8 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <ScoreDisplay title="Original Code Score" scores={originalCodeScores} />
                        <ScoreDisplay title="AI-Fixed Code Score" scores={fixedCodeScores} />
                    </div>

                    <div className="bg-white rounded-lg shadow-lg">
                        <div className="p-4 bg-gray-50 border-b border-gray-200 rounded-t-lg flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">Code Remediation Analysis</h3>
                                <p className="text-sm text-gray-600">
                                    Showing differences between your original code and the AI-generated fix.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => copyToClipboard(fixedCode)}
                                    className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors"
                                    title="Copy fixed code"
                                >
                                    <Copy size={16} />
                                    Copy
                                </button>
                                <button
                                    onClick={() =>
                                        exportToMarkdown(
                                            {
                                                summary: 'Code Remediation',
                                                findings: [{ recommendation: fixedCode }],
                                            },
                                            'code-remediation',
                                            vulnerableCode
                                        )
                                    }
                                    className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors"
                                    title="Export diff as Markdown"
                                >
                                    <Download size={16} />
                                    Export
                                </button>
                            </div>
                        </div>
                        <div className="font-mono text-sm">
                            <ReactDiffViewer
                                oldValue={vulnerableCode}
                                newValue={fixedCode}
                                splitView={true}
                                compareMethod={DiffMethod.WORDS}
                                leftTitle="Your Original Code"
                                rightTitle="AI-Generated Secure Code"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}