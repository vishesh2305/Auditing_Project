import React from 'react';
import { Cpu } from 'lucide-react';

export default function Header({ setPage }) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setPage('home')}>
          <Cpu className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">TransparentGov AI</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          {['Audits', 'Policy Sandbox', 'Remediation Simulator', 'About', 'Resources', 'Contact'].map((name, i) => {
            const page = name.toLowerCase().replace(/ /g, '');
            return (
              <a key={i} href="#" onClick={(e) => { e.preventDefault(); setPage(page); }} className="text-gray-600 hover:text-blue-600">
                {name}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
