import React from 'react';
import { STATUS_COLORS, ANNOTATION_CATEGORIES } from '../../constants/timeline';

export const TimelineLegend: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-6 mb-4">
      <div className="flex gap-4">
        {Object.entries(STATUS_COLORS).map(([status, className]) => (
          <div key={status} className="flex items-center">
            <div className={`w-4 h-4 rounded ${className} mr-2`}></div>
            <span className="text-sm text-gray-700">{status}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        {ANNOTATION_CATEGORIES.map(category => (
          <div key={category.name} className="flex items-center">
            <div className={`w-4 h-4 rounded`} style={{ backgroundColor: category.color }}></div>
            <span className="text-sm text-gray-700 ml-2">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};