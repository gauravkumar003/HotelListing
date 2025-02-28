import React, { useState } from 'react';
import { Hotel, CheckSquare, Square, ChevronDown, ChevronUp } from 'lucide-react';

interface HotelSourceFilterProps {
  selectedSources: string[];
  onChange: (sources: string[]) => void;
}

const HotelSourceFilter: React.FC<HotelSourceFilterProps> = ({ selectedSources, onChange }) => {
  const sources = ['Agoda', 'AgodaMaldives', 'BookABed', 'BookingDotCom', 'ClearTrip', 'Desiya'];
  const [isAllSelected, setIsAllSelected] = useState(selectedSources.length === sources.length);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSelectAll = () => {
    onChange([...sources]);
    setIsAllSelected(true);
  };

  const handleUnselectAll = () => {
    onChange([]);
    setIsAllSelected(false);
  };

  const handleSourceToggle = (source: string) => {
    const newSources = selectedSources.includes(source)
      ? selectedSources.filter(s => s !== source)
      : [...selectedSources, source];
    
    onChange(newSources);
    setIsAllSelected(newSources.length === sources.length);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">Show Hotel Sources</label>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-gray-50 rounded-sm transition-colors"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
      </div>

      <div className={`space-y-3 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        <div className="flex items-center justify-between">
          <button
            onClick={handleSelectAll}
            className="text-sm text-[#246197] hover:text-[#1b4a75] transition-colors duration-200"
          >
            Select All
          </button>
          {selectedSources.length > 0 && (
            <button
              onClick={handleUnselectAll}
              className="text-sm text-[#246197] hover:text-[#1b4a75] transition-colors duration-200"
            >
              Unselect All
            </button>
          )}
        </div>

        <div className="space-y-2">
          {sources.map((source) => (
            <label key={source} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedSources.includes(source)}
                onChange={() => handleSourceToggle(source)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{source}</span>
            </label>
          ))}
        </div>
      </div>

      {!isExpanded && selectedSources.length > 0 && (
        <div className="mt-1 text-sm text-gray-500">
          {selectedSources.length} source{selectedSources.length !== 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  );
};

export { HotelSourceFilter };