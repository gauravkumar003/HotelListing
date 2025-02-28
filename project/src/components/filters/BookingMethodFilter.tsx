import React from 'react';

interface BookingMethods {
  online: boolean;
  manual: boolean;
}

interface BookingMethodFilterProps {
  methods: BookingMethods;
  onChange: (method: keyof BookingMethods) => void;
}

export const BookingMethodFilter: React.FC<BookingMethodFilterProps> = ({ methods, onChange }) => {
  return (
    <div>
      <label className="block text-xs font-medium text-black mb-2">Booking Method</label>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={methods.online}
            onChange={() => onChange('online')}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Online</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={methods.manual}
            onChange={() => onChange('manual')}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Manual</span>
        </label>
      </div>
    </div>
  );
};