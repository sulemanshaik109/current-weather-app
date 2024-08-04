import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventItem from '../components/EventItem';
import EventForm from '../components/EventForm';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data.events);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = async (event) => {
    try {
      const response = await axios.post('http://localhost:5000/api/events', event);
      setEvents([...events, response.data.event]);
    } catch (error) {
      console.error('Failed to add event:', error);
    }
  };

  const updateEvent = async (id, updatedEvent) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/events/${id}`, updatedEvent);
      setEvents(events.map(event => (event.id === id ? response.data.event : event)));
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  return (
    <div>
      <h2>Event List</h2>
      <EventForm addEvent={addEvent} />
      {events.map(event => (
        <EventItem key={event.id} event={event} updateEvent={updateEvent} deleteEvent={deleteEvent} />
      ))}
    </div>
  );
};

export default Home;
