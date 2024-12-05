import React from 'react';
import { X } from 'lucide-react';

interface AboutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const versionHistory = [
  {
    version: "1.1.0",
    date: "2024-03-14",
    changes: [
      "Added About page with version history",
      "Updated application title to 'Performance Tests Timeline'",
      "Added start and end date/time for events",
      "Improved event tooltips with edit and delete functionality",
      "Enhanced timeline visualization"
    ]
  },
  {
    version: "1.0.0",
    date: "2024-03-13",
    changes: [
      "Initial release",
      "Basic timeline visualization",
      "Test run display",
      "Event management",
      "Import/Export functionality"
    ]
  }
];

export const AboutDialog: React.FC<AboutDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">About Performance Tests Timeline</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">
            Performance Tests Timeline is a comprehensive visualization tool for tracking and managing performance test runs,
            significant events, and annotations across your testing timeline.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-4">Version History</h3>
          <div className="space-y-6">
            {versionHistory.map((release) => (
              <div key={release.version} className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">Version {release.version}</h4>
                  <span className="text-sm text-gray-500">{release.date}</span>
                </div>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {release.changes.map((change, index) => (
                    <li key={index}>{change}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};