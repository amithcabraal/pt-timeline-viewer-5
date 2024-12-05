import React from 'react';
import { TimelineFilters } from '../../types/timeline';
import { DateRangeFilter } from './DateRangeFilter';
import { SearchFilter } from './SearchFilter';
import { CategoryFilter } from './CategoryFilter';

interface FilterPanelProps {
  filters: TimelineFilters;
  onFilterChange: (filters: TimelineFilters) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap gap-4">
        <DateRangeFilter filters={filters} onFilterChange={onFilterChange} />
        <SearchFilter filters={filters} onFilterChange={onFilterChange} />
      </div>
      <CategoryFilter filters={filters} onFilterChange={onFilterChange} />
    </div>
  );
};