import React, { useState } from 'react';
import { TimelineView } from './components/timeline/TimelineView';
import { MenuBar } from './components/layout/MenuBar';
import { EventDialog } from './components/events/EventDialog';
import { useTimelineStore } from './store/timelineStore';
import { exportToJson, importFromJson } from './utils/fileUtils';

function App() {
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const { setTestRuns, setEvents, addEvent } = useTimelineStore();

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const importedData = await importFromJson(file);
          if (importedData.events) {
            setEvents(importedData.events);
          }
          if (importedData.testRuns) {
            setTestRuns(importedData.testRuns);
          }
        } catch (error) {
          console.error('Error importing file:', error);
          alert('Error importing file. Please make sure it\'s a valid JSON file.');
        }
      }
    };
    input.click();
  };

  const handleExport = () => {
    const state = useTimelineStore.getState();
    const exportData = {
      testRuns: state.testRuns,
      events: state.events,
      exportDate: new Date().toISOString()
    };
    exportToJson(exportData);
  };

  const handleAddEvent = (newEvent: Omit<Event, 'id'>) => {
    addEvent(newEvent);
    setIsEventDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MenuBar 
        onImport={handleImport} 
        onExport={handleExport} 
        onAddEvent={() => setIsEventDialogOpen(true)}
      />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <TimelineView />
      </main>
      <EventDialog
        isOpen={isEventDialogOpen}
        onClose={() => setIsEventDialogOpen(false)}
        onSubmit={handleAddEvent}
      />
    </div>
  );
}

export default App;