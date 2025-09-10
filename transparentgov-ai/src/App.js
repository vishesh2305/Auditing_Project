import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AuditHub from './pages/AuditHub';
import AuditDetail from './pages/AuditDetail';
import DocumentAuditor from './pages/DocumentAuditor';
import About from './pages/About';
import RemediationSimulator from './pages/RemediationSimulator';
import PolicySandbox from './pages/PolicySandbox';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/audit-hub" element={<AuditHub />} />
            <Route path="/audit/:id" element={<AuditDetail />} />
            <Route path="/document-auditor" element={<DocumentAuditor />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/policy-sandbox" element={<PolicySandbox />} />
            <Route path="/remediation-simulator" element={<RemediationSimulator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;