import { TestRun, TimelineItem } from '../types/timeline';
import { STATUS_COLORS } from '../constants/timeline';
import { Edit2, Trash2 } from 'lucide-react';

export const formatTooltip = (item: TestRun): string => {
  return `
<table class="timeline-tooltip">
  <tr><td><strong>Test:</strong></td><td>${item.name}</td></tr>
  <tr><td><strong>Status:</strong></td><td>${item.ui_status}</td></tr>
  <tr><td><strong>Duration:</strong></td><td>${Math.round(item.duration / 1000)}s</td></tr>
  <tr><td><strong>Virtual Users:</strong></td><td>${item.api_vusers_num}</td></tr>
  <tr><td><strong>Run By:</strong></td><td>${item.test_run_user}</td></tr>
  <tr><td><strong>Start:</strong></td><td>${new Date(parseInt(item.loadtestbegintime)).toLocaleString()}</td></tr>
  <tr><td><strong>End:</strong></td><td>${new Date(parseInt(item.loadtestendtime)).toLocaleString()}</td></tr>
</table>
`.trim();
};

export const createTimelineItems = (data: TestRun[]): TimelineItem[] => {
  return data.map(item => ({
    id: item.run_id,
    content: `${item.name} (${item.api_vusers_num} VUs)`,
    start: new Date(parseInt(item.loadtestbegintime)),
    end: new Date(parseInt(item.loadtestendtime)),
    className: STATUS_COLORS[item.ui_status] || 'status-default',
    title: formatTooltip(item)
  }));
};