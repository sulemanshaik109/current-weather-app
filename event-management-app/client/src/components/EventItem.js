import React, { useState } from 'react';
import axios from 'axios';

const EventItem = ({ event, updateEvent, deleteEvent }) => {
  const [editing, setEditing] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({ ...event });

  const handleChange = (e) => {
    setUpdatedEvent({ ...updatedEvent, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateEvent(event.id, updatedEvent);
    setEditing(false);
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`/api/weather/${event.location}`);
      alert(`Weather in ${event.location}: ${response.data.weather}`);
    } catch (error) {
      console.error('Failed to fetch weather:', error);
    }
  };

  return (
    <div>
      {editing ? (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={updatedEvent.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Date:</label>
            <input type="date" name="date" value={updatedEvent.date} onChange={handleChange} required />
          </div>
          <div>
            <label>Location:</label>
            <input type="text" name="location" value={updatedEvent.location} onChange={handleChange} required />
          </div>
          <div>
            <label>Description:</label>
            <textarea name="description" value={updatedEvent.description} onChange={handleChange} required></textarea>
          </div>
          <button type="submit">Update Event</button>
        </form>
      ) : (
        <div>
          <h3>{event.name}</h3>
          <p>{event.date}</p>
          <p>{event.location}</p>
          <p>{event.description}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => deleteEvent(event.id)}>Delete</button>
          <button onClick={fetchWeather}>Fetch Weather</button>
        </div>
      )}
    </div>
  );
};

export default EventItem;
