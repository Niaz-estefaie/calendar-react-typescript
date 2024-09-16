import React, { useState } from 'react';
import EventForm from './EventForm';
import { Event } from '../interfaces/eventTypes';

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const addEvent = (title: string, date: string) => {
    const newEvent: Event = { id: Date.now(), title, date };
    setEvents([...events, newEvent]);
  };

  const editEvent = (id: number) => {
    const event = events.find(event => event.id === id);
    if (event) setEditingEvent(event);
  };

  const updateEvent = (title: string, date: string) => {
    setEvents(events.map(event => 
      event.id === editingEvent?.id ? { ...event, title, date } : event
    ));
    setEditingEvent(null);
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div>
      <h1>Events</h1>
      {editingEvent ? (
        <EventForm
          initialTitle={editingEvent.title}
          initialDate={editingEvent.date}
          onSave={updateEvent}
        />
      ) : (
        <EventForm onSave={addEvent} />
      )}
    </div>
  );
};

export default EventPage;
