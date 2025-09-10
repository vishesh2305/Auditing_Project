// src/components/StatusBadge.jsx
import React from 'react';
import { AlertTriangle, ShieldCheck, Search } from 'lucide-react';

export default function StatusBadge({ status }) {
  const base = "px-3 py-1 text-sm font-semibold rounded-full inline-block";

  switch (status) {
    case 'Bias Detected':
      return <span className={`${base} bg-red-100 text-red-800`}><AlertTriangle className="inline w-4 h-4 mr-1" />{status}</span>;
    case 'Fair':
      return <span className={`${base} bg-green-100 text-green-800`}><ShieldCheck className="inline w-4 h-4 mr-1" />{status}</span>;
    case 'Needs Review':
      return <span className={`${base} bg-yellow-100 text-yellow-800`}><Search className="inline w-4 h-4 mr-1" />{status}</span>;
    default:
      return <span className={`${base} bg-gray-100 text-gray-800`}>{status}</span>;
  }
}
