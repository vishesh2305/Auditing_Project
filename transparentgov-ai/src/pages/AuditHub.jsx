import React, { useState } from 'react';
import AuditTypeSelector from '../components/AuditTypeSelector';
import AuditInput from '../components/AuditInput';
import AuditReport from '../components/AuditReport';
import { analyzeWithAI } from '../services/LLM';
import { saveAuditReport } from '../services/historyService'; 
import { logAuditToBlockchain } from '../services/blockchain';

const AuditHub = () => {
  const [auditType, setAuditType] = useState('security-policy');
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isLoggingToChain, setIsLoggingToChain] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);
  const [blockchainError, setBlockchainError] = useState(null);

  const handleRunAudit = async () => {
    if (!inputText.trim()) {
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);
    setTransactionHash(null);
    setBlockchainError(null);
    setIsLoggingToChain(false);

    try {
      const result = await analyzeWithAI(auditType, inputText);
      setAnalysisResult(result);
      setIsLoading(false);

      if (result && !result.error) {
        setIsLoggingToChain(true);

        const auditDataForChain = {
          auditType: auditType,
          summary: result.summary,
          timestamp: new Date().toISOString(),
        };

        const txHash = await logAuditToBlockchain(auditDataForChain);

        if(txHash){
          setTransactionHash(txHash);
          await saveAuditReport({...auditDataForChain, transactionHash: txHash});
        }else{
          setBlockchainError("Failed to log audit to blockchain. See console for details.");
        }
        setIsLoggingToChain(false);
      }
    } catch (error) {
      console.error("Audit failed:", error);
      setIsLoading(false);
      setIsLoggingToChain(false);
    }
  };

  return (
    <div className="mx-auto p-4 md:p-8 bg-gray-900">
      <div className="text-center mb-12">
        <h1 className="text-4xl text-white font-extrabold mb-2">Auditron AI</h1>
        <p className="text-lg text-white">Your Universal AI-Powered Auditing Assistant</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <AuditTypeSelector selectedType={auditType} onTypeChange={setAuditType} />

        <AuditInput
          auditType={auditType}
          inputText={inputText}
          onInputChange={setInputText}
          onRunAudit={handleRunAudit}
          isLoading={isLoading}
        />

        {isLoading && <div className="text-center text-white p-8">Analyzing... Please wait.</div>}
{isLoggingToChain && (
          <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-md my-4">
            <p className="font-semibold text-yellow-800">Please confirm the transaction in MetaMask to log this audit on-chain...</p>
          </div>
        )}

        {transactionHash && (
          <div className="text-center p-4 bg-green-50 border border-green-200 rounded-md my-4">
            <p className="font-semibold text-green-800">✅ Audit successfully logged on-chain!</p>
            <a
              href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline break-all"
            >
              View on Etherscan: {transactionHash}
            </a>
          </div>
        )}


        {analysisResult && <AuditReport result={analysisResult} />}
      </div>
    </div>
  );
};

export default AuditHub;