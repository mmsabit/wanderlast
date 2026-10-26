'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Calendar,
  ArrowUpRight,
  ChevronDown,
  Star,
  SlidersHorizontal,
  Loader2,
  AlertCircle,
} from 'lucide-react';

interface DestinationItem {
  id: string | number;
  _id?: string;
  title: string;
  destinationName?: string;
  country: string;
  price: number;
  duration: string;
  rating: number;
  category: string;
  imageUrl: string;
  departureDate?: string;
  description?: string;
}

interface DestinationApiItem {
  _id?: string;
  id?: string | number;
  title?: string;
  destinationName?: string;
  country?: string;
  price?: string | number;
  duration?: string;
  rating?: string | number;
  category?: string;
  imageUrl?: string;
  departureDate?: string;
  description?: string;
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<DestinationItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [selectedSort, setSelectedSort] = useState<string>('Featured');

  const [activeDropdown, setActiveDropdown] = useState<'category' | 'price' | 'sort' | null>(null);

  const filterBarRef = useRef<HTMLDivElement>(null);

  // Fetch destinations from API
  const fetchDestinations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('http://localhost:8000/destination');
      if (!res.ok) {
        throw new Error(`Failed to load destinations (${res.status})`);
      }
      const data = await res.json();
      const formatted: DestinationItem[] = (Array.isArray(data) ? data as DestinationApiItem[] : []).map(
        (item, index) => ({
          id: item._id || item.id || String(index),
          _id: item._id,
          title: item.title || item.destinationName || 'Untitled Package',
          country: item.country || '',
          price:
            typeof item.price === 'string'
              ? parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0
              : Number(item.price) || 0,
          duration: item.duration || '',
          rating: Number(item.rating) || 4.8,
          category: item.category || 'Other',
          imageUrl: item.imageUrl || '',
          departureDate: item.departureDate,
          description: item.description || '',
        })
      );
      setDestinations(formatted);
    } catch (err: unknown) {
      console.error('Fetch destinations error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch destinations');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void Promise.resolve().then(() => fetchDestinations());
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterBarRef.current && !filterBarRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    'All',
    'Beach',
    'Mountain',
    'Adventure',
    'Cultural',
    'City Tour',
    'Wildlife & Safari',
    'Cruise',
    'Luxury',
  ];
  const priceRanges = ['All', 'Under $2,000', '$2,000 - $3,000', 'Over $3,000'];
  const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Highest Rated'];

  // Filter & Sort Logic
  const filteredDestinations = destinations
    .filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedPriceRange === 'Under $2,000' && item.price >= 2000) return false;
      if (selectedPriceRange === '$2,000 - $3,000' && (item.price < 2000 || item.price > 3000))
        return false;
      if (selectedPriceRange === 'Over $3,000' && item.price <= 3000) return false;
      return true;
    })
    .sort((a, b) => {
      if (selectedSort === 'Price: Low to High') return a.price - b.price;
      if (selectedSort === 'Price: High to Low') return b.price - a.price;
      if (selectedSort === 'Highest Rated') return b.rating - a.rating;
      return String(a.id).localeCompare(String(b.id));
    });

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title & Subtitle */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-5xl md:text-[54px] font-normal tracking-tight text-neutral-900 leading-tight">
            Explore All Destinations
          </h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-500 font-normal">
            Find your perfect travel experience from our curated collection
          </p>
        </div>

        {/* Filter and Sort Bar */}
        <div
          ref={filterBarRef}
          className="relative border border-neutral-300 rounded-sm grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-300 bg-white"
        >
          {/* CATEGORY DROPDOWN */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setActiveDropdown(activeDropdown === 'category' ? null : 'category')
              }
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-neutral-50/60 focus:outline-none"
            >
              <div className="flex flex-col">
                <span className="text-xs sm:text-[13px] font-medium tracking-wider text-neutral-500 uppercase">
                  CATEGORY
                </span>
                {selectedCategory !== 'All' && (
                  <span className="text-xs font-semibold text-[#00a2b5] mt-0.5">
                    {selectedCategory}
                  </span>
                )}
              </div>
              <ChevronDown
                className={`w-4 h-4 text-neutral-400 stroke-[1.8] transition-transform duration-200 ${
                  activeDropdown === 'category' ? 'rotate-180 text-neutral-700' : ''
                }`}
              />
            </button>

            {activeDropdown === 'category' && (
              <div className="absolute top-full left-0 z-30 w-full md:w-64 bg-white border border-neutral-200 shadow-xl rounded-sm py-2 mt-1 animate-in fade-in duration-150">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setActiveDropdown(null);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-teal-50 text-[#00a2b5] font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{cat === 'All' ? 'All Categories' : cat}</span>
                    {selectedCategory === cat && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PRICE RANGE DROPDOWN */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setActiveDropdown(activeDropdown === 'price' ? null : 'price')
              }
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-neutral-50/60 focus:outline-none"
            >
              <div className="flex flex-col">
                <span className="text-xs sm:text-[13px] font-medium tracking-wider text-neutral-500 uppercase">
                  PRICE RANGE
                </span>
                {selectedPriceRange !== 'All' && (
                  <span className="text-xs font-semibold text-[#00a2b5] mt-0.5">
                    {selectedPriceRange}
                  </span>
                )}
              </div>
              <ChevronDown
                className={`w-4 h-4 text-neutral-400 stroke-[1.8] transition-transform duration-200 ${
                  activeDropdown === 'price' ? 'rotate-180 text-neutral-700' : ''
                }`}
              />
            </button>

            {activeDropdown === 'price' && (
              <div className="absolute top-full left-0 z-30 w-full md:w-64 bg-white border border-neutral-200 shadow-xl rounded-sm py-2 mt-1 animate-in fade-in duration-150">
                {priceRanges.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => {
                      setSelectedPriceRange(range);
                      setActiveDropdown(null);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                      selectedPriceRange === range
                        ? 'bg-teal-50 text-[#00a2b5] font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{range === 'All' ? 'All Prices' : range}</span>
                    {selectedPriceRange === range && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SORT BY DROPDOWN */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')
              }
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-neutral-50/60 focus:outline-none"
            >
              <div className="flex flex-col">
                <span className="text-xs sm:text-[13px] font-medium tracking-wider text-neutral-500 uppercase">
                  SORT BY
                </span>
                {selectedSort !== 'Featured' && (
                  <span className="text-xs font-semibold text-[#00a2b5] mt-0.5">
                    {selectedSort}
                  </span>
                )}
              </div>
              <ChevronDown
                className={`w-4 h-4 text-neutral-400 stroke-[1.8] transition-transform duration-200 ${
                  activeDropdown === 'sort' ? 'rotate-180 text-neutral-700' : ''
                }`}
              />
            </button>

            {activeDropdown === 'sort' && (
              <div className="absolute top-full right-0 z-30 w-full md:w-64 bg-white border border-neutral-200 shadow-xl rounded-sm py-2 mt-1 animate-in fade-in duration-150">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedSort(opt);
                      setActiveDropdown(null);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                      selectedSort === opt
                        ? 'bg-teal-50 text-[#00a2b5] font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{opt}</span>
                    {selectedSort === opt && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status / Showing Count */}
        <div className="flex items-center justify-between mt-5 mb-8">
          <p className="text-sm sm:text-[15px] text-neutral-600 font-normal">
            Showing {filteredDestinations.length} destinations
          </p>

          {(selectedCategory !== 'All' ||
            selectedPriceRange !== 'All' ||
            selectedSort !== 'Featured') && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedPriceRange('All');
                setSelectedSort('Featured');
              }}
              className="text-xs text-[#00a2b5] hover:text-[#008f9f] font-medium underline underline-offset-4"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#00a2b5] animate-spin" />
            <p className="text-neutral-500 text-sm">Loading destinations...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="py-12 px-6 text-center border border-red-200 bg-red-50/50 rounded-lg max-w-lg mx-auto">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <h3 className="text-base font-semibold text-neutral-800">Failed to Load Destinations</h3>
            <p className="text-sm text-neutral-600 mt-1 mb-4">{error}</p>
            <button
              type="button"
              onClick={fetchDestinations}
              className="px-4 py-2 bg-[#00a2b5] text-white text-xs font-medium rounded hover:bg-[#008f9f] transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State if no destination matches */}
        {!isLoading && !error && filteredDestinations.length === 0 && (
          <div className="py-16 text-center border border-dashed border-neutral-300 rounded-lg">
            <SlidersHorizontal className="w-10 h-10 mx-auto text-neutral-400 stroke-1 mb-3" />
            <h3 className="text-lg font-medium text-neutral-800">No destinations found</h3>
            <p className="text-sm text-neutral-500 mt-1 max-w-md mx-auto">
              Try adjusting your category or price range filters to find matching travel experiences.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedPriceRange('All');
                setSelectedSort('Featured');
              }}
              className="mt-4 px-4 py-2 bg-[#00a2b5] text-white text-xs font-medium rounded hover:bg-[#008f9f] transition-colors"
            >
              Show All Destinations
            </button>
          </div>
        )}

        {/* Destinations Grid (3 columns on desktop) */}
        {!isLoading && !error && filteredDestinations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredDestinations.map((item) => (
              <div key={item.id} className="group flex flex-col">
              
              {/* Destination Card Image with Rating Badge */}
              <div className="relative w-full aspect-16/10 overflow-hidden bg-neutral-100 rounded-none sm:rounded-sm">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Rating Badge */}
                <div className="absolute top-3.5 right-3.5 z-10 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-sm shadow-sm flex items-center gap-1">
                  <span className="text-xs sm:text-[13px] font-semibold text-neutral-900 leading-none">
                    {item.rating.toFixed(1)}
                  </span>
                  <Star className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900 stroke-none" />
                </div>
              </div>

              {/* Destination Information */}
              <div className="pt-4 flex flex-col flex-1">
                
                {/* Location */}
                <div className="flex items-center gap-1.5 text-neutral-600 mb-1.5">
                  <MapPin className="w-4 h-4 stroke-[1.6] shrink-0" />
                  <span className="text-xs sm:text-[13px] font-normal tracking-wide">
                    {item.country}
                  </span>
                </div>

                {/* Title & Price Row */}
                <div className="flex items-baseline justify-between gap-3 mb-1.5">
                  <h3 className="text-xl sm:text-[22px] font-normal text-neutral-900 tracking-tight">
                    {item.title}
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="text-lg sm:text-xl font-semibold text-neutral-900">
                      ${item.price}
                    </span>
                    <span className="text-xs sm:text-[13px] text-neutral-500 font-normal">
                      /Person
                    </span>
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-1.5 text-neutral-600 mb-3.5">
                  <Calendar className="w-4 h-4 stroke-[1.6] shrink-0" />
                  <span className="text-xs sm:text-[13px] font-normal">
                    {item.duration}
                  </span>
                </div>

                {/* Book Now Action */}
                <div className="mt-auto pt-1">
                  <Link
                    href={`/destination/${item.id}`}
                    className="inline-flex items-center gap-1 text-[#00a2b5] hover:text-[#008f9f] text-xs font-semibold tracking-wider uppercase underline underline-offset-4 decoration-1 transition-colors group/btn"
                  >
                    <span>BOOK NOW</span>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.4] transition-transform duration-150 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      </div>
    </div>
  );
}
