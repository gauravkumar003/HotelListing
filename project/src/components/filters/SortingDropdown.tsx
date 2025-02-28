import React from 'react';

export type SortOption = 'bookingDate' | 'checkInDate' | 'cancellationDate';

interface SortingDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortingDropdown: React.FC<SortingDropdownProps> = ({ value, onChange }) => {
  const options: { value: SortOption; label: string }[] = [
    { value: 'bookingDate', label: 'Booking Date' },
    { value: 'checkInDate', label: 'Check-in Date' },
    { value: 'cancellationDate', label: 'Cancellation Date' },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 font-medium">Sort By:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="h-8 pl-2 pr-6 text-sm border border-gray-200 rounded-sm bg-white text-gray-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        style={{ width: "140px" }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};