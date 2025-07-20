import React from 'react';
import { Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <Cpu className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">TransparentGov AI</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          {[
            { name: 'Audits', route: '/' },
            { name: 'Policy Sandbox', route: '/sandbox' },
            { name: 'Remediation Simulator', route: '/simulator' },
            { name: 'About', route: '/about' },
            { name: 'Resources', route: '/resources' },
            { name: 'Contact', route: '/contact' },
          ].map((item, i) => (
            <a
              key={i}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate(item.route);
              }}
              className="text-gray-600 hover:text-blue-600"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
