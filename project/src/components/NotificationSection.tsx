import React from 'react';
import { Calendar } from 'lucide-react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface NotificationSectionProps {
  cancellationDeadlineCount: number;
  checkIn24HoursCount: number;
  checkIn72HoursCount: number;
}

export const NotificationSection: React.FC<NotificationSectionProps> = ({
  cancellationDeadlineCount,
  checkIn24HoursCount,
  checkIn72HoursCount
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative group">
        <div className="relative inline-flex">
          <div className="absolute -top-2.5 -right-2.5 min-w-[20px] h-5 flex items-center justify-center bg-[#FEF0C7] text-[#B54708] text-xs font-semibold rounded-full px-1.5 border border-[#FEF0C7]">
            {cancellationDeadlineCount}
          </div>
          <button className="h-9 px-3 flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-md transition-colors duration-200">
            <WarningAmberIcon className="h-5 w-5 text-[#B54708]" />
            <span className="hidden lg:block text-sm font-medium text-gray-700">Cancellation</span>
          </button>
        </div>
        <div className="absolute z-20 invisible group-hover:visible bg-white border border-gray-200 rounded-md shadow-lg p-3 mt-2 w-64 right-0">
          <p className="text-sm text-gray-600">Bookings that are approaching their cancellation deadline</p>
        </div>
      </div>

      <div className="relative group">
        <div className="relative inline-flex">
          <div className="absolute -top-2.5 -right-2.5 min-w-[20px] h-5 flex items-center justify-center bg-[#ECFDF3] text-[#027A48] text-xs font-semibold rounded-full px-1.5 border border-[#ECFDF3]">
            {checkIn24HoursCount}
          </div>
          <button className="h-9 px-3 flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-md transition-colors duration-200">
            <Calendar className="h-5 w-5 text-[#027A48]" />
            <span className="hidden lg:block text-sm font-medium text-gray-700">24 Hours</span>
          </button>
        </div>
        <div className="absolute z-20 invisible group-hover:visible bg-white border border-gray-200 rounded-md shadow-lg p-3 mt-2 w-64 right-0">
          <p className="text-sm text-gray-600">Bookings with check-in within the next 24 hours</p>
        </div>
      </div>

      <div className="relative group">
        <div className="relative inline-flex">
          <div className="absolute -top-2.5 -right-2.5 min-w-[20px] h-5 flex items-center justify-center bg-[#F2F4F7] text-[#344054] text-xs font-semibold rounded-full px-1.5 border border-[#F2F4F7]">
            {checkIn72HoursCount}
          </div>
          <button className="h-9 px-3 flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-md transition-colors duration-200">
            <Calendar className="h-5 w-5 text-[#344054]" />
            <span className="hidden lg:block text-sm font-medium text-gray-700">72 Hours</span>
          </button>
        </div>
        <div className="absolute z-20 invisible group-hover:visible bg-white border border-gray-200 rounded-md shadow-lg p-3 mt-2 w-64 right-0">
          <p className="text-sm text-gray-600">Bookings with check-in within the next 72 hours</p>
        </div>
      </div>
    </div>
  );
};