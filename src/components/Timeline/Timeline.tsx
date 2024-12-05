import React, { useEffect, useRef } from 'react';
import { Timeline as VisTimeline } from 'vis-timeline/standalone';
import { DataSet } from 'vis-data';
import { TimelineLegend } from './TimelineLegend';
import { TIMELINE_OPTIONS } from '../../constants/timeline';
import { createTimelineItems } from '../../utils/timelineData';
import { TestRun } from '../../types/timeline';
import 'vis-timeline/styles/vis-timeline-graph2d.css';

interface TimelineProps {
  data: TestRun[];
}

export const Timeline: React.FC<TimelineProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<VisTimeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = new DataSet(createTimelineItems(data));
    timelineRef.current = new VisTimeline(containerRef.current, items, TIMELINE_OPTIONS);

    return () => {
      if (timelineRef.current) {
        timelineRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <TimelineLegend />
      </div>
      <div ref={containerRef} className="border rounded-lg shadow-lg min-h-[600px]"></div>
    </div>
  );
};