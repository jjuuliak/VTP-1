import React, { useState } from 'react';
import './Scheduling.css';

const Scheduling = ({ events, setEvents }) => {
  const [rows, setRows] = useState(events || []);

  const headers = ['vko 1', 'vko 2', 'vko 3'];

  const [showForm, setShowForm] = useState(false);

  const [newEvent, setNewEvent] = useState({
    event: '',
    person: '',
    week: ''
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setNewEvent((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const newRow = {
      id: rows.length + 1,
      event: newEvent.event,
      person: newEvent.person,
      week: newEvent.week
    };
    setRows((prevState) => [...prevState, newRow]);
    setNewEvent({
      event: '',
      person: '',
      week: ''
    });
    setShowForm(false);
  
    // Add this code to make a POST request to your backend
    try {
      const response = await fetch('http://localhost:8080/api/scheduling', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRow),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save scheduling data.');
      }
  
      // Update the parent component's state with the new scheduling data
      handleEventsUpdate();
    } catch (error) {
      console.error('Error:', error);
    }
  };  

  return (
    <div className="scheduling-container">
      <h2>Aikataulutus</h2>
      <table className="scheduling-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        {rows.length ? (
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {[1, 2, 3].map((week) => (
                  <td key={week}>
                    {row.week === week.toString() ? row.event : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
      <button className="scheduling-button" onClick={() => setShowForm(!showForm)}>
        Lisää tapahtuma
      </button>
      {showForm && (
        <form className="scheduling-form" onSubmit={handleFormSubmit}>
          <label>
            Tapahtuma:
            <input type="text" name="event" value={newEvent.event} onChange={handleFormChange} />
          </label>
          <label>
            Henkilö:
            <input type="text" name="person" value={newEvent.person} onChange={handleFormChange} />
          </label>
          <label>
            Viikko:
            <input type="text" name="week" value={newEvent.week} onChange={handleFormChange} />
          </label>
          <button type="submit" onClick={handleEventsUpdate}>Tallenna</button>
        </form>
      )}
    </div>
  );
};

export default Scheduling;