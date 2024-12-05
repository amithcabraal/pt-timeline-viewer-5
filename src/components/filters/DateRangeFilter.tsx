import React from 'react';
import { Calendar } from 'lucide-react';
import { TimelineFilters } from '../../types/timeline';

interface DateRangeFilterProps {
  filters: TimelineFilters;
  onFilterChange: (filters: TimelineFilters) => void;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="flex gap-4">
      <div className="flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-gray-500" />
        <input
          type="date"
          className="px-3 py-2 border rounded-md"
          value={filters.startDate?.toISOString().split('T')[0] || ''}
          onChange={(e) => onFilterChange({
            ...filters,
            startDate: e.target.value ? new Date(e.target.value) : null
          })}
        />
      </div>
      <div className="flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-gray-500" />
        <input
          type="date"
          className="px-3 py-2 border rounded-md"
          value={filters.endDate?.toISOString().split('T')[0] || ''}
          onChange={(e) => onFilterChange({
            ...filters,
            endDate: e.target.value ? new Date(e.target.value) : null
          })}
        />
      </div>
    </div>
  );
};