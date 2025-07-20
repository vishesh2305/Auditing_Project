import React from 'react';
import HeroSection from '../components/HeroSection';
import AuditCard from '../components/AuditCard';
import { auditedSystems } from '../data/auditedSystems';

export default function Home({ setSelectedSystem, isCompareMode, handleSelectForCompare, selectedForCompare }) {
  return (
    <>
      <HeroSection />
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Public AI Audits</h2>
        {/* map AuditCards here */}
      </div>
    </>
  );
}
