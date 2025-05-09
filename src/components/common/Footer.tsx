"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 pt-12 px-5 border-t">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* Navigation & Legal Sections (Left Side) */}
        <div className="flex flex-col md:w-1/2 gap-12 md:gap-24">
          {/* Navigation Links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-800 dark:text-gray-100 text-lg">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#14B8A6]">Home</Link>
              </li>
              <li>
                <Link href="/idea" className="hover:text-[#14B8A6]">Ideas</Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#14B8A6]">About Us</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#14B8A6]">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#14B8A6]">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-800 dark:text-gray-100 text-lg">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-[#14B8A6]">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#14B8A6]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#14B8A6]">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Logo & Contact Info (Right Side) */}
        <div className="flex flex-col items-start md:w-1/3 gap-6 md:gap-12">
          <Link href="/" className="inline-block">
            <Image src={logo} alt="logo" className="h-20 w-auto" />
          </Link>
          <p className="text-sm leading-relaxed">
            Building a greener tomorrow through shared sustainable ideas.
          </p>
          <div className="text-sm space-y-1">
            <p>
              Email:{" "}
              <a
                href="mailto:support@thinkgreenly.com"
                className="hover:text-[#14B8A6]"
              >
                support@thinkgreenly.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                href="tel:+8801234567890"
                className="hover:text-[#14B8A6]"
              >
                +880 1234 567 890
              </a>
            </p>
          </div>
          <div className="flex gap-3 mt-4">
            <Link href="#" className="hover:text-[#14B8A6] transition-transform hover:scale-110">
              <Facebook />
            </Link>
            <Link href="#" className="hover:text-[#14B8A6] transition-transform hover:scale-110">
              <Twitter />
            </Link>
            <Link href="#" className="hover:text-[#14B8A6] transition-transform hover:scale-110">
              <Instagram />
            </Link>
            <Link href="#" className="hover:text-[#14B8A6] transition-transform hover:scale-110">
              <Linkedin />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t pt-6  pb-4 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} GreenMind-HUb. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/terms" className="hover:text-[#14B8A6]">Terms</Link>
          <Link href="/privacy-policy" className="hover:text-[#14B8A6]">Privacy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
