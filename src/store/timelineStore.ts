import { create } from 'zustand';
import { TestRun, Event, TimelineFilters } from '../types/timeline';
import { sampleData } from '../data/sampleData';

interface TimelineState {
  testRuns: TestRun[];
  events: Event[];
  filters: TimelineFilters;
  setTestRuns: (testRuns: TestRun[]) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Omit<Event, 'id'>) => void;
  deleteEvent: (id: string) => void;
  setEvents: (events: Event[]) => void;
  updateFilters: (filters: TimelineFilters) => void;
}

export const useTimelineStore = create<TimelineState>((set) => ({
  testRuns: sampleData,
  events: [],
  filters: {
    startDate: null,
    endDate: null,
    searchText: '',
    categories: []
  },
  setTestRuns: (testRuns) => set({ testRuns }),
  addEvent: (event) => set((state) => ({
    events: [...state.events, { ...event, id: `event-${Date.now()}` }]
  })),
  updateEvent: (id, event) => set((state) => ({
    events: state.events.map(e => e.id === id ? { ...event, id } : e)
  })),
  deleteEvent: (id) => set((state) => ({
    events: state.events.filter(e => e.id !== id)
  })),
  setEvents: (events) => set({ events }),
  updateFilters: (filters) => set({ filters })
}));