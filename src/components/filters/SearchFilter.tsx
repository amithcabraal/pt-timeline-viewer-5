import React from 'react';
import { Search } from 'lucide-react';
import { TimelineFilters } from '../../types/timeline';

interface SearchFilterProps {
  filters: TimelineFilters;
  onFilterChange: (filters: TimelineFilters) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="flex items-center flex-1">
      <Search className="w-5 h-5 mr-2 text-gray-500" />
      <input
        type="text"
        placeholder="Search test names..."
        className="px-3 py-2 border rounded-md w-full"
        value={filters.searchText}
        onChange={(e) => onFilterChange({
          ...filters,
          searchText: e.target.value
        })}
      />
    </div>
  );
};