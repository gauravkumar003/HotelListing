import React from 'react';

interface DateRangeFilterProps {
  label: string;
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  label,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-gray-500 mb-1">From</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="w-full h-9 px-2 text-sm rounded-sm border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            style={{ minWidth: "100%", width: "100%" }}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">To</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="w-full h-9 px-2 text-sm rounded-sm border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            style={{ minWidth: "100%", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};