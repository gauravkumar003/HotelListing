import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

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

interface AppliedFiltersProps {
  filters: Filters;
  statusFilters: StatusFilters;
  onRemoveFilter: (filterType: string, value?: string) => void;
}

interface FilterPillProps {
  label: string;
  onRemove: () => void;
}

const formatDate = (date: string) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const FilterPill: React.FC<FilterPillProps> = ({ label, onRemove }) => {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm">
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="p-0.5 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="h-3.5 w-3.5 text-[#0E63B2]" />
      </button>
    </div>
  );
};

interface FilterItem {
  id: string;
  label: string;
  onRemove: () => void;
  timestamp: number;
}

export const AppliedFilters: React.FC<AppliedFiltersProps> = ({
  filters,
  statusFilters,
  onRemoveFilter
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const getAllFilters = (): FilterItem[] => {
    const allFilters: FilterItem[] = [];
    const now = Date.now();

    // Status filters
    Object.entries(statusFilters).forEach(([key, value]) => {
      if (value) {
        allFilters.push({
          id: `status-${key}`,
          label: `Status: ${key.charAt(0).toUpperCase() + key.slice(1)}`,
          onRemove: () => onRemoveFilter('status', key),
          timestamp: now
        });
      }
    });

    // Reference Number
    if (filters.refNo) {
      allFilters.push({
        id: 'refNo',
        label: `Ref No: ${filters.refNo}`,
        onRemove: () => onRemoveFilter('refNo'),
        timestamp: now
      });
    }

    // Booking Methods
    Object.entries(filters.bookingMethods).forEach(([key, value]) => {
      if (value) {
        allFilters.push({
          id: `bookingMethod-${key}`,
          label: `Booking: ${key.charAt(0).toUpperCase() + key.slice(1)}`,
          onRemove: () => onRemoveFilter('bookingMethod', key),
          timestamp: now
        });
      }
    });

    // Agency Categories
    Object.entries(filters.agencyCategories).forEach(([key, value]) => {
      if (value) {
        allFilters.push({
          id: `agencyCategory-${key}`,
          label: `Agency: ${key.charAt(0).toUpperCase() + key.slice(1)}`,
          onRemove: () => onRemoveFilter('agencyCategory', key),
          timestamp: now
        });
      }
    });

    // Hotel Sources
    filters.hotelSources.forEach(source => {
      allFilters.push({
        id: `hotelSource-${source}`,
        label: `Source: ${source}`,
        onRemove: () => onRemoveFilter('hotelSource', source),
        timestamp: now
      });
    });

    // Trip Type
    if (filters.tripType) {
      allFilters.push({
        id: 'tripType',
        label: `Trip: ${filters.tripType.charAt(0).toUpperCase() + filters.tripType.slice(1)}`,
        onRemove: () => onRemoveFilter('tripType'),
        timestamp: now
      });
    }

    // Booking Dates
    if (filters.bookingDateStart || filters.bookingDateEnd) {
      allFilters.push({
        id: 'bookingDates',
        label: `Booking: ${formatDate(filters.bookingDateStart)} - ${formatDate(filters.bookingDateEnd)}`,
        onRemove: () => onRemoveFilter('bookingDates'),
        timestamp: now
      });
    }

    // Check-in Dates
    if (filters.checkInDateStart || filters.checkInDateEnd) {
      allFilters.push({
        id: 'checkInDates',
        label: `Check-in: ${formatDate(filters.checkInDateStart)} - ${formatDate(filters.checkInDateEnd)}`,
        onRemove: () => onRemoveFilter('checkInDates'),
        timestamp: now
      });
    }

    // Hotel Name
    if (filters.hotelName) {
      allFilters.push({
        id: 'hotelName',
        label: `Hotel: ${filters.hotelName}`,
        onRemove: () => onRemoveFilter('hotelName'),
        timestamp: now
      });
    }

    // Agency Name
    if (filters.agencyName) {
      allFilters.push({
        id: 'agencyName',
        label: `Agency: ${filters.agencyName}`,
        onRemove: () => onRemoveFilter('agencyName'),
        timestamp: now
      });
    }

    // Guest Name
    if (filters.guestName) {
      allFilters.push({
        id: 'guestName',
        label: `Guest: ${filters.guestName}`,
        onRemove: () => onRemoveFilter('guestName'),
        timestamp: now
      });
    }

    // Without HCN
    if (filters.withoutHcn) {
      allFilters.push({
        id: 'withoutHcn',
        label: 'Without HCN',
        onRemove: () => onRemoveFilter('withoutHcn'),
        timestamp: now
      });
    }
    
    // Cancellation Date Expired
    if (filters.cancellationDateExpired) {
      allFilters.push({
        id: 'cancellationDateExpired',
        label: 'Last Cancellation Date Expired',
        onRemove: () => onRemoveFilter('cancellationDateExpired'),
        timestamp: now
      });
    }

    return allFilters;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allFilters = getAllFilters();
  if (allFilters.length === 0) return null;

  const visibleFilters = allFilters.slice(0, 3);
  const remainingFilters = allFilters.slice(3);
  const hasMoreFilters = remainingFilters.length > 0;

  return (
    <div className="relative flex items-center gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {visibleFilters.map((filter) => (
          <FilterPill
            key={filter.id}
            label={filter.label}
            onRemove={filter.onRemove}
          />
        ))}
        
        {hasMoreFilters && (
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowTooltip(!showTooltip)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full text-sm"
            >
              +{remainingFilters.length} more
            </button>
            
            {showTooltip && (
              <div
                ref={tooltipRef}
                className="absolute z-50 top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[200px] max-w-[300px]"
              >
                <div className="space-y-2">
                  {remainingFilters.map((filter) => (
                    <div key={filter.id} className="flex items-center justify-between gap-2">
                      <span className="text-sm text-gray-700">{filter.label}</span>
                      <button
                        onClick={filter.onRemove}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="h-3.5 w-3.5 text-[#0E63B2]" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};