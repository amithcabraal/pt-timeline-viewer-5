import React, { useState, useEffect } from 'react';
import { Event, Tag } from '../../types/timeline';
import { Trash2 } from 'lucide-react';

interface EventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: Omit<Event, 'id'>) => void;
  onDelete?: () => void;
  initialEvent?: Event;
}

const AVAILABLE_TAGS: Tag[] = [
  { id: 'deployment', label: 'Deployment', color: 'bg-blue-500' },
  { id: 'incident', label: 'Incident', color: 'bg-red-500' },
  { id: 'maintenance', label: 'Maintenance', color: 'bg-yellow-500' },
  { id: 'milestone', label: 'Milestone', color: 'bg-green-500' },
];

export const EventDialog: React.FC<EventDialogProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  onDelete,
  initialEvent 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 16));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 16));
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title);
      setDescription(initialEvent.description);
      setStartDate(initialEvent.startDate.toISOString().slice(0, 16));
      setEndDate(initialEvent.endDate.toISOString().slice(0, 16));
      setSelectedTags(initialEvent.tags.map(tag => tag.id));
    }
  }, [initialEvent]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      tags: selectedTags.map(tagId => 
        AVAILABLE_TAGS.find(tag => tag.id === tagId)!
      )
    });
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStartDate(new Date().toISOString().slice(0, 16));
    setEndDate(new Date().toISOString().slice(0, 16));
    setSelectedTags([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {initialEvent ? 'Edit Event' : 'Add Event'}
          </h2>
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-2 text-red-600 hover:text-red-700 rounded-full hover:bg-red-50 transition-colors"
              title="Delete event"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date & Time
              </label>
              <input
                type="datetime-local"
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map(tag => (
                <label
                  key={tag.id}
                  className="inline-flex items-center"
                >
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.id)}
                    onChange={(e) => {
                      setSelectedTags(prev =>
                        e.target.checked
                          ? [...prev, tag.id]
                          : prev.filter(id => id !== tag.id)
                      );
                    }}
                    className="sr-only"
                  />
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm cursor-pointer transition-opacity ${
                      tag.color
                    } ${
                      selectedTags.includes(tag.id) ? 'opacity-100' : 'opacity-50'
                    }`}
                  >
                    {tag.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              {initialEvent ? 'Update' : 'Add'} Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};