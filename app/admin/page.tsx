'use client';

import React, { useState } from 'react';
import { Trash2, Save, ChevronDown, CheckCircle2 } from 'lucide-react';

interface TravelPackageFormData {
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

const initialFormState: TravelPackageFormData = {
  destinationName: '',
  country: '',
  category: 'Beach',
  price: '',
  duration: '',
  departureDate: '',
  imageUrl: '',
  description: '',
};

export default function AdminPage() {
  const [formData, setFormData] = useState<TravelPackageFormData>(initialFormState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCancelNotice, setShowCancelNotice] = useState(false);

  const categories = [
    'Beach',
    'Mountain',
    'Adventure',
    'Cultural',
    'City Tour',
    'Wildlife & Safari',
    'Cruise',
    'Luxury',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setShowCancelNotice(true);
    setTimeout(() => setShowCancelNotice(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData(initialFormState);
    }, 3500);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-[44px] font-serif font-normal text-neutral-900 tracking-tight mb-8 sm:mb-12">
          Add New Travel Package
        </h1>

        {/* Success Alert */}
        {isSubmitted && (
          <div className="max-w-2xl mx-auto mb-6 p-4 rounded-md bg-teal-50 border border-teal-200 text-teal-800 flex items-center gap-3 text-sm animate-in fade-in duration-200">
            <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
            <span>Travel package has been successfully added!</span>
          </div>
        )}

        {/* Cancel Notice */}
        {showCancelNotice && (
          <div className="max-w-2xl mx-auto mb-6 p-3.5 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-700 text-sm animate-in fade-in duration-200">
            Form cleared.
          </div>
        )}

        {/* Form Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg border border-neutral-200/70 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Destination Name */}
            <div>
              <label
                htmlFor="destinationName"
                className="block text-sm font-medium text-neutral-800 mb-1.5"
              >
                Destination Name
              </label>
              <input
                type="text"
                id="destinationName"
                name="destinationName"
                value={formData.destinationName}
                onChange={handleChange}
                placeholder="Bali Paradise"
                required
                className="w-full bg-[#f8f9fa] border border-neutral-200/80 rounded-md px-3.5 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-[#00a2b5] focus:ring-1 focus:ring-[#00a2b5] transition-all"
              />
            </div>

            {/* Country & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-neutral-800 mb-1.5"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Indonesia"
                  required
                  className="w-full bg-[#f8f9fa] border border-neutral-200/80 rounded-md px-3.5 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-[#00a2b5] focus:ring-1 focus:ring-[#00a2b5] transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-neutral-800 mb-1.5"
                >
                  Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full appearance-none bg-[#f8f9fa] border border-neutral-200/80 rounded-md px-3.5 py-2.5 pr-10 text-sm text-neutral-800 focus:outline-none focus:bg-white focus:border-[#00a2b5] focus:ring-1 focus:ring-[#00a2b5] transition-all cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none stroke-[2]" />
                </div>
              </div>
            </div>

            {/* Price (USD) & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-neutral-800 mb-1.5"
                >
                  Price (USD)
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 1299"
                  required
                  className="w-full bg-[#f8f9fa] border border-neutral-200/80 rounded-md px-3.5 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-[#00a2b5] focus:ring-1 focus:ring-[#00a2b5] transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-neutral-800 mb-1.5"
                >
                  Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 7 Days/6 Nights"
                  required
                  className="w-full bg-[#f8f9fa] border border-neutral-200/80 rounded-md px-3.5 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-[#00a2b5] focus:ring-1 focus:ring-[#00a2b5] transition-all"
                />
              </div>
            </div>

            {/* Departure Date */}
            <div>
              <label
                htmlFor="departureDate"
                className="block text-sm font-medium text-neutral-800 mb-1.5"
              >
                Departure Date
              </label>
              <input
                type="text"
                id="departureDate"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                placeholder="mm/dd/yyyy"
                required
                className="w-full bg-[#f8f9fa] border border-neutral-200/80 rounded-md px-3.5 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-[#00a2b5] focus:ring-1 focus:ring-[#00a2b5] transition-all"
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-neutral-800 mb-1.5"
              >
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
                className="w-full bg-[#f8f9fa] border border-neutral-200/80 rounded-md px-3.5 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-[#00a2b5] focus:ring-1 focus:ring-[#00a2b5] transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-neutral-800 mb-1.5"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the travel experience..."
                required
                className="w-full bg-[#f8f9fa] border border-neutral-200/80 rounded-md px-3.5 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-[#00a2b5] focus:ring-1 focus:ring-[#00a2b5] transition-all resize-y"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-rose-300 hover:border-rose-400 bg-white hover:bg-rose-50 text-rose-500 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-rose-200"
              >
                <Trash2 className="w-4 h-4 stroke-[1.8]" />
                <span>Cancel</span>
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00a2b5] hover:bg-[#008f9f] text-white rounded text-sm font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00a2b5]/40"
              >
                <Save className="w-4 h-4 stroke-[1.8]" />
                <span>Add Travel Package</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}

