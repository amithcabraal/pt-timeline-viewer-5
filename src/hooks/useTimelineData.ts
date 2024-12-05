import { useMemo } from 'react';
import { TestRun, Event, TimelineFilters } from '../types/timeline';

export const useTimelineData = (
  testRuns: TestRun[],
  events: Event[],
  filters: TimelineFilters
) => {
  return useMemo(() => {
    const filteredTestRuns = testRuns.filter(item => {
      const itemDate = new Date(parseInt(item.loadtestbegintime));
      const matchesDateRange = (!filters.startDate || itemDate >= filters.startDate) &&
                              (!filters.endDate || itemDate <= filters.endDate);
      const matchesSearch = item.name.toLowerCase().includes(filters.searchText.toLowerCase());
      return matchesDateRange && matchesSearch;
    });

    const filteredEvents = events.filter(event => {
      const matchesDateRange = (!filters.startDate || event.startDate >= filters.startDate) &&
                              (!filters.endDate || event.endDate <= filters.endDate);
      return matchesDateRange;
    });

    return {
      filteredTestRuns,
      filteredEvents
    };
  }, [testRuns, events, filters]);
};