import React, { useEffect, useRef, useState } from 'react';
import { Timeline } from 'vis-timeline/standalone';
import { DataSet } from 'vis-data';
import { Edit2, Trash2 } from 'lucide-react';
import { useTimelineStore } from '../../store/timelineStore';
import { useTimelineData } from '../../hooks/useTimelineData';
import { TimelineLegend } from './TimelineLegend';
import { FilterPanel } from '../filters/FilterPanel';
import { EventDialog } from '../events/EventDialog';
import { TIMELINE_OPTIONS } from '../../constants/timeline';
import { createTimelineItems } from '../../utils/timelineData';
import { Event } from '../../types/timeline';
import 'vis-timeline/styles/vis-timeline-graph2d.css';

export const TimelineView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<Timeline | null>(null);
  const { testRuns, events, filters, updateFilters, updateEvent, deleteEvent } = useTimelineStore();
  const { filteredTestRuns, filteredEvents } = useTimelineData(testRuns, events, filters);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const timelineItems = [
      ...createTimelineItems(filteredTestRuns),
      ...filteredEvents.map(event => ({
        id: event.id,
        content: `
          <div class="event-item">
            <div class="event-title">${event.title}</div>
            <div class="event-tags">
              ${event.tags.map(tag => 
                `<span class="event-tag ${tag.color}">${tag.label}</span>`
              ).join('')}
            </div>
          </div>
        `,
        start: event.startDate,
        end: event.endDate,
        type: 'range',
        className: 'custom-event-range',
        title: `
          <div class="event-tooltip">
            <div class="flex justify-between items-start mb-4">
              <h3>${event.title}</h3>
              <div class="flex gap-2">
                <button 
                  class="tooltip-btn edit-btn" 
                  data-event-id="${event.id}" 
                  data-action="edit"
                  title="Edit event"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button 
                  class="tooltip-btn delete-btn" 
                  data-event-id="${event.id}" 
                  data-action="delete"
                  title="Delete event"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </div>
            <p>${event.description}</p>
            <div class="event-meta">
              <div>Start: ${event.startDate.toLocaleString()}</div>
              <div>End: ${event.endDate.toLocaleString()}</div>
            </div>
            <div class="event-tags">
              ${event.tags.map(tag => 
                `<span class="event-tag ${tag.color}">${tag.label}</span>`
              ).join('')}
            </div>
          </div>
        `
      }))
    ];

    const items = new DataSet(timelineItems);

    if (!timelineRef.current) {
      timelineRef.current = new Timeline(containerRef.current, items, {
        ...TIMELINE_OPTIONS,
        tooltip: {
          followMouse: false,
          overflowMethod: 'flip'
        }
      });

      // Add event listeners for tooltip buttons
      containerRef.current.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const button = target.closest('.tooltip-btn');
        
        if (button) {
          const eventId = button.getAttribute('data-event-id');
          const action = button.getAttribute('data-action');
          
          if (eventId) {
            const event = events.find(e => e.id === eventId);
            if (event) {
              if (action === 'edit') {
                setSelectedEvent(event);
                setIsEditDialogOpen(true);
              } else if (action === 'delete') {
                if (window.confirm('Are you sure you want to delete this event?')) {
                  deleteEvent(eventId);
                }
              }
            }
          }
        }
      });
    } else {
      timelineRef.current.setItems(items);
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.destroy();
        timelineRef.current = null;
      }
    };
  }, [filteredTestRuns, filteredEvents, events, deleteEvent]);

  const handleUpdateEvent = (updatedEvent: Omit<Event, 'id'>) => {
    if (selectedEvent) {
      updateEvent(selectedEvent.id, updatedEvent);
      setSelectedEvent(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      setSelectedEvent(null);
      setIsEditDialogOpen(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <TimelineLegend />
      <FilterPanel filters={filters} onFilterChange={updateFilters} />
      <div ref={containerRef} className="border rounded-lg shadow-sm min-h-[600px] mt-6"></div>

      <EventDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedEvent(null);
        }}
        onSubmit={handleUpdateEvent}
        onDelete={handleDeleteEvent}
        initialEvent={selectedEvent || undefined}
      />
    </div>
  );
};