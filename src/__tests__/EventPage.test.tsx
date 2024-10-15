import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventPage from '../components/EventPage';

describe('EventPage Component', () => {
  test('renders the component with initial elements', () => {
    render(<EventPage />);
    
    expect(screen.getByText('Events')).toBeInTheDocument();
    
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test('adds a new event', () => {
    render(<EventPage />);

    const titleInput = screen.getByPlaceholderText('Event Title');
    const dateInput = screen.getByPlaceholderText('Date');
    const saveButton = screen.getByText('Save');

    fireEvent.change(titleInput, { target: { value: 'New Event' } });
    fireEvent.change(dateInput, { target: { value: '2024-10-15' } });
    fireEvent.click(saveButton);

    expect(screen.getByText('New Event')).toBeInTheDocument();
  });

//   test('edits an existing event', () => {
//     render(<EventPage />);

//     const titleInput = screen.getByPlaceholderText('Event Title');
//     const dateInput = screen.getByPlaceholderText('Date');
//     const saveButton = screen.getByText('Save');
    
//     fireEvent.change(titleInput, { target: { value: 'Event to Edit' } });
//     fireEvent.change(dateInput, { target: { value: '2024-10-15' } });
//     fireEvent.click(saveButton);

//     fireEvent.click(screen.getByText('Edit'));

//     fireEvent.change(titleInput, { target: { value: 'Edited Event' } });
//     fireEvent.click(saveButton);

//     expect(screen.getByText('Edited Event')).toBeInTheDocument();
//   });

//   test('deletes an event', () => {
//     render(<EventPage />);

//     const titleInput = screen.getByPlaceholderText('Event Title');
//     const dateInput = screen.getByPlaceholderText('Date');
//     const saveButton = screen.getByText('Save');
    
//     fireEvent.change(titleInput, { target: { value: 'Event to Delete' } });
//     fireEvent.change(dateInput, { target: { value: '2024-10-15' } });
//     fireEvent.click(saveButton);

//     fireEvent.click(screen.getByText('Delete'));

//     expect(screen.queryByText('Event to Delete')).not.toBeInTheDocument();
//   });
});
