'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Search } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden">
      {/* Background Image with Dark Vignette/Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Banner.png"
          alt="Breathtaking travel destination"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Subtle dark gradient overlay to ensure high contrast text readability */}
        <div className="absolute inset-0 bg-black/35 backdrop-brightness-[0.9]" />
      </div>

      {/* Hero Headline & CTA Actions */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight drop-shadow-sm leading-tight max-w-4xl">
          Discover Your
          <br />
          Next Adventure
        </h1>

        <p className="mt-6 text-sm sm:text-base md:text-lg text-white/90 max-w-2xl font-light leading-relaxed drop-shadow">
          Explore breathtaking destinations and create unforgettable memories with
          our curated travel experiences.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/destinations"
            className="inline-flex items-center gap-2 bg-[#00a2b5] hover:bg-[#008f9f] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase px-6 sm:px-8 py-3.5 rounded shadow-sm transition-all duration-150 transform active:scale-95"
          >
            <span>Explore Now</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="/destinations"
            className="inline-flex items-center text-white bg-white/25 hover:bg-white/35 backdrop-blur-md border border-white/40 text-xs sm:text-sm font-semibold tracking-wider uppercase px-6 sm:px-8 py-3.5 rounded transition-all duration-150 shadow-sm"
          >
            View Destination
          </a>
        </div>
      </div>

      {/* Bottom Search & Filter Bar */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-8 sm:pb-12">
        <div className="bg-neutral-900/60 backdrop-blur-md rounded-lg overflow-hidden border border-white/15 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 shadow-2xl">
          
          {/* Location */}
          <div className="p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-white/10 hover:bg-white/5 transition-colors cursor-pointer">
            <span className="block text-white font-medium text-sm sm:text-[15px]">
              Location
            </span>
            <span className="block text-xs sm:text-sm text-neutral-300 mt-1">
              Address, City Or Zip
            </span>
          </div>

          {/* Date/Duration */}
          <div className="p-4 sm:p-5 border-b sm:border-b-0 md:border-r border-white/10 hover:bg-white/5 transition-colors cursor-pointer">
            <span className="block text-white font-medium text-sm sm:text-[15px]">
              Date/Duration
            </span>
            <span className="block text-xs sm:text-sm text-neutral-300 mt-1">
              Anytime/3 Days
            </span>
          </div>

          {/* Budget */}
          <div className="p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-white/10 hover:bg-white/5 transition-colors cursor-pointer">
            <span className="block text-white font-medium text-sm sm:text-[15px]">
              Budget
            </span>
            <span className="block text-xs sm:text-sm text-neutral-300 mt-1">
              $0-$3000
            </span>
          </div>

          {/* People */}
          <div className="p-4 sm:p-5 border-b sm:border-b-0 md:border-r border-white/10 hover:bg-white/5 transition-colors cursor-pointer">
            <span className="block text-white font-medium text-sm sm:text-[15px]">
              People
            </span>
            <span className="block text-xs sm:text-sm text-neutral-300 mt-1">
              5-10
            </span>
          </div>

          {/* Search Button */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <button
              type="button"
              className="w-full h-full min-h-14 bg-[#00a2b5] hover:bg-[#008f9f] text-white font-medium text-base flex items-center justify-center gap-2 transition-colors px-6"
            >
              <Search className="w-4 h-4 md:hidden" />
              <span>Search</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

