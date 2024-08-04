import React, { useState } from 'react';

const EventForm = ({ addEvent }) => {
  const [event, setEvent] = useState({ name: '', date: '', location: '', description: '' });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEvent(event);
    setEvent({ name: '', date: '', location: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={event.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" name="date" value={event.date} onChange={handleChange} required />
      </div>
      <div>
        <label>Location:</label>
        <input type="text" name="location" value={event.location} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={event.description} onChange={handleChange} required></textarea>
      </div>
      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
