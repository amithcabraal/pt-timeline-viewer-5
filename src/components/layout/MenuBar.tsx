import React, { useState } from 'react';
import { Menu, Download, Upload, Plus, Info } from 'lucide-react';
import { AboutDialog } from '../about/AboutDialog';

interface MenuBarProps {
  onImport: () => void;
  onExport: () => void;
  onAddEvent?: () => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({ onImport, onExport, onAddEvent }) => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 text-gray-500 mr-3" />
              <h1 className="text-xl font-bold text-gray-800">Performance Tests Timeline</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsAboutOpen(true)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <Info className="h-4 w-4 mr-2" />
                About
              </button>
              {onAddEvent && (
                <button
                  onClick={onAddEvent}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </button>
              )}
              <button
                onClick={onImport}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import
              </button>
              <button
                onClick={onExport}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AboutDialog isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  );
};