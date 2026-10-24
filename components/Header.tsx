'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { User, Menu, X } from 'lucide-react';

interface HeaderProps {
  activePath?: string;
}

export default function Header({ activePath }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = activePath ?? pathname;

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'My Bookings', href: '/bookings' },
    { label: 'Admin', href: '/admin' },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.href ||
                (link.href !== '/' && currentPath?.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[15px] font-medium transition-colors ${
                    isActive
                      ? 'text-[#0891b2] font-semibold'
                      : 'text-neutral-700 hover:text-neutral-900'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Center Logo */}
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/Wanderlast.png"
                alt="Wanderlast"
                width={170}
                height={26}
                priority
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Right Action Items (Desktop) */}
          <div className="hidden md:flex items-center space-x-7">
            <Link
              href="/profile"
              className="flex items-center gap-1.5 text-[15px] font-medium text-neutral-800 hover:text-black transition-colors"
            >
              <User className="w-4 h-4 stroke-[2]" />
              <span>Profile</span>
            </Link>

            <Link
              href="/login"
              className="text-[15px] font-medium text-neutral-800 hover:text-black transition-colors"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="text-[15px] font-medium text-neutral-800 hover:text-black transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors focus:outline-none"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md px-5 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1 py-2">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.href ||
                (link.href !== '/' && currentPath?.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'text-[#0891b2] bg-cyan-50/70 font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-gray-200/80 pt-4 mt-2 space-y-2">
            <Link
              href="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-medium text-neutral-800 hover:bg-neutral-50"
            >
              <User className="w-4 h-4 stroke-[2]" />
              <span>Profile</span>
            </Link>

            <div className="flex items-center gap-3 px-3 pt-2">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center py-2 px-4 rounded-md border border-neutral-300 text-neutral-800 text-sm font-medium hover:bg-neutral-50"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center py-2 px-4 rounded-md bg-[#0891b2] text-white text-sm font-medium hover:bg-[#0e7490] transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

