import React from 'react';

interface StatusFilters {
  confirmed: boolean;
  pending: boolean;
  cancelled: boolean;
  vouchered: boolean;
}

interface StatusFilterProps {
  filters: StatusFilters;
  onChange: (key: keyof StatusFilters, value: boolean) => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({ filters, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">Status</label>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {Object.entries(filters).map(([key, value]) => (
          <label key={key} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => onChange(key as keyof StatusFilters, e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 capitalize">
              {key}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};