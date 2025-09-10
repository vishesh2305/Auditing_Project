import React from 'react';
import AuditDetailView from '../components/AuditDetailView'; // We'll extract this later from App.js

export default function AuditDetail({ system, onBack }) {
  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <AuditDetailView system={system} onBack={onBack} />
    </div>
  );
}
