import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ANNOTATION_CATEGORIES } from '../../constants/timeline';
import { Annotation } from '../../types/timeline';

interface AddAnnotationFormProps {
  onAddAnnotation: (annotation: Omit<Annotation, 'id'>) => void;
}

export const AddAnnotationForm: React.FC<AddAnnotationFormProps> = ({ onAddAnnotation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(ANNOTATION_CATEGORIES[0].name);
  const [time, setTime] = useState(new Date().toISOString().slice(0, 16));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAnnotation({
      time: new Date(time),
      content,
      category,
      color: ANNOTATION_CATEGORIES.find(c => c.name === category)?.color || '#6b7280'
    });
    setContent('');
    setIsOpen(false);
  };

  return (
    <div className="mb-4">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Annotation
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white rounded-lg shadow-md">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Date & Time
            </label>
            <input
              type="datetime-local"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              {ANNOTATION_CATEGORIES.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter annotation description"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      )}
    </div>
  );
};