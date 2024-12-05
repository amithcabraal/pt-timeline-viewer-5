export interface TestRun {
  run_id: number;
  name: string;
  ui_status: 'PASSED' | 'FAILED' | 'STOPPED' | 'SYSTEM_ERROR';
  duration: number;
  test_run_user: string;
  api_vusers_num: number;
  loadtestbegintime: string;
  loadtestendtime: string;
}

export interface TimelineItem {
  id: number | string;
  content: string;
  start: Date;
  end?: Date;
  className: string;
  title: string;
  type?: string;
}

export interface Tag {
  id: string;
  label: string;
  color: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  tags: Tag[];
}

export interface TimelineFilters {
  startDate: Date | null;
  endDate: Date | null;
  searchText: string;
  categories: string[];
}