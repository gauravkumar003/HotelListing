import React from 'react';
import { Home, Plane } from 'lucide-react';

interface TripTypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const TripTypeFilter: React.FC<TripTypeFilterProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Trip Type</label>
      <div className="flex gap-2">
        <button
          onClick={() => onChange('domestic')}
          className={`
            flex-1 px-2 py-1.5 rounded-sm text-sm font-medium
            border border-gray-300
            ${value === 'domestic' ? 'bg-gray-100' : 'bg-white'}
            text-gray-700 hover:bg-gray-50
          `}
        >
          <Home className="h-3 w-3 inline-block mr-1" />
          Domestic
        </button>
        <button
          onClick={() => onChange('international')}
          className={`
            flex-1 px-2 py-1.5 rounded-sm text-sm font-medium
            border border-gray-300
            ${value === 'international' ? 'bg-gray-100' : 'bg-white'}
            text-gray-700 hover:bg-gray-50
          `}
        >
          <Plane className="h-3 w-3 inline-block mr-1" />
          International
        </button>
      </div>
    </div>
  );
};