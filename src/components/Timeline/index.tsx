import React, { useEffect, useRef, useState } from 'react';
import { Timeline as VisTimeline } from 'vis-timeline/standalone';
import { DataSet } from 'vis-data';
import { TimelineLegend } from './TimelineLegend';
import { FilterPanel } from '../filters/FilterPanel';
import { TIMELINE_OPTIONS } from '../../constants/timeline';
import { createTimelineItems } from '../../utils/timelineData';
import { TestRun, TimelineFilters, Event } from '../../types/timeline';
import 'vis-timeline/styles/vis-timeline-graph2d.css';

interface TimelineProps {
  data: TestRun[];
  events: Event[];
}

export const Timeline: React.FC<TimelineProps> = ({ data, events }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<VisTimeline | null>(null);
  const [filters, setFilters] = useState<TimelineFilters>({
    startDate: null,
    endDate: null,
    searchText: '',
    categories: []
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const filteredData = data.filter(item => {
      const itemDate = new Date(parseInt(item.loadtestbegintime));
      const matchesDateRange = (!filters.startDate || itemDate >= filters.startDate) &&
                              (!filters.endDate || itemDate <= filters.endDate);
      const matchesSearch = item.name.toLowerCase().includes(filters.searchText.toLowerCase());
      return matchesDateRange && matchesSearch;
    });

    const timelineItems = [
      ...createTimelineItems(filteredData),
      ...events.map(event => ({
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
            <h3>${event.title}</h3>
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

    if (timelineRef.current) {
      timelineRef.current.destroy();
    }

    timelineRef.current = new VisTimeline(containerRef.current, items, {
      ...TIMELINE_OPTIONS,
      template: function (item: any) {
        return item.content;
      }
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.destroy();
      }
    };
  }, [data, filters, events]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <TimelineLegend />
      <FilterPanel filters={filters} onFilterChange={setFilters} />
      <div ref={containerRef} className="border rounded-lg shadow-sm min-h-[600px] mt-6"></div>
    </div>
  );
};

export { Timeline };