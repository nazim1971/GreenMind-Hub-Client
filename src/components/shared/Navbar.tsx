"use client";

import { useState, useEffect } from "react";
// import { signOut } from "next-auth/react";
import Link from "next/link";
import { FiHome, FiMenu } from "react-icons/fi"; // Import home and menu icon
import Sidebar from "./Sidebar";
import { ModeToggle } from "../theme/ModeToggle";

export type UserProps = {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
};

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true); // Initially visible
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowNavbar(false); // Hide navbar on scroll down
      } else {
        setShowNavbar(true); // Show navbar on scroll up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div>
      {/* Sidebar Component */}
      <Sidebar  isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />

      {/* Navbar Container */}
      <div
        className={`fixed w-full top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 bg-white dark:bg-gray-900 shadow-lg border-b border-gray-300 dark:border-gray-700 max-w-[1200px] mx-auto rounded-b-xl">
          {/* Left side: Home icon */}
          <div className="flex items-center">
            <Link href="/">
              <FiHome className="text-2xl text-gray-500 dark:text-teal-400 hover:text-teal-700 transition duration-200" />
            </Link>
          </div>

          {/* Right side: Hamburger Menu (visible on mobile) */}
          <div className="flex items-center lg:hidden">
            <button onClick={toggleSidebar} className="text-2xl text-gray-500 dark:text-teal-400 hover:text-teal-700 transition">
              <FiMenu />
            </button>
          </div>

          {/* Right side: Links (hidden on mobile) */}
          <div className="hidden lg:flex items-center gap-5">
            <Link href="/projects" className="hover:text-teal-500 transition text-gray-500 dark:text-gray-400">
              Projects
            </Link>
            <Link href="/contact" className="hover:text-teal-500 transition text-gray-500 dark:text-gray-400">
              Contact
            </Link>
            <Link href="/resume" className="hover:text-teal-500 transition text-gray-500 dark:text-gray-400">
              Resume
            </Link>
            <Link href="/blog" className="hover:text-teal-500 transition text-gray-500 dark:text-gray-400">
              Blog
            </Link>
            {/* {
              session?.user ? <button
              onClick={toggleSidebar}
              className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg shadow-lg hover:from-teal-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 dark:text-gray-100"
            >
              <span>Dashboard</span>
            </button> : ''
            } */}

            {/* User session */}
            <div className="flex items-center">
              {/* {session?.user ? (
                <button
                  // onClick={() => signOut()}
                  className="border border-red-500 text-red-500 px-5 py-2 rounded-full hover:bg-red-500 hover:text-white transition duration-200"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login" className="border border-teal-500 text-teal-500 px-5 py-2 rounded-full hover:bg-teal-500 hover:text-white transition duration-200">
                  Login
                </Link>
              )} */}
            </div>

            {/* Dark/Light Mode Toggle */}
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;