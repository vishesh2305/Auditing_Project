// src/services/blockchain.js
import { ethers } from 'ethers';
import useAppStore from '../store/useAppStore';

const AUDIT_LOG_ADDRESS = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B';

const getSigner = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed. Please install it to continue.');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);

  await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();
  return signer;
};

/**
 * @param {object} auditData 
 * @returns {string} 
 */
const hashAuditData = (auditData) => {
  const dataString = JSON.stringify(auditData);
  return ethers.sha256(ethers.toUtf8Bytes(dataString));
};

/**
 * @param {object} auditData - 
 * @returns {Promise<string|null>} 
 */
export const logAuditToBlockchain = async (auditData) => {
  const { setError } = useAppStore.getState();

  try {
    const signer = await getSigner();
    const auditHash = hashAuditData(auditData);

    console.log('Generated Audit Hash:', auditHash);

      const tx = await signer.sendTransaction({
      to: AUDIT_LOG_ADDRESS,
      value: ethers.parseEther('0.00001'), 
      data: auditHash, 
    });

    console.log('Transaction sent! Waiting for confirmation...', tx);
    await tx.wait(1); 

    console.log(`Transaction confirmed! Hash: ${tx.hash}`);
    return tx.hash;
  } catch (error) {
    console.error('Blockchain transaction failed:', error);
    if (error.code === 4001) { 
      setError('Transaction was rejected by the user in MetaMask.');
    } else {
      setError(error.message || 'An unknown blockchain error occurred.');
    }
    return null; 
  }
};