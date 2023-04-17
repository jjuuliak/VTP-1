import React, { useState } from 'react';
import Table from '../ui/Table';
import Button from '../ui/Button';
import TextInput from '../ui/TextInput';
import styled from 'styled-components';

const TopicAreasTitle = styled.h2`
  margin-bottom: 1rem;
`;

const TopicAreas = ({ data, approvalChecked }) => {
  const colWidths = ['50%', '50%'];

  const [newTopic, setNewTopic] = useState({ area: '', criteria: '' });
  const [showForm, setShowForm] = useState(false);

  const handleAreaChange = (event) => {
    setNewTopic({ ...newTopic, area: event.target.value });
  };

  const handleCriteriaChange = (event) => {
    setNewTopic({ ...newTopic, criteria: event.target.value });
  };

  const handleSave = () => {
    data.push(newTopic);
    setNewTopic({ area: '', criteria: '' });
    setShowForm(false);
  };

  const handleAddRow = () => {
    setShowForm(true);
  };

  return (
    <div className="topic-areas">
      <TopicAreasTitle>Aihealueet ja niiden kriteerit</TopicAreasTitle>
      <Table colWidths={colWidths}>
        <thead>
          <tr>
            <th>Aihealue</th>
            <th>Kriteeri</th>
          </tr>
        </thead>
        <tbody>
          {data.map((topic, index) => (
            <tr key={index}>
              <td>{topic.area}</td>
              <td>{topic.criteria}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {!showForm && (
        <Button onClick={handleAddRow} disabled={approvalChecked}>Lisää rivi</Button>
      )}
      {showForm && (
        <div>
          <TextInput
            type="text"
            value={newTopic.area}
            onChange={handleAreaChange}
            placeholder="Aihealue"
          />
          <TextInput
            type="text"
            value={newTopic.criteria}
            onChange={handleCriteriaChange}
            placeholder="Kriteeri"
          />
          <Button onClick={handleSave}>Tallenna</Button>
        </div>
      )}
    </div>
  );
};

export default TopicAreas;
