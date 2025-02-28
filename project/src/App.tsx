import React, { useState, useEffect, useRef } from 'react';
import BookingCard from './components/BookingCard';
import { FilterContainer } from './components/filters/FilterContainer';
import { AppliedFilters } from './components/filters/AppliedFilters';
import { Header } from './components/Header';
import { Filter, X, Download } from 'lucide-react';
import { NotificationSection } from './components/NotificationSection';
import { SortingDropdown, SortOption } from './components/filters/SortingDropdown';
import { Pagination } from './components/Pagination';
import * as XLSX from 'xlsx';

interface Booking {
  id: string;
  agencyName: string;
  hotelName: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Vouchered';
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
}

interface StatusFilters {
  confirmed: boolean;
  pending: boolean;
  cancelled: boolean;
  vouchered: boolean;
}

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

function App() {
  const generateSampleBookings = () => {
    const hotels = [
      'Mandarin Oriental Tokyo Premier Suite Palace, Tokyo Japan',
      'The Ritz-Carlton Grand Cayman Seven Mile Beach Resort & Residences',
      'InterContinental Maldives Maamunagau Resort, an IHG Hotel',
      'Waldorf Astoria Dubai Palm Jumeirah with All-Inclusive Premium Package',
      'The Peninsula Bangkok Luxury River View Suite with Helicopter Transfer',
      'Four Seasons Resort Bora Bora Overwater Villa with Mount Otemanu View',
      'Burj Al Arab Jumeirah Dubai Royal Two Bedroom Suite',
      'Atlantis The Royal Dubai Grand Ultra Luxury Suite',
      'Raffles Singapore Presidential Suite with Butler Service',
      'Aman Tokyo Premier Room with City View'
    ];

    const agencies = [
      { name: 'Global Travel Solutions', type: 'large' },
      { name: 'Sunset Travels', type: 'managed' },
      { name: 'Mountain Expeditions', type: 'value' },
      { name: 'Luxury Escapes', type: 'large' }
    ];

    const guests = [
      'John Smith',
      'Sarah Johnson',
      'Michael Brown',
      'Emma Wilson',
      'David Chen',
      'Sophie Martinez',
      'James Taylor',
      'Isabella Kim',
      'William Davis',
      'Olivia Garcia'
    ];

    return Array.from({ length: 100 }, (_, index) => {
      const checkInDate = new Date(2024, 3 + Math.floor(index / 20), 1 + (index % 20));
      const numberOfNights = 3 + Math.floor(Math.random() * 5);
      const checkOutDate = new Date(checkInDate);
      checkOutDate.setDate(checkOutDate.getDate() + numberOfNights);
      
      const bookedDate = new Date(checkInDate);
      bookedDate.setDate(bookedDate.getDate() - 30 - Math.floor(Math.random() * 30));
      
      const lastVoucherDate = new Date(checkInDate);
      lastVoucherDate.setDate(lastVoucherDate.getDate() - 5);
      
      const lastCancellationDate = new Date(checkInDate);
      lastCancellationDate.setDate(lastCancellationDate.getDate() - 7);

      const hotelIndex = index % hotels.length;
      const agencyIndex = index % agencies.length;
      const guestIndex = index % guests.length;

      const isSpecialBooking = index === 0;

      return {
        id: (index + 1).toString(),
        agencyName: agencies[agencyIndex].name,
        hotelName: hotels[hotelIndex],
        status: ['Confirmed', 'Pending', 'Vouchered', 'Vouchered'][Math.floor(Math.random() * 4)] as 'Confirmed' | 'Pending' | 'Cancelled' | 'Vouchered',
        lastVoucherDate: lastVoucherDate.toISOString().split('T')[0],
        lastCancellationDate: lastCancellationDate.toISOString().split('T')[0],
        hotelConfNo: isSpecialBooking ? '99467216,99467234,99467222,99467219,99467221' : `HCN${(index + 1).toString().padStart(6, '0')}`,
        confNo: `CNF${(index + 1).toString().padStart(6, '0')}`,
        refNo: isSpecialBooking ? '419800775,419800779,419800783,419800786,419800791' : `REF${(index + 1).toString().padStart(6, '0')}`,
        leadGuestName: guests[guestIndex],
        bookedTimestamp: bookedDate.toISOString(),
        numberOfGuests: 1 + Math.floor(Math.random() * 4),
        numberOfRooms: 1 + Math.floor(Math.random() * 2),
        checkInDate: checkInDate.toISOString().split('T')[0],
        checkOutDate: checkOutDate.toISOString().split('T')[0],
        numberOfNights
      };
    });
  };

  const [bookings] = useState<Booking[]>(generateSampleBookings());

  const [statusFilters, setStatusFilters] = useState<StatusFilters>({
    confirmed: true,
    pending: true,
    cancelled: false,
    vouchered: true
  });

  const [filters, setFilters] = useState<Filters>({
    refNo: '',
    bookingMethods: {
      online: false,
      manual: false
    },
    agencyCategories: {
      large: false,
      managed: false,
      value: false
    },
    hotelSource: '',
    hotelSources: [],
    tripType: '',
    bookingDateStart: '',
    bookingDateEnd: '',
    checkInDateStart: '',
    checkInDateEnd: '',
    hotelName: '',
    agencyName: '',
    guestName: '',
    withoutHcn: false,
    cancellationDateExpired: false
  });

  const [sortBy, setSortBy] = useState<SortOption>('bookingDate');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const filterPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterPanelRef.current && !filterPanelRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFilterOpen]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, statusFilters, sortBy]);

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
  };

  const handleFilterChange = (key: keyof Omit<Filters, 'bookingMethods' | 'agencyCategories' | 'hotelSources'>, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleStatusFilterChange = (key: keyof StatusFilters, value: boolean) => {
    setStatusFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleBookingMethodChange = (method: keyof Filters['bookingMethods']) => {
    setFilters(prev => ({
      ...prev,
      bookingMethods: {
        ...prev.bookingMethods,
        [method]: !prev.bookingMethods[method]
      }
    }));
  };

  const handleAgencyCategoryChange = (category: keyof Filters['agencyCategories']) => {
    setFilters(prev => ({
      ...prev,
      agencyCategories: {
        ...prev.agencyCategories,
        [category]: !prev.agencyCategories[category]
      }
    }));
  };

  const handleHotelSourcesChange = (sources: string[]) => {
    setFilters(prev => ({ ...prev, hotelSources: sources }));
  };

  const handleRemoveFilter = (filterType: string, value?: string) => {
    switch (filterType) {
      case 'status':
        if (value) {
          setStatusFilters(prev => ({ ...prev, [value]: false }));
        }
        break;
      case 'bookingMethod':
        if (value) {
          setFilters(prev => ({
            ...prev,
            bookingMethods: { ...prev.bookingMethods, [value]: false }
          }));
        }
        break;
      case 'agencyCategory':
        if (value) {
          setFilters(prev => ({
            ...prev,
            agencyCategories: { ...prev.agencyCategories, [value]: false }
          }));
        }
        break;
      case 'hotelSource':
        if (value) {
          setFilters(prev => ({
            ...prev,
            hotelSources: prev.hotelSources.filter(source => source !== value)
          }));
        }
        break;
      case 'bookingDates':
        setFilters(prev => ({ ...prev, bookingDateStart: '', bookingDateEnd: '' }));
        break;
      case 'checkInDates':
        setFilters(prev => ({ ...prev, checkInDateStart: '', checkInDateEnd: '' }));
        break;
      default:
        setFilters(prev => ({ ...prev, [filterType]: '' }));
    }
  };

  const handleClearFilters = () => {
    setStatusFilters({
      confirmed: false,
      pending: false,
      cancelled: false,
      vouchered: false
    });
    setFilters({
      refNo: '',
      bookingMethods: {
        online: false,
        manual: false
      },
      agencyCategories: {
        large: false,
        managed: false,
        value: false
      },
      hotelSource: '',
      hotelSources: [],
      tripType: '',
      bookingDateStart: '',
      bookingDateEnd: '',
      checkInDateStart: '',
      checkInDateEnd: '',
      hotelName: '',
      agencyName: '',
      guestName: '',
      withoutHcn: false,
      cancellationDateExpired: false
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.refNo ||
      filters.bookingMethods.online ||
      filters.bookingMethods.manual ||
      filters.agencyCategories.large ||
      filters.agencyCategories.managed ||
      filters.agencyCategories.value ||
      filters.hotelSources.length > 0 ||
      filters.tripType ||
      filters.bookingDateStart ||
      filters.bookingDateEnd ||
      filters.checkInDateStart ||
      filters.checkInDateEnd ||
      filters.hotelName ||
      filters.agencyName ||
      filters.guestName ||
      filters.withoutHcn ||
      filters.cancellationDateExpired ||
      Object.values(statusFilters).some(value => value)
    );
  };

  const sortBookings = (bookings: Booking[]) => {
    return [...bookings].sort((a, b) => {
      switch (sortBy) {
        case 'bookingDate':
          return new Date(b.bookedTimestamp).getTime() - new Date(a.bookedTimestamp).getTime();
        case 'checkInDate':
          return new Date(b.checkInDate).getTime() - new Date(a.checkInDate).getTime();
        case 'cancellationDate':
          return new Date(b.lastCancellationDate).getTime() - new Date(a.lastCancellationDate).getTime();
        default:
          return 0;
      }
    });
  };

  const filteredBookings = sortBookings(bookings.filter(booking => {
    const hasStatusFilter = Object.values(statusFilters).some(value => value);
    const matchesStatus = hasStatusFilter 
      ? statusFilters[booking.status.toLowerCase() as keyof StatusFilters]
      : true;

    const matchesRefNo = !filters.refNo || booking.refNo.toLowerCase().includes(filters.refNo.toLowerCase());
    const matchesHotelName = !filters.hotelName || booking.hotelName.toLowerCase().includes(filters.hotelName.toLowerCase());
    const matchesAgencyName = !filters.agencyName || booking.agencyName.toLowerCase().includes(filters.agencyName.toLowerCase());
    const matchesGuestName = !filters.guestName || booking.leadGuestName.toLowerCase().includes(filters.guestName.toLowerCase());
    
    // Filter for cancellation date expired
    const today = new Date();
    const cancellationDate = new Date(booking.lastCancellationDate);
    const isCancellationExpired = cancellationDate < today;
    const matchesCancellationExpired = !filters.cancellationDateExpired || isCancellationExpired;

    return matchesStatus && matchesRefNo && matchesHotelName && matchesAgencyName && matchesGuestName && matchesCancellationExpired;
  }));

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

  const handleExportToExcel = () => {
    const exportData = filteredBookings.map(booking => ({
      'Agency Name': booking.agencyName,
      'Hotel Name': booking.hotelName,
      'Status': booking.status,
      'Lead Guest': booking.leadGuestName,
      'Guests': booking.numberOfGuests,
      'Rooms': booking.numberOfRooms,
      'Nights': booking.numberOfNights,
      'Check-in': new Date(booking.checkInDate).toLocaleDateString(),
      'Check-out': new Date(booking.checkOutDate).toLocaleDateString(),
      'Booked On': new Date(booking.bookedTimestamp).toLocaleString(),
      'Last Voucher Date': booking.lastVoucherDate,
      'Last Cancellation Date': booking.lastCancellationDate,
      'Hotel Conf': booking.hotelConfNo,
      'Conf No': booking.confNo,
      'Ref No': booking.refNo
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bookings');
    XLSX.writeFile(wb, 'bookings.xlsx');
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE]">
      <Header />
      
      {isFilterOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      <div 
        ref={filterPanelRef}
        className={`lg:hidden fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isFilterOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ height: '85vh' }}
      >
        <div className="flex flex-col h-full bg-white shadow-lg rounded-t-xl">
          <div className="flex-shrink-0 bg-[#E8ECF7] px-4 py-3 border-b border-[#D9E2F0] rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <h2 className="text-base font-medium text-gray-900">Filters</h2>
              </div>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-[#246197] hover:text-[#1b4a75]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <FilterContainer
                filters={filters}
                statusFilters={statusFilters}
                onFilterChange={handleFilterChange}
                onStatusFilterChange={handleStatusFilterChange}
                onBookingMethodChange={handleBookingMethodChange}
                onAgencyCategoryChange={handleAgencyCategoryChange}
                onHotelSourcesChange={handleHotelSourcesChange}
                onClearFilters={handleClearFilters}
                bookings={filteredBookings}
              />
            </div>
          </div>

          <div className="flex-shrink-0 border-t border-gray-200 p-4">
            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full h-10 bg-[#0E63B2] hover:bg-[#0d5aa3] text-white font-medium rounded-sm transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Show Results ({filteredBookings.length})
            </button>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-blue-600" />
            <span>Filters</span>
          </div>
          <span className="text-sm text-gray-500">{filteredBookings.length} results</span>
        </button>
      </div>

      <div className={`container mx-auto px-4 py-6 mb-16 lg:mb-0 ${isFilterOpen ? 'lg:overflow-auto overflow-hidden' : ''}`}>
        <div className="flex flex-col lg:flex-row justify-center gap-3">
          <div className="hidden lg:block">
            <FilterContainer
              filters={filters}
              statusFilters={statusFilters}
              onFilterChange={handleFilterChange}
              onStatusFilterChange={handleStatusFilterChange}
              onBookingMethodChange={handleBookingMethodChange}
              onAgencyCategoryChange={handleAgencyCategoryChange}
              onHotelSourcesChange={handleHotelSourcesChange}
              onClearFilters={handleClearFilters}
              bookings={filteredBookings}
            />
          </div>

          <div className="w-full lg:w-[800px] xl:w-[1000px]">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Booking Queue</h1>
              <div className="flex items-center gap-4">
                {filteredBookings.length > 0 && (
                  <button
                    onClick={handleExportToExcel}
                    className="flex items-center gap-1.5 text-sm text-[#246197] hover:text-[#1b4a75] transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Export to Excel
                  </button>
                )}
                <NotificationSection
                  cancellationDeadlineCount={3}
                  checkIn24HoursCount={2}
                  checkIn72HoursCount={5}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-medium text-gray-700">Applied Filters:</h2>
                <AppliedFilters
                  filters={filters}
                  statusFilters={statusFilters}
                  onRemoveFilter={handleRemoveFilter}
                />
                {hasActiveFilters() && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-[#246197] hover:text-[#1b4a75]"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <SortingDropdown value={sortBy} onChange={handleSortChange} />
            </div>

            {filteredBookings.length > 0 && (
              <div className="mb-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}

            <div className="space-y-3">
              {paginatedBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>

            {filteredBookings.length > 0 && (
              <div className="mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;