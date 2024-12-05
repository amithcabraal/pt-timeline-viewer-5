import React, { useEffect, useRef } from 'react';
import { Timeline as VisTimeline } from 'vis-timeline/standalone';
import { DataSet } from 'vis-data';
import 'vis-timeline/styles/vis-timeline-graph2d.css';

interface TimelineItem {
  id: number;
  content: string;
  start: Date;
  end: Date;
  className: string;
  title: string;
}

const statusColors = {
  PASSED: 'status-passed',
  FAILED: 'status-failed',
  STOPPED: 'status-stopped',
  SYSTEM_ERROR: 'status-error'
};

export const Timeline: React.FC<{ data: any[] }> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<VisTimeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = new DataSet<TimelineItem>(
      data.map(item => ({
        id: item.run_id,
        content: `${item.name} (${item.ui_status})`,
        start: new Date(parseInt(item.loadtestbegintime) || 0),
        end: new Date(parseInt(item.loadtestendtime) || 0),
        className: statusColors[item.ui_status as keyof typeof statusColors] || 'status-default',
        title: `
          Test: ${item.name}
          Status: ${item.ui_status}
          Duration: ${Math.round(item.duration / 1000)}s
          Virtual Users: ${item.api_vusers_num}
          Run By: ${item.test_run_user}
        `
      }))
    );

    const options = {
      height: '600px',
      start: new Date(),
      end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      zoomMin: 1000 * 60 * 60, // 1 hour
      zoomMax: 1000 * 60 * 60 * 24 * 31, // 31 days
      orientation: 'top',
      stack: true
    };

    timelineRef.current = new VisTimeline(containerRef.current, items, options);

    return () => {
      if (timelineRef.current) {
        timelineRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="p-4">
      <div className="mb-4">

        <div className="flex gap-4 mb-4">
          {Object.entries(statusColors).map(([status, className]) => (
            <div key={status} className="flex items-center">
              <div className={`w-4 h-4 rounded ${className} mr-2`}></div>
              <span>{status}</span>
            </div>
          ))}
        </div>
      </div>
      <div ref={containerRef} className="border rounded-lg shadow-lg"></div>
    </div>
  );
};