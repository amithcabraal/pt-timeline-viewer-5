import React from 'react';
import { STATUS_COLORS } from '../constants/timeline';

export const TimelineLegend: React.FC = () => {
  return (
    <div className="flex gap-4 mb-4">
      {Object.entries(STATUS_COLORS).map(([status, className]) => (
        <div key={status} className="flex items-center">
          <div className={`w-4 h-4 rounded ${className} mr-2`}></div>
          <span className="text-sm text-gray-700">{status}</span>
        </div>
      ))}
    </div>
  );
};