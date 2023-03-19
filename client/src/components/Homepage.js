import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [inspectionPlans, setInspectionPlans] = useState([]);

  const inspections = [
    { id: 1, name: 'Inspection 1' },
    { id: 2, name: 'Inspection 2' },
  ];

  const handleInspectionClick = async (inspection) => {
    setSelectedInspection(inspection);

    try {
      // No implementation for that kind of call yet
      //const response = await fetch(`http://localhost:8080/api/inspections/${inspection.id}`);
      const response = await fetch('http://localhost:8080/api/inspections');
      const data = await response.json();
      setInspectionPlans(data);
    } catch (error) {
      console.error('Error fetching inspection plans:', error);
    }
  };

  return (
    <div className="homepage-container">
      <div className="inspections-list">
        <h2>Valvonnan kohteet:</h2>
        <ul>
          {inspections.map((inspection) => (
            <li key={inspection.id} onClick={() => handleInspectionClick(inspection)}>
              {inspection.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="inspection-plans">
        {selectedInspection && (
          <>
            <h2>Inspection Plans for {selectedInspection.name}:</h2>
            <ul>
              {inspectionPlans && inspectionPlans.length > 0 ? (
                inspectionPlans.map((plan) => (
                  <li key={plan.id}>
                    <Link to={`/tarkastukset/${plan.id}`}>DataContainer for {plan.subjectOfInspection}</Link>
                  </li>
                ))
              ) : (
                <li>No inspection plans found.</li>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Homepage;
