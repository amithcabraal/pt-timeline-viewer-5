import React from 'react';
import { Calendar, Search, Tag } from 'lucide-react';
import { TimelineFilters } from '../types/timeline';
import { ANNOTATION_CATEGORIES } from '../constants/timeline';

interface FilterProps {
  filters: TimelineFilters;
  onFilterChange: (filters: TimelineFilters) => void;
}

export const TimelineFilters: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap gap-4">
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
      </div>
      <div className="flex items-center gap-2">
        <Tag className="w-5 h-5 text-gray-500" />
        <div className="flex flex-wrap gap-2">
          {ANNOTATION_CATEGORIES.map(category => (
            <label key={category.name} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.categories.includes(category.name)}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...filters.categories, category.name]
                    : filters.categories.filter(c => c !== category.name);
                  onFilterChange({
                    ...filters,
                    categories: newCategories
                  });
                }}
                className="rounded text-blue-600"
              />
              <span className="text-sm text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};