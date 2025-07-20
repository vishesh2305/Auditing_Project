import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AuditHub from './pages/AuditHub';
import About from './pages/About';
import RemediationSimulator from './pages/RemediationSimulator';
import PolicySandbox from './pages/PolicySandbox';
import Resources from './pages/Resources';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50">
          <Routes>
            <Route path="/" element={<AuditHub />} />
            <Route path="/about" element={<About />} />
            <Route path="/simulator" element={<RemediationSimulator />} />
            <Route path="/sandbox" element={<PolicySandbox />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
