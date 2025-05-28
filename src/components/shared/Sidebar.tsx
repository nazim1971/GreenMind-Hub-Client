"use client";
import { useState } from "react";
import { FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import Link from "next/link";
// import { signOut } from "next-auth/react";

type SidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};

const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const toggleDashboardLinks = () => {
    setIsDashboardOpen((prev) => !prev);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-[500] w-64 h-full bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-5">
        <button
          onClick={closeSidebar}
          className="text-gray-500 dark:text-gray-400 hover:text-teal-500 transition"
        >
          <FiX className="text-2xl" />
        </button>
      </div>
    
      <div className="flex flex-col items-start gap-5 p-5">
        <Link
          href="/"
          onClick={closeSidebar}
          className="hover:text-teal-500 transition text-gray-500 dark:text-gray-400"
        >
          Home
        </Link>
       
        <Link
          href="/idea"
          onClick={closeSidebar}
          className="hover:text-teal-500 transition text-gray-500 dark:text-gray-400"
        >
          Idea
        </Link>
        <Link
          href="/blog"
          onClick={closeSidebar}
          className="hover:text-teal-500 transition text-gray-500 dark:text-gray-400"
        >
          Blog
        </Link>
        <Link
          href="/contact"
          onClick={closeSidebar}
          className="hover:text-teal-500 transition text-gray-500 dark:text-gray-400"
        >
          Contact
        </Link>
        <Link
          href="/about-us"
          onClick={closeSidebar}
          className="hover:text-teal-500 transition text-gray-500 dark:text-gray-400"
        >
          About Us
        </Link>
        <>
            {/* Dashboard Toggle */}
            <button
              onClick={toggleDashboardLinks}
              className="flex items-center justify-between w-full text-left hover:text-teal-500 transition text-gray-500 dark:text-gray-400"
            >
              <span>Dashboard</span>
              {isDashboardOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {/* Smoothly expanding/collapsing Dashboard Links */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isDashboardOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pl-4 flex flex-col gap-3">
                <Link
                  href="/dashboard/manage-profile"
                  onClick={closeSidebar}
                  className="hover:text-teal-500 transition text-gray-500 dark:text-gray-400"
                >
                 Manage Profile
                </Link>
                <Link
                  href="/dashboard/all-ideas"
                  onClick={closeSidebar}
                  className="hover:text-teal-500 transition text-gray-500 dark:text-gray-400"
                >
                  All Ideas
                </Link>
                <Link
                  href="/dashboard/create-idea"
                  onClick={closeSidebar}
                  className="hover:text-teal-500 transition text-gray-500 dark:text-gray-400"
                >
                  Create Idea
                </Link>
                <Link
                  href="/dashboard/manage-payment"
                  onClick={closeSidebar}
                  className="hover:text-teal-500 transition text-gray-500 dark:text-gray-400"
                >
                  Manage Payments
                </Link>
              </div>
            </div>
          </>

        <div className="flex items-center">
            <button
            //   onClick={() => signOut()}
              className="border border-red-500 text-red-500 px-5 py-2 rounded-full hover:bg-red-500 hover:text-white transition duration-200"
            >
              Logout
            </button>
         
            <Link
              href="/login"
              className="border border-teal-500 text-teal-500 px-5 py-2 rounded-full hover:bg-teal-500 hover:text-white transition duration-200"
            >
              Login
            </Link>
         
        </div>
      </div>
    </div>
  );
};

export default Sidebar;