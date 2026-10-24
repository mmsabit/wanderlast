'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="w-full bg-[#0b0c0e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-8">
        
        {/* Brand Header */}
        <div className="space-y-3 mb-12">
          <Link href="/" className="inline-block">
            <Image
              src="/Wanderlast-1.png"
              alt="Wanderlast"
              width={280}
              height={42}
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>
          <p className="text-neutral-400 text-sm sm:text-[15px] font-normal max-w-xl">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        {/* 4 Column Links & Newsletter Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14">
          
          {/* Column 1: Newsletter */}
          <div className="flex flex-col">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 mb-2">
              NEWSLETTER
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
              Subscribe for exclusive travel deals and inspiration.
            </p>

            <form onSubmit={handleSubmit} className="relative flex items-center max-w-[280px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
                className="w-full bg-[#242528] hover:bg-[#2b2c30] focus:bg-[#2b2c30] text-sm text-neutral-100 placeholder-neutral-400 pl-3.5 pr-10 py-2.5 rounded-md outline-none transition-colors border border-transparent focus:border-neutral-600"
              />
              <button
                type="submit"
                aria-label="Submit newsletter subscription"
                className="absolute right-2 text-neutral-300 hover:text-white p-1 transition-colors"
              >
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </button>
            </form>
            {subscribed && (
              <span className="text-xs text-teal-400 mt-2">
                Thank you for subscribing!
              </span>
            )}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 mb-4">
              QUICK LINKS
            </h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-white transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="hover:text-white transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 mb-4">
              SUPPORT
            </h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 mb-4">
              CONTACT US
            </h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <a href="tel:7869011622" className="hover:text-white transition-colors">
                  786 901 1622
                </a>
              </li>
              <li>
                <a href="mailto:info@wandarland.com" className="hover:text-white transition-colors break-all">
                  info@wandarland.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Social Links */}
        <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-neutral-400">
            © 2026 Wanderlust. All rights reserved.
          </p>

          <div className="flex items-center space-x-5 text-neutral-300">
            {/* X (formerly Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className="hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.39 9.74v-8.37H5.07v8.37h2.78z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

