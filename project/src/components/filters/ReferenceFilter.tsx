import React from 'react';
import { Search } from 'lucide-react';

interface ReferenceFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const ReferenceFilter: React.FC<ReferenceFilterProps> = ({ value, onChange }) => {
  const handleSubmit = () => {
    console.log('Searching for reference:', value);
    // This would typically trigger a search action
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Restrict By Conf. No / Ref. No / HCN</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-10 pl-9 pr-3 text-sm rounded-sm border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search ref no..."
          />
          <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <button
          onClick={handleSubmit}
          className="h-10 px-4 bg-[#0E63B2] hover:bg-[#0d5aa3] text-white font-medium rounded-sm transition-colors duration-200"
        >
          Go
        </button>
      </div>
    </div>
  );
};