import React from 'react';

export default function About() {
  return (
    <div className="bg-gray-900 min-h-screen mx-auto px-6 py-12 animate-fade-in">
      <h2 className="text-4xl font-extrabold text-white mb-4">About TransparentGov AI</h2>
      <div className="prose max-w-none lg:prose-xl text-white">
        <p>
          TransparentGov AI was founded on a simple yet powerful principle: public artificial intelligence should serve the public's interest, equitably and transparently.
        </p>
        <p>
          Our mission is to empower citizens with tools and insights necessary to hold governments accountable. In the age of AI, trust must be built on a foundation of verifiable transparency.
        </p>

        <h3 className="mt-8">Our Dual Approach</h3>
        <p>
          We combine AI and blockchain to provide:
        </p>
        <ul>
          <li><strong>Ethical AI Auditing:</strong> Revealing bias through XAI (Explainable AI).</li>
          <li><strong>Blockchain for Trust:</strong> Immutable records for public transparency.</li>
        </ul>

        <h3 className="mt-10">Our Vision</h3>
        <p>
          We envision a world where every decision powered by AI in governance is understandable, traceable, and fair. 
          Citizens deserve visibility into how algorithms impact their lives — from resource allocation to policy enforcement.
        </p>
        <p>
          By bridging advanced technologies with civic responsibility, TransparentGov AI aims to be a catalyst for a new era of 
          accountable governance.
        </p>

        <h3 className="mt-10">What We Offer</h3>
        <ul>
          <li><strong>Policy Sandbox:</strong> Test government policies with AI-driven audits before real-world implementation.</li>
          <li><strong>Smart Contract Audits:</strong> Ensure blockchain governance tools are secure, efficient, and tamper-proof.</li>
          <li><strong>Document Auditing:</strong> Instantly analyze reports, guidelines, and regulations for compliance and fairness.</li>
          <li><strong>Comprehensive Reporting:</strong> Delivering clear, actionable insights in formats accessible to all citizens.</li>
        </ul>

        <h3 className="mt-10">Our Commitment</h3>
        <p>
          At TransparentGov AI, we are committed to:
        </p>
        <ul>
          <li>Ensuring inclusivity by making technology accessible to everyone.</li>
          <li>Maintaining neutrality and fairness in AI-driven audits.</li>
          <li>Building open-source frameworks so communities can verify our work.</li>
          <li>Fostering collaborations between governments, academia, and civil society.</li>
        </ul>

        <h3 className="mt-10">Join Us</h3>
        <p>
          Transparency is a collective effort. Whether you are a policymaker, researcher, developer, or citizen, you can be part of 
          the movement. Together, we can create a governance model that is fair, accountable, and future-ready.
        </p>
      </div>
    </div>
  );
}
