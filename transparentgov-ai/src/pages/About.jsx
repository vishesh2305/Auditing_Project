import React from 'react';

export default function About() {
  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-4">About TransparentGov AI</h2>
      <div className="prose max-w-none lg:prose-xl">
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
      </div>
    </div>
  );
}
