// src/services/blockchain.js
import { ethers } from 'ethers';
import useAppStore from '../store/useAppStore';

// 1. PASTE YOUR DEPLOYED CONTRACT ADDRESS HERE
const AUDIT_LOG_ADDRESS = '0x10d81cDC1eF81755711eD4028274067096fdE9fb';

// 2. PASTE YOUR CONTRACT ABI HERE
const AUDIT_LOG_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "auditId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "auditHash",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "logger",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "AuditLogged",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_auditHash",
				"type": "bytes32"
			}
		],
		"name": "logAudit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "auditHashes",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


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

    // 3. CREATE A CONTRACT INSTANCE
    const auditLogContract = new ethers.Contract(AUDIT_LOG_ADDRESS, AUDIT_LOG_ABI, signer);

    console.log('Generated Audit Hash:', auditHash);
    console.log('Sending transaction to AuditLog contract...');

    // 4. CALL THE SMART CONTRACT FUNCTION
    const tx = await auditLogContract.logAudit(auditHash);

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