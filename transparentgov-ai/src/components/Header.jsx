import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Cpu } from 'lucide-react';

const Header = () => {
  const activeLinkClass = "text-blue-500 dark:text-blue-400 font-semibold";
  const inactiveLinkClass = "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400";

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Cpu className="w-8 h-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-800 dark:text-white">TransparentGov AI</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>Audits</NavLink>
          <NavLink to="/sandbox" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>Policy Sandbox</NavLink>
          <NavLink to="/remediation-simulator" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>Remediation Simulator</NavLink>
          <NavLink to="/document-auditor" className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium ${isActive
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
              : inactiveLinkClass}`
          }>
            Document Auditor
          </NavLink>
          <NavLink to="/methodology" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>Methodology</NavLink>
          <NavLink to="/resources" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>Resources</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>About</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
