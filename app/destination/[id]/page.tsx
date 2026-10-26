
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Pencil,
  Trash2,
  MapPin,
  Star,
  Calendar,
  Check,
  ArrowRight,
} from 'lucide-react';



export default async function DestinationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
//   const destination = {
//     title: 'Bali Paradise',
//     country: 'Indonesia',
//     rating: 4.9,
//     reviewsCount: 234,
//     duration: '7 Days / 6 Nights',
//     price: 1299,
//     departureDate: '05/15/2026',
//     imageUrl:
//       'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80',
//     overview:
//       'Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.',
    
//     features: [
//       'Free cancellation up to 7 days',
//       'Travel insurance included',
//       '24/7 customer support',
//     ],
//   };


const features = [
      'Free cancellation up to 7 days',
      'Travel insurance included',
      '24/7 customer support',
    ]

const { id } = await params;

const res = await fetch(`http://localhost:8000/destination/${id}`)
const destination = await res.json();


  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between pb-6">
          <Link
            href="/destination"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Destinations</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-neutral-300 rounded-md text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition-colors shadow-xs"
            >
              <Pencil className="w-4 h-4 text-neutral-700" />
              <span>Edit</span>
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-500 hover:bg-red-50 hover:border-red-400 transition-colors shadow-xs"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
              <span>Cancel</span>
            </button>
          </div>
        </div>

        {/* Hero Banner Image */}
        <div className="relative w-full aspect-21/9 sm:aspect-24/9 md:aspect-[2.6/1] rounded-lg overflow-hidden mb-10 shadow-xs bg-neutral-100">
          <Image
            src={destination.imageUrl}
            alt={destination.destinationName}
            fill
            priority
            unoptimized
            className="object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>

        {/* Main Content Layout: Left Details, Right Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column */}
          <div className="lg:col-span-8">
            {/* Country */}
            <div className="flex items-center gap-1.5 text-neutral-500 text-sm mb-2.5">
              <MapPin className="w-4 h-4 stroke-[1.6]" />
              <span className="font-normal">{destination.country}</span>
            </div>

            {/* Destination Name */}
            <h1 className="text-3xl sm:text-4xl md:text-[44px] font-serif font-normal text-neutral-900 tracking-tight leading-tight mb-4">
              {destination.title}
            </h1>

            {/* Rating and Duration */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-sm text-neutral-800 mb-9 pb-1">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-emerald-500 text-emerald-500 stroke-none" />
                <span className="font-semibold text-neutral-900">
                  4.9
                </span>
                <span className="text-neutral-500 font-normal">
                  234
                </span>
              </div>

              <div className="flex items-center gap-2 text-neutral-700">
                <Calendar className="w-4 h-4 stroke-[1.6] text-neutral-700" />
                <span className="font-medium text-neutral-900">
                  {destination.duration}
                </span>
              </div>
            </div>

            {/* Overview Section */}
            <div className="mb-9">
              <h2 className="text-2xl font-serif font-normal text-neutral-900 mb-3 tracking-tight">
                Overview
              </h2>
              <p className="text-neutral-600 text-sm sm:text-[15px] leading-relaxed">
                {destination.description}
              </p>
            </div>            
          </div>

          {/* Right Column (Booking Card) */}
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <div className="bg-white border border-neutral-200/90 rounded-lg p-6 sm:p-7 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
              {/* Starting From & Price */}
              <div className="mb-5">
                <p className="text-xs sm:text-[13px] text-neutral-500 mb-1">
                  Starting from
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-bold text-[#00a2b5] tracking-tight">
                    ${destination.price}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">per person</p>
              </div>

              {/* Date Box */}
              <div className="mb-4">
                <div className="w-full bg-[#f8f9fa] border border-neutral-200 rounded-md px-4 py-3 text-sm text-neutral-800 font-medium">
                  {destination.departureDate}
                </div>
              </div>

              {/* Book Now Button */}
              <button
                type="button"
                className="w-full bg-[#00a2b5] hover:bg-[#008f9f] text-white font-medium py-3 px-4 rounded-md flex items-center justify-center gap-2 text-sm transition-colors shadow-xs cursor-pointer"
              >
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4 stroke-2" />
              </button>

              {/* Perks List */}
              <div className="mt-5 pt-1 space-y-2.5 text-xs sm:text-[13px] text-neutral-600">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
