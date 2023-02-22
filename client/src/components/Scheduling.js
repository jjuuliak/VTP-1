import React, { useState } from 'react';
import './Scheduling.css';

const Scheduling = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      event: 'Laskutusaineisto',
      person: 'Kaisa',
      week: '1'
    },
    {
      id: 2,
      event: 'Palaveri',
      person: 'Matti',
      week: '3'
    },
    {
      id: 3,
      event: 'Tapaaminen',
      person: 'Jaana',
      week: '2'
    },
    {
      id: 4,
      event: 'Koulutus',
      person: 'Hanna',
      week: '1'
    }
  ]);

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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setRows((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        event: newEvent.event,
        person: newEvent.person,
        week: newEvent.week
      }
    ]);
    setNewEvent({
      event: '',
      person: '',
      week: ''
    });
    setShowForm(false);
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
        <tbody>
        {rows.map(row => (
          <tr key={row.id}>
            {[1, 2, 3].map((week) => (
              <td key={week}>
                {row.week === week.toString() ? row.event : ''}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
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
          <button type="submit">Tallenna</button>
        </form>
      )}
    </div>
  );
};

export default Scheduling;
