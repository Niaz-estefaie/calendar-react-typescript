import React, { useState } from 'react';
import { EventFormProps } from '../interfaces/eventTypes';

const EventForm: React.FC<EventFormProps> = ({ initialTitle = '', initialDate = '', onSave }) => {
  const [title, setTitle] = useState(initialTitle);
  const [date, setDate] = useState(initialDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(title, date);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default EventForm;
