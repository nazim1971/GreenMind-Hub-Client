"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 border-t">
      <div className="max-w-7xl mx-auto px-5 py-12 grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-teal-500">Home</Link></li>
            <li><Link href="/idea" className="hover:text-teal-500">Ideas</Link></li>
            <li><Link href="/about-us" className="hover:text-teal-500">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-teal-500">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-teal-500">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-teal-500">Terms & Conditions</Link></li>
            <li><Link href="#" className="hover:text-teal-500">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-teal-500">FAQ</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Contact</h3>
          <p className="text-sm leading-relaxed mb-4">
            Building a greener tomorrow through shared sustainable ideas.
          </p>
          <div className="text-sm space-y-2">
            <p>Email: <a href="mailto:support@thinkgreenly.com" className="hover:text-teal-500">support@greenmind-hub.com</a></p>
            <p>Phone: <a href="tel:+8801234567890" className="hover:text-teal-500">+880 1234 567 890</a></p>
          </div>
        </div>

        {/* Logo & Social */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="w-fit">
            <Image src={logo} alt="logo" className="h-16 w-auto" />
          </Link>
          <div className="flex gap-3 mt-2">
            <Link href="#" className="hover:text-teal-500 transition hover:scale-110"><Facebook size={20} /></Link>
            <Link href="#" className="hover:text-teal-500 transition hover:scale-110"><Twitter size={20} /></Link>
            <Link href="#" className="hover:text-teal-500 transition hover:scale-110"><Instagram size={20} /></Link>
            <Link href="#" className="hover:text-teal-500 transition hover:scale-110"><Linkedin size={20} /></Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t dark:border-zinc-700 py-4 px-5 text-sm text-center text-gray-600 dark:text-gray-400">
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-3">
          <p>© {new Date().getFullYear()} GreenMind-HUb. All rights reserved.</p>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
