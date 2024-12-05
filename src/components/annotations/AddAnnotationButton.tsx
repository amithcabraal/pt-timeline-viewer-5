import React from 'react';
import { Plus } from 'lucide-react';

interface AddAnnotationButtonProps {
  onClick: () => void;
}

export const AddAnnotationButton: React.FC<AddAnnotationButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
    >
      <Plus className="w-4 h-4" />
      Add Annotation
    </button>
  );
};