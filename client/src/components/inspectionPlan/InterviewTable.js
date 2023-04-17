import React, { useState } from "react";
import Table from '../ui/Table';
import Button from '../ui/Button';
import TextInput from '../ui/TextInput';
import styled from 'styled-components';

const InterviewTableTitle = styled.h2`
  margin-bottom: 1rem;
`;

const InterviewTable = ({ data, setData, approvalChecked }) => {
  const colWidths = ['33%', '33%', '34%'];

  const [interviews, setInterviews] = useState(data);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [unit, setUnit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setInterviews([...interviews, { name, title, unit }]);
    setData([...interviews, { name, title, unit }]); // update parent state
    setShowForm(false);
    setName("");
    setTitle("");
    setUnit("");
  };

  return (
    <div className="interview-table">
      <InterviewTableTitle>Haastattelut</InterviewTableTitle>
      <Table colWidths={colWidths}>
        <thead>
          <tr>
            <th>Nimi</th>
            <th>Titteli</th>
            <th>Yksikkö</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview, index) => (
            <tr key={index}>
              <td>{interview.name}</td>
              <td>{interview.title}</td>
              <td>{interview.unit}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="add-interview">
      {!showForm ? (
          <Button onClick={() => setShowForm(true)} disabled={approvalChecked}>
            Lisää
          </Button>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextInput
              type="text"
              placeholder="Nimi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={approvalChecked}
            />
            <TextInput
              type="text"
              placeholder="Titteli"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={approvalChecked}
            />
            <TextInput
              type="text"
              placeholder="Yksikkö"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              disabled={approvalChecked}
            />
            <Button type="submit" disabled={approvalChecked}>
              Tallenna
            </Button>
            <Button onClick={() => setShowForm(false)} disabled={approvalChecked}>
              Peruuta
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default InterviewTable;
