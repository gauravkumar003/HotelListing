import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SearchFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: LucideIcon;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-10 pl-9 pr-3 text-sm rounded-sm border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
        />
        <Icon className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
};