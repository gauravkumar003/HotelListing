import React from 'react';
import { Filter, Search } from 'lucide-react';
import { ReferenceFilter } from './ReferenceFilter';
import { StatusFilter } from './StatusFilter';
import { BookingMethodFilter } from './BookingMethodFilter';
import { TripTypeFilter } from './TripTypeFilter';
import { DateRangeFilter } from './DateRangeFilter';
import { SearchFilter } from './SearchFilter';
import { AgencyCategoryFilter } from './AgencyCategoryFilter';
import { HotelSourceFilter } from './HotelSourceFilter';
import { Building2, Hotel, User } from 'lucide-react';

interface Filters {
  refNo: string;
  bookingMethods: {
    online: boolean;
    manual: boolean;
  };
  agencyCategories: {
    large: boolean;
    managed: boolean;
    value: boolean;
  };
  hotelSource: string;
  hotelSources: string[];
  tripType: string;
  bookingDateStart: string;
  bookingDateEnd: string;
  checkInDateStart: string;
  checkInDateEnd: string;
  hotelName: string;
  agencyName: string;
  guestName: string;
  withoutHcn: boolean;
  cancellationDateExpired: boolean;
}

interface StatusFilters {
  confirmed: boolean;
  pending: boolean;
  cancelled: boolean;
  vouchered: boolean;
}

interface FilterContainerProps {
  filters: Filters;
  statusFilters: StatusFilters;
  onFilterChange: (key: keyof Omit<Filters, 'bookingMethods' | 'agencyCategories' | 'hotelSources'>, value: string | boolean) => void;
  onStatusFilterChange: (key: keyof StatusFilters, value: boolean) => void;
  onBookingMethodChange: (method: keyof Filters['bookingMethods']) => void;
  onAgencyCategoryChange: (category: keyof Filters['agencyCategories']) => void;
  onHotelSourcesChange: (sources: string[]) => void;
  onClearFilters: () => void;
  bookings: Array<{
    id: string;
    agencyName: string;
    hotelName: string;
    status: string;
    lastVoucherDate: string;
    lastCancellationDate: string;
    hotelConfNo: string;
    confNo: string;
    refNo: string;
    leadGuestName: string;
    bookedTimestamp: string;
    numberOfGuests: number;
    numberOfRooms: number;
    checkInDate: string;
    checkOutDate: string;
    numberOfNights: number;
  }>;
}

export const FilterContainer: React.FC<FilterContainerProps> = ({
  filters,
  statusFilters,
  onFilterChange,
  onStatusFilterChange,
  onBookingMethodChange,
  onAgencyCategoryChange,
  onHotelSourcesChange,
  onClearFilters,
  bookings
}) => {
  const handleSubmitFilters = () => {
    // This would typically trigger a search or filter action
    // For now, we'll just log the current filters
    console.log('Submitting filters:', { filters, statusFilters });
  };

  return (
    <div className="w-full lg:w-80 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-sm lg:sticky lg:top-28 border border-[#D9E2F0]">
        {/* Only show header in desktop view */}
        <div className="hidden lg:block bg-[#E8ECF7] px-4 py-3 border-b border-[#D9E2F0] rounded-t-lg">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <h2 className="text-base font-medium text-gray-900">Common Filters</h2>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* 1. Ref No */}
          <ReferenceFilter
            value={filters.refNo}
            onChange={(value) => onFilterChange('refNo', value)}
          />

          {/* 2. Status */}
          <StatusFilter
            filters={statusFilters}
            onChange={onStatusFilterChange}
          />

          <div className="h-px bg-gray-200" />

          {/* 3. Booking Method */}
          <BookingMethodFilter
            methods={filters.bookingMethods}
            onChange={onBookingMethodChange}
          />

          {/* 4. Show Hotel Sources */}
          <HotelSourceFilter
            selectedSources={filters.hotelSources}
            onChange={onHotelSourcesChange}
          />
          
          {/* 5. Trip Type */}
          <TripTypeFilter
            value={filters.tripType}
            onChange={(value) => onFilterChange('tripType', value)}
          />

          {/* 6. Booking without HCN */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.withoutHcn}
              onChange={(e) => onFilterChange('withoutHcn', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              Booking without HCN
            </span>
          </label>
          
          {/* 7. Last Cancellation Date Expired */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.cancellationDateExpired}
              onChange={(e) => onFilterChange('cancellationDateExpired', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              Last Cancellation Date Expired
            </span>
          </label>

          {/* 8. Agency Category */}
          <AgencyCategoryFilter
            categories={filters.agencyCategories}
            onChange={onAgencyCategoryChange}
          />

          {/* Special Filters Section */}
          <div className="mt-6 -mb-2">
            <div className="bg-[#E8ECF7] mx-[-16px] px-4 py-3 border-y border-[#D9E2F0]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <h2 className="text-base font-medium text-gray-900">Special Filters</h2>
              </div>
            </div>
          </div>

          {/* Combined Hotel Name and Booking Dates Block */}
          <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
            {/* 9. Hotel Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.hotelName}
                  onChange={(e) => onFilterChange('hotelName', e.target.value)}
                  className="w-full h-10 pl-9 pr-3 text-sm rounded-sm border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search hotels..."
                />
                <Hotel className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* 10. Booking Dates */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Booking Dates</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">From</label>
                  <input
                    type="date"
                    value={filters.bookingDateStart}
                    onChange={(e) => onFilterChange('bookingDateStart', e.target.value)}
                    className="w-full h-9 px-2 text-sm rounded-sm border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    style={{ minWidth: "100%", width: "100%" }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">To</label>
                  <input
                    type="date"
                    value={filters.bookingDateEnd}
                    onChange={(e) => onFilterChange('bookingDateEnd', e.target.value)}
                    className="w-full h-9 px-2 text-sm rounded-sm border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    style={{ minWidth: "100%", width: "100%" }}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitFilters}
              className="w-full h-10 bg-[#0E63B2] hover:bg-[#0d5aa3] text-white font-medium rounded-sm transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Search className="h-4 w-4" />
              Submit
            </button>
          </div>

          {/* Combined Agency Name, Check-in Dates, and Guest Name Block - REARRANGED */}
          <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
            {/* 11. Agency Name - MOVED TO FIRST POSITION */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Agency Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.agencyName}
                  onChange={(e) => onFilterChange('agencyName', e.target.value)}
                  className="w-full h-10 pl-9 pr-3 text-sm rounded-sm border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search agencies..."
                />
                <Building2 className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* 12. Check-in Dates - MOVED TO SECOND POSITION */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Dates</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">From</label>
                  <input
                    type="date"
                    value={filters.checkInDateStart}
                    onChange={(e) => onFilterChange('checkInDateStart', e.target.value)}
                    className="w-full h-9 px-2 text-sm rounded-sm border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    style={{ minWidth: "100%", width: "100%" }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">To</label>
                  <input
                    type="date"
                    value={filters.checkInDateEnd}
                    onChange={(e) => onFilterChange('checkInDateEnd', e.target.value)}
                    className="w-full h-9 px-2 text-sm rounded-sm border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    style={{ minWidth: "100%", width: "100%" }}
                  />
                </div>
              </div>
            </div>

            {/* 13. Guest Name - MOVED TO THIRD POSITION */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Guest Name</label>
              <div className="relative">
                 <input
                  type="text"
                  value={filters.guestName}
                  onChange={(e) => onFilterChange('guestName', e.target.value)}
                  className="w-full h-10 pl-9 pr-3 text-sm rounded-sm border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search guests..."
                />
                <User className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitFilters}
              className="w-full h-10 bg-[#0E63B2] hover:bg-[#0d5aa3] text-white font-medium rounded-sm transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Search className="h-4 w-4" />
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};