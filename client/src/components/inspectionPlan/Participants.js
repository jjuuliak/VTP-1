import React, { useState } from 'react';

const Participants = ({ participants, setParticipants, approvalChecked  }) => {
  const [showForm, setShowForm] = useState(false);
  const [newParticipant, setNewParticipant] = useState({
    name: '',
    email: '',
    phone: '',
    htp: '',
    responsibility: ''
  });
  const [editedParticipant, setEditedParticipant] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewParticipant((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setParticipants((prevState) => [...prevState, newParticipant]);
    setNewParticipant({
      name: '',
      email: '',
      phone: '',
      htp: '',
      responsibility: ''
    });
    setShowForm(false);
  };

  const handleEditClick = (event, participant) => {
    event.preventDefault();
    setEditedParticipant(participant);
  };

  const handleEditSubmit = (event, participant) => {
    event.preventDefault();
    setParticipants((prevState) =>
      prevState.map((p) => (p.id === participant.id ? participant : p))
    );
    setEditedParticipant(null);
  };

  return (
    <div>
      <h2>Osallistujat</h2>
      <table>
        <thead>
          <tr>
            <th>Nimi</th>
            <th>Sähköposti</th>
            <th>Matkapuhelinnumero</th>
            <th>Htp</th>
            <th>Vastuu</th>
            <th>Muokkaa</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.name}</td>
              <td>{participant.email}</td>
              <td>{participant.phone}</td>
              <td>{participant.htp}</td>
              <td>{participant.responsibility}</td>
              <td>
              {!editedParticipant || editedParticipant.id !== participant.id ? (
                  <button onClick={(event) => handleEditClick(event, participant)} disabled={approvalChecked}>
                    Muokkaa
                  </button>
                ) : (
                  <form onSubmit={(event) => handleEditSubmit(event, editedParticipant)}>
                    <div>
                      <label htmlFor="name">Nimi:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={editedParticipant.name}
                        onChange={(event) =>
                          setEditedParticipant((prevState) => ({
                            ...prevState,
                            name: event.target.value
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="email">Sähköposti:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={editedParticipant.email}
                        onChange={(event) =>
                          setEditedParticipant((prevState) => ({
                            ...prevState,
                            email: event.target.value
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="phone">Matkapuhelinnumero:</label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={editedParticipant.phone}
                        onChange={(event) =>
                          setEditedParticipant((prevState) => ({
                            ...prevState,
                            phone: event.target.value
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="htp">Htp:</label>
                      <input
                        type="text"
                        id="htp"
                        name="htp"
                        value={editedParticipant.htp}
                        onChange={(event) =>
                          setEditedParticipant((prevState) => ({
                            ...prevState,
                            htp: event.target.value
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="responsibility">Vastuu:</label>
                      <input
                        type="text"
                        id="responsibility"
                        name="responsibility"
                        value={editedParticipant.responsibility}
                        onChange={(event) =>
                          setEditedParticipant((prevState) => ({
                            ...prevState,
                            responsibility: event.target.value
                          }))
                        }
                      />
                    </div>
                    <button type="submit">Tallenna</button>
                    <button onClick={() => setEditedParticipant(null)}>Peruuta</button>
                  </form>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!showForm && (
        <button onClick={() => setShowForm(true)} disabled={approvalChecked}>
          Lisää osallistuja
        </button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nimi">Nimi:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newParticipant.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="sähköposti">Sähköposti:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newParticipant.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="matkapuhelinnumero">Matkapuhelinnumero:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={newParticipant.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="htp">Htp:</label>
            <input
              type="text"
              id="htp"
              name="htp"
              value={newParticipant.htp}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="responsibility">Vastuu:</label>
            <input
              type="text"
              id="responsibility"
              name="responsibility"
              value={newParticipant.responsibility}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Tallenna</button>
        </form>
      )}
    </div>
  );
};

export default Participants;
