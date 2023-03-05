import React, { useState } from 'react';

const TopicAreas = ({ data, approvalChecked }) => {
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
      <h2>Aihealueet ja niiden kriteerit</h2>
      <table>
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
      </table>
      {!showForm && (
        <button onClick={handleAddRow} disabled={approvalChecked}>Lisää rivi</button>
      )}
      {showForm && (
        <div>
          <input type="text" value={newTopic.area} onChange={handleAreaChange} placeholder="Aihealue" />
          <input type="text" value={newTopic.criteria} onChange={handleCriteriaChange} placeholder="Kriteeri" />
          <button onClick={handleSave}>Tallenna</button>
        </div>
      )}
    </div>
  );
};

export default TopicAreas;
