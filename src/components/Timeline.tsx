import React, { useEffect, useRef, useState } from 'react';
import { Timeline as VisTimeline } from 'vis-timeline/standalone';
import { DataSet } from 'vis-data';
import { TimelineLegend } from './TimelineLegend';
import { FilterPanel } from './filters/FilterPanel';
import { TIMELINE_OPTIONS } from '../constants/timeline';
import { createTimelineItems } from '../utils/timelineData';
import { TestRun, TimelineFilters } from '../types/timeline';
import 'vis-timeline/styles/vis-timeline-graph2d.css';

interface TimelineProps {
  data: TestRun[];
}

export const Timeline: React.FC<TimelineProps> = ({ data }) => {
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

    const items = new DataSet(createTimelineItems(filteredData));
    timelineRef.current = new VisTimeline(containerRef.current, items, TIMELINE_OPTIONS);

    return () => {
      if (timelineRef.current) {
        timelineRef.current.destroy();
      }
    };
  }, [data, filters]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-4">Test Runs Timeline</h1>
        <TimelineLegend />
        <FilterPanel filters={filters} onFilterChange={setFilters} />
      </div>
      <div ref={containerRef} className="border rounded-lg shadow-lg"></div>
    </div>
  );
};