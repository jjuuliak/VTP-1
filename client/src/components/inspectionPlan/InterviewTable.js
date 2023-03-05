import React, { useState } from "react";

const InterviewTable = ({ data, setData, approvalChecked }) => {
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
      <h2>Haastattelut</h2>
      <table>
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
      </table>
      <div className="add-interview">
      {!showForm ? (
          <button onClick={() => setShowForm(true)} disabled={approvalChecked}>
            Lisää
          </button>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nimi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={approvalChecked}
            />
            <input
              type="text"
              placeholder="Titteli"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={approvalChecked}
            />
            <input
              type="text"
              placeholder="Yksikkö"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              disabled={approvalChecked}
            />
            <button type="submit" disabled={approvalChecked}>
              Tallenna
            </button>
            <button onClick={() => setShowForm(false)} disabled={approvalChecked}>
              Peruuta
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default InterviewTable;
