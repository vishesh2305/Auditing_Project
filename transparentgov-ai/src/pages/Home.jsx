// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import AuditCard from '../components/AuditCard'
import FeatureCard from '../components/FeatureCard'
import { auditedSystems } from '../data/auditedSystems'
import img1 from "../assets/images/AI_analysis.jpg";
import img2 from "../assets/images/document_audit.jpg";
import img3 from "../assets/images/Comprehensive_reporting.jpg";
import img4 from "../assets/images/OnChain_verification.jpg";

const Home = () => {
  const featuredSystems = auditedSystems.slice(0, 3)

  const features = [
    {
      id: 1,
      image: img1,
      title: 'AI-Powered Analysis',
      description:
        'Utilize advanced LLMs to detect vulnerabilities and compliance issues with unparalleled accuracy.',
      link: '/ai-analysis',
    },
    {
      id: 2,
      image: img2,
      title: 'Document Auditing (RAG)',
      description:
        'Upload internal policies or reports and get instant, context-aware answers and analysis.',
      link: '/document-auditor',
    },
    {
      id: 3,
      image: img3,
      title: 'Comprehensive Reporting',
      description:
        'Receive detailed, actionable reports with clear visualizations and remediation suggestions.',
      link: '/reports',
    },
    {
      id: 4,
      image: img4,
      title: 'On-Chain Verification',
      description:
        'Anchor audit trails and results on the blockchain for immutable proof and ultimate trust.',
      link: '/onchain-verification',
    },
  ]

  return (
    <div className="space-y-16 !bg-gray-900">
      <section className="bg-gray-900 overflow-hidden bg-[url(https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-top bg-no-repeat">
        <div className="bg-black/60 p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              The Future of Auditing is Here
            </h1>
            <p className="hidden max-w-2xl text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
              Leveraging AI and blockchain for transparent, efficient, and intelligent auditing solutions. 
              From smart contracts to internal documents, we've got you covered.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 sm:mt-8 sm:justify-start">
              <Link
                to="/audit-hub"
                className="inline-block rounded-full bg-teal-500 px-8 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-teal-600 focus:outline-none focus:ring-3 focus:ring-yellow-400"
              >
                Explore Audits
              </Link>
              <Link
                to="/document-auditor"
                className="inline-block rounded-full bg-gray-700 px-8 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-gray-600 focus:outline-none focus:ring-3 focus:ring-yellow-400"
              >
                Audit a Document
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-gray-900'>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Why Choose AuditChain?</h2>
          <p className="text-md text-white mt-2">Core features that set us apart.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 p-2">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              image={feature.image}
              title={feature.title}
              description={feature.description}
              link={feature.link}
            />
          ))}
        </div>
      </section>

      <section className='bg-gray-900'>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Recently Audited Systems</h2>
          <p className="text-md text-white mt-2">Explore our latest public audit reports.</p>
        </div>
        <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSystems.map((system) => (
            <AuditCard key={system.id} system={system} />
          ))}
        </div>
        <div className="text-center mt-12 bg-gray-900">
          <Link to="/audit-hub" className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-600 ">
            View All Audits &rarr;
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
