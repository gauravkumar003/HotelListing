import React from 'react';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';

interface AgencyCategories {
  large: boolean;
  managed: boolean;
  value: boolean;
}

interface AgencyCategoryFilterProps {
  categories: AgencyCategories;
  onChange: (category: keyof AgencyCategories) => void;
}

export const AgencyCategoryFilter: React.FC<AgencyCategoryFilterProps> = ({ categories, onChange }) => {
  const categoryConfig = {
    large: {
      icon: BusinessOutlinedIcon,
      label: 'Large',
    },
    managed: {
      icon: WorkOutlineOutlinedIcon,
      label: 'Managed',
    },
    value: {
      icon: ShowChartOutlinedIcon,
      label: 'Value',
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Agency Category</label>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {(Object.keys(categories) as Array<keyof AgencyCategories>).map((category) => {
          const config = categoryConfig[category];
          const Icon = config.icon;

          return (
            <label
              key={category}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={categories[category]}
                onChange={() => onChange(category)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">{config.label}</span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};