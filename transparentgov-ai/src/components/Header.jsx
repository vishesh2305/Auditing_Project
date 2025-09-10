import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Cpu } from "lucide-react";

const Header = () => {
  const linkClass =
    "text-gray-500 transition hover:text-teal-600 dark:hover:text-teal-400";
  const activeLinkClass = "text-teal-600 dark:text-teal-400 font-semibold";

  return (
    <header className=" bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-teal-600">
          <Cpu className="h-8 w-8" />
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            AuditRon
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-center  md:justify-center">
          <nav aria-label="Global" className="hidden md:block ">
            <ul className="flex items-center gap-6 text-sm font-medium">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? activeLinkClass : linkClass
                  }
                >
                  Audits
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/policy-sandbox"
                  className={({ isActive }) =>
                    isActive ? activeLinkClass : linkClass
                  }
                >
                  Policy Sandbox
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/audit-hub"
                  className={({ isActive }) =>
                    isActive ? activeLinkClass : linkClass
                  }
                >
                  Audit Hub
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/remediation-simulator"
                  className={({ isActive }) =>
                    isActive ? activeLinkClass : linkClass
                  }
                >
                  Remediation Simulator
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/document-auditor"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 px-3 py-1.5 rounded-md"
                      : linkClass
                  }
                >
                  Document Auditor
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? activeLinkClass : linkClass
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Right Side Buttons */}

          
          {/* <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <Link
                to="/login"
                className="block rounded-md bg-teal-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-teal-700"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hidden rounded-md bg-gray-100 px-5 py-2 text-sm font-medium text-teal-600 transition hover:text-teal-700 sm:block"
              >
                Register
              </Link>
            </div>




            <button className="block rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-700 dark:bg-gray-800 dark:text-gray-300 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
