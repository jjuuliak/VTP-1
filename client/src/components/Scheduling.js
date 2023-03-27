import React, { useState, useEffect } from 'react';
import './Scheduling.css';
import { useTranslation } from 'react-i18next';

const Scheduling = ({ events, setEvents }) => {
  const [rows, setRows] = useState(events || []);
  const { t } = useTranslation();

  useEffect(() => {
    setRows(events);
  }, [events]);

    // Function to generate the week numbers
    const getWeekNumbers = () => {
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      const weekNumbers = [];
      for (let i = 0; i < 3; i++) {
        const currentWeek = new Date(startOfWeek);
        currentWeek.setDate(currentWeek.getDate() + 7 * i);
        const weekNumber = Math.ceil(
          (currentWeek - new Date(currentWeek.getFullYear(), 0, 1)) / 86400000 / 7
        );
        weekNumbers.push(`vko ${weekNumber}`);
      }
      return weekNumbers;
    };

  // Update the headers to use the generated week numbers
  const headers = getWeekNumbers();

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
    setRows((prevState) => (Array.isArray(prevState) ? [...prevState, newRow] : [newRow]));
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
      setEvents(rows);
    } catch (error) {
      console.error('Error:', error);
    }
  };  

  return (
    <div className="scheduling-container">
      <h2>{t('scheduling.title')}</h2>
      <table className="table">
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
                {headers.map((header, index) => (
                  <td key={index}>
                    {header === `vko ${row.week}` ? row.event : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
      <button className="scheduling-button" onClick={() => setShowForm(true)}>
        {t('scheduling.addColumn')}
      </button>
      {showForm && (
        <div className="modal" onClick={() => setShowForm(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <form className="scheduling-form" onSubmit={handleFormSubmit}>
              <label>
                {t('scheduling.event')}:
                <input
                  type="text"
                  name="event"
                  value={newEvent.event}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                {t('scheduling.person')}:
                <input
                  type="text"
                  name="person"
                  value={newEvent.person}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                {t('scheduling.week')}:
                <input
                  type="text"
                  name="week"
                  value={newEvent.week}
                  onChange={handleFormChange}
                />
              </label>
              <button type="submit" onClick={() => setEvents(rows)}>
                {t('scheduling.save')}
              </button>
              <button type="button" onClick={() => setShowForm(false)}>
                {t('scheduling.cancel')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheduling;