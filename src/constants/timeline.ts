export const STATUS_COLORS = {
  PASSED: 'status-passed',
  FAILED: 'status-failed',
  STOPPED: 'status-stopped',
  SYSTEM_ERROR: 'status-error'
} as const;

export const ANNOTATION_CATEGORIES = [
  { name: 'Deployment', color: '#3b82f6' },
  { name: 'Incident', color: '#ef4444' },
  { name: 'Maintenance', color: '#f59e0b' },
  { name: 'Release', color: '#22c55e' },
  { name: 'Other', color: '#6b7280' }
] as const;

export const TIMELINE_OPTIONS = {
  height: '600px',
  start: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
  end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  zoomMin: 1000 * 60 * 60, // 1 hour
  zoomMax: 1000 * 60 * 60 * 24 * 31, // 31 days
  orientation: 'top',
  stack: false,
  showCurrentTime: true,
  showTooltips: true,
  margin: { item: { horizontal: 10, vertical: 5 } },
  verticalScroll: true,
  zoomKey: 'ctrlKey'
} as const;