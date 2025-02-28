import React, { useState } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import { ChevronDown, ChevronUp, Bed, Pencil } from 'lucide-react';

interface BookingCardProps {
  booking: {
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
  };
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmed': return 'bg-[#ecf6fe] text-[#0e63b2] border border-[#8fc8f1]';
    case 'pending': return 'bg-[#FBF8E3] text-[#654F29] border border-[#D6B675]';
    case 'cancelled': return 'bg-[#f2dede] text-[#79302F] border border-[#C48792]';
    case 'vouchered': return 'bg-[#e8f2e9] text-[#2a4b2a] border border-[#9fc282]';
    default: return 'bg-gray-50 text-gray-700 border border-gray-200';
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatDateDDMMYYYY = (date: string) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

const formatBookingTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

  return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
};

const getAgencyLabel = (agencyName: string) => {
  const agencyLabels: Record<string, { 
    type: 'large' | 'managed' | 'value',
    style: {
      text: string
    }
  }> = {
    'Global Travel Solutions': {
      type: 'large',
      style: {
        text: 'text-purple-700'
      }
    },
    'Sunset Travels': {
      type: 'managed',
      style: {
        text: 'text-blue-700'
      }
    },
    'Mountain Expeditions': {
      type: 'value',
      style: {
        text: 'text-green-700'
      }
    }
  };

  return agencyLabels[agencyName];
};

const formatHotelNameAndSupplier = (hotelName: string, supplier: string) => {
  const maxFirstLineLength = 60;
  const words = hotelName.split(' ');
  let firstLine = '';
  let secondLine = '';
  let currentLine = '';
  let remainingWords = [...words];

  while (remainingWords.length > 0) {
    const word = remainingWords[0];
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    
    if (testLine.length <= maxFirstLineLength + 3) {
      currentLine = testLine;
      remainingWords.shift();
    } else {
      break;
    }
  }

  firstLine = currentLine;

  if (remainingWords.length > 0) {
    return {
      firstLine,
      secondLine: remainingWords.join(' '),
      supplier,
      hasSecondLine: true
    };
  } else {
    return {
      firstLine: hotelName,
      secondLine: '',
      supplier,
      hasSecondLine: false
    };
  }
};

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const agencyLabel = getAgencyLabel(booking.agencyName);
  const price = 51494.49;
  const usdPrice = 591.26;

  const roomGuests = Array.from({ length: booking.numberOfRooms }, (_, index) => ({
    roomNumber: index + 1,
    adults: index === 0 ? 2 : 1,
    children: index === 0 ? 1 : 0,
    infants: 0
  }));

  const formatMultipleNumbers = (numbers: string) => {
    return numbers.split(',').map((num, index) => (
      <React.Fragment key={num}>
        {index > 0 && <br />}
        <span className="text-xs font-medium text-gray-700">{num.trim()}</span>
      </React.Fragment>
    ));
  };

  const { firstLine, secondLine, supplier, hasSecondLine } = formatHotelNameAndSupplier(booking.hotelName, 'HotelBeds');

  return (
    <div className="bg-white rounded-lg border border-[#D9E2F0]">
      <div className="flex flex-col lg:flex-row p-[18px]">
        {/* Left Section: Agency & Hotel Info */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1">
                  <a 
                    href={`/agency/${encodeURIComponent(booking.agencyName)}`} 
                    className="font-medium text-[#0E63B2] hover:text-[#0d5aa3] transition-colors duration-200"
                  >
                    {booking.agencyName}
                  </a>
                  <span className="text-gray-500">(Ludhiana)</span>
                </div>
                {agencyLabel && (
                  <div className="inline-flex items-center h-6 px-2.5 rounded-full bg-gray-50 border border-gray-200">
                    <span className={`text-xs font-medium ${agencyLabel.style.text}`}>
                      {agencyLabel.type.charAt(0).toUpperCase() + agencyLabel.type.slice(1)}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-base font-semibold text-gray-900 break-words">
                  {firstLine}
                </h3>
                <div className="flex items-center gap-1 flex-wrap">
                  {hasSecondLine && (
                    <span className="text-sm font-semibold text-gray-900 break-words">{secondLine}</span>
                  )}
                  <span className="text-sm text-gray-500">({supplier})</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex-shrink-0 flex items-center gap-1.5">
                  <PersonOutlineIcon className="h-[18px] w-[18px] text-gray-500" />
                  <span className="text-xs text-gray-700">{booking.leadGuestName}</span>
                </div>
                <button 
                  onClick={() => setShowRoomDetails(!showRoomDetails)}
                  className="flex-shrink-0 flex items-center gap-1 text-[#0E63B2] hover:text-[#0d5aa3] transition-colors duration-200"
                >
                  <GroupsOutlinedIcon className="h-[18px] w-[18px]" />
                  <span className="text-xs">{booking.numberOfGuests} Guests</span>
                  {showRoomDetails ? (
                    <ChevronUp className="h-[18px] w-[18px]" />
                  ) : (
                    <ChevronDown className="h-[18px] w-[18px]" />
                  )}
                </button>
                <div className="flex-shrink-0 flex items-center gap-1.5">
                  <Bed className="h-[18px] w-[18px] text-gray-500" />
                  <span className="text-xs text-gray-700">{booking.numberOfRooms} Rooms</span>
                </div>
                <div className="flex-shrink-0 flex items-center gap-1.5">
                  <NightsStayOutlinedIcon className="h-[18px] w-[18px] text-gray-500" />
                  <span className="text-xs text-gray-700">{booking.numberOfNights} Nights</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-2 sm:ml-auto mt-2 sm:mt-0">
              <div className="flex flex-col gap-2 items-end w-full sm:w-auto">
                <div className={`flex-shrink-0 h-6 px-2.5 flex items-center rounded-sm text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </div>
                <div className="grid grid-cols-2 gap-1.5 w-full sm:w-auto">
                  <div className="h-14 w-full sm:w-[120px] px-3 py-2 bg-gray-50 border border-gray-100 rounded-sm flex flex-col items-center justify-center">
                    <div className="text-xs text-gray-700">Check-in</div>
                    <div className="text-sm font-medium text-gray-900 mt-1">{formatDate(booking.checkInDate)}</div>
                  </div>
                  <div className="h-14 w-full sm:w-[120px] px-3 py-2 bg-gray-50 border border-gray-100 rounded-sm flex flex-col items-center justify-center">
                    <div className="text-xs text-gray-700">Check-out</div>
                    <div className="text-sm font-medium text-gray-900 mt-1">{formatDate(booking.checkOutDate)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showRoomDetails && (
            <div className="mt-3 p-3 bg-gray-50 rounded-sm border border-gray-100">
              <div className="grid gap-3">
                {roomGuests.map((room, index) => (
                  <div key={room.roomNumber} className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="flex items-center gap-2">
                      <Bed className="h-[18px] w-[18px] text-gray-500" />
                      <span className="text-xs font-medium text-gray-700">Room {room.roomNumber}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <div className="flex items-center gap-1.5">
                        <PersonOutlineIcon className="h-[18px] w-[18px] text-gray-500" />
                        <span className="text-xs text-gray-700">{room.adults} Adults</span>
                      </div>
                      {room.children > 0 && (
                        <div className="flex items-center gap-1.5">
                          <PersonOutlineIcon className="h-[18px] w-[18px] text-gray-500" />
                          <span className="text-xs text-gray-700">{room.children} Children</span>
                        </div>
                      )}
                      {room.infants > 0 && (
                        <div className="flex items-center gap-1.5">
                          <PersonOutlineIcon className="h-[18px] w-[18px] text-gray-500" />
                          <span className="text-xs text-gray-700">{room.infants} Infants</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex-1 flex items-end mt-4">
            <div className="flex flex-1 justify-between items-end">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-y-1 sm:gap-x-0">
                <div className="flex flex-col">
                  <div className="text-xs text-gray-500 mb-0.5">Booked On</div>
                  <div className="text-xs font-medium text-gray-700">{formatBookingTimestamp(booking.bookedTimestamp)}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-xs text-gray-500 mb-0.5">Last Voucher Date</div>
                  <div className="text-xs font-bold text-gray-700">{formatDateDDMMYYYY(booking.lastVoucherDate)}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-xs text-gray-500 mb-0.5">Last Cancellation Date</div>
                  <div className="text-xs font-bold text-[#79302F]">{formatDateDDMMYYYY(booking.lastCancellationDate)}</div>
                </div>
              </div>
              <div className="flex flex-col items-end ml-2">
                <div className="text-xs text-gray-500 mb-0.5">Price</div>
                <div className="text-xs font-medium text-green-700 whitespace-nowrap">
                  Rs. {price.toFixed(2)} (${usdPrice.toFixed(2)})
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-3">
            <a 
              href={`/request/${booking.id}`}
              className="text-sm text-[#0E63B2] hover:text-[#0d5aa3] underline transition-colors duration-200"
            >
              Raise a Request
            </a>
          </div>
        </div>

        {/* Right Section: Reference Numbers & Actions */}
        <div className="flex-shrink-0 lg:ml-4 lg:pl-4 lg:border-l border-gray-200 mt-3 lg:mt-0">
          <div className="flex flex-col h-full justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2 mb-3">
              <div className="h-auto min-h-[40px]">
                <div className="flex items-center gap-1">
                  <div className="text-xs text-gray-500">Hotel Conf</div>
                  <button 
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => {/* Handle edit */}}
                  >
                    <Pencil className="h-3 w-3 text-[#0E63B2]" />
                  </button>
                </div>
                <div className="text-xs font-medium text-gray-700 break-words">
                  {booking.id === '1' ? 
                    formatMultipleNumbers('99467216,99467234,99467222,99467219,99467221') :
                    booking.hotelConfNo || '—'
                  }
                </div>
              </div>
              <div className="h-10">
                <div className="text-xs text-gray-500">Conf No</div>
                <div className="text-xs font-medium text-gray-700 break-words">{booking.confNo}</div>
              </div>
              <div className="h-auto min-h-[40px]">
                <div className="text-xs text-gray-500">Ref No</div>
                <div className="break-words">
                  {booking.id === '1' ? 
                    formatMultipleNumbers('419800775,419800779,419800783,419800786,419800791') :
                    <span className="text-xs font-medium text-gray-700">{booking.refNo}</span>
                  }
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <button className="h-8 px-3 text-xs font-medium text-black bg-[#F4B434] hover:bg-[#f5bc4a] border border-[#F4B434] rounded-sm">
                Change Request
              </button>
              <button className="h-8 px-3 text-xs font-medium text-white bg-[#0E63B2] hover:bg-[#0d5aa3] rounded-sm transition-colors duration-200">
                Open
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;