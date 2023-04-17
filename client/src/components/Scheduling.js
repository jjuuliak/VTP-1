import React, { useState, useEffect } from 'react';
import './Scheduling.css';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Table from './ui/Table';
import Button from './ui/Button';
import Form from './ui/Form';
import TextInput from './ui/TextInput';

const SchedulingWrapper = styled.div`
`;

const Scheduling = ({ events, setEvents, draftId }) => {
  const [rows, setRows] = useState(events || []);
  const { t } = useTranslation();
  const colWidths = ['33.33%', '33.33%', '33.33%'];


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
      draft_id: draftId,
      event: newEvent.event,
      person: newEvent.person,
      week: newEvent.week,
    };
  
  
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
      setEvents((prevState) => (Array.isArray(prevState) ? [...prevState, newRow] : [newRow]));
    } catch (error) {
      console.error('Error:', error);
    }
  
    setNewEvent({
      event: '',
      person: '',
      week: '',
    });
    setShowForm(false);
  };

  return (
    <SchedulingWrapper>
      <h2>{t('scheduling.title')}</h2>
      <Table colWidths={colWidths}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        {rows && rows.length ? (
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
      </Table>
      <Button className="scheduling-button" onClick={() => setShowForm(true)}>
        {t('scheduling.addColumn')}
      </Button>
      {showForm && (
        <div className="modal" onClick={() => setShowForm(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <Form className="scheduling-form" onSubmit={handleFormSubmit}>
              <label>
                {t('scheduling.event')}:
                <TextInput
                  type="text"
                  name="event"
                  value={newEvent.event}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                {t('scheduling.person')}:
                <TextInput
                  type="text"
                  name="person"
                  value={newEvent.person}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                {t('scheduling.week')}:
                <TextInput
                  type="text"
                  name="week"
                  value={newEvent.week}
                  onChange={handleFormChange}
                />
              </label>
              <Button type="submit" onClick={() => setEvents(rows)}>
                {t('scheduling.save')}
              </Button>
              <Button type="button" onClick={() => setShowForm(false)}>
                {t('scheduling.cancel')}
              </Button>
            </Form>
          </div>
        </div>
      )}
    </SchedulingWrapper>
  );
};

export default Scheduling;