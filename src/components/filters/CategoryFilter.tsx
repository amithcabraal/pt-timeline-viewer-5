import React from 'react';
import { Tag } from 'lucide-react';
import { TimelineFilters } from '../../types/timeline';
import { ANNOTATION_CATEGORIES } from '../../constants/timeline';

interface CategoryFilterProps {
  filters: TimelineFilters;
  onFilterChange: (filters: TimelineFilters) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ filters, onFilterChange }) => {
  return (
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
  );
};