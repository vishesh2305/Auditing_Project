// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, BarChart, FileText, Zap } from 'lucide-react';
import AuditCard from '../components/AuditCard';
import { auditedSystems } from '../data/auditedSystems';

const Home = () => {
  const featuredSystems = auditedSystems.slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            The Future of Auditing is Here
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Leveraging AI and blockchain for transparent, efficient, and intelligent auditing solutions. From smart contracts to internal documents, we've got you covered.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/audit-hub"
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              Explore Audits
            </Link>
            <Link
              to="/document-auditor"
              className="px-8 py-3 bg-gray-700 text-white font-bold rounded-lg shadow-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
            >
              Audit a Document
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Why Choose AuditChain?</h2>
            <p className="text-md text-gray-500 dark:text-gray-400 mt-2">Core features that set us apart.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="feature-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI-Powered Analysis</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Utilize advanced LLMs to detect vulnerabilities and compliance issues with unparalleled accuracy.
            </p>
          </div>
          <div className="feature-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Document Auditing (RAG)</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Upload internal policies or reports and get instant, context-aware answers and analysis.
            </p>
          </div>
          <div className="feature-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BarChart className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Comprehensive Reporting</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Receive detailed, actionable reports with clear visualizations and remediation suggestions.
            </p>
          </div>
           <div className="feature-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">On-Chain Verification</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Anchor audit trails and results on the blockchain for immutable proof and ultimate trust.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Audits Section */}
      <section>
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Recently Audited Systems</h2>
            <p className="text-md text-gray-500 dark:text-gray-400 mt-2">Explore our latest public audit reports.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSystems.map((system) => (
            <AuditCard key={system.id} system={system} />
          ))}
        </div>
        <div className="text-center mt-12">
            <Link to="/audit-hub" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                View All Audits &rarr;
            </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;