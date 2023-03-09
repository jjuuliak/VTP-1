// client/src/components/InspectionInformation/InspectionInformation.js
import React from 'react';
import './InspectionInformation.css';

const InspectionInformation = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }
  
  return (
    <div className="inspection-information">
      <h2 className="inspection-information-title">Tarkastuksen tiedot</h2>
      <table className="inspection-information-table">
        <thead>
          <tr>
            <th>Valvonnan kohde</th>
            <th>{data.subjectOfInspection}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Aihe</td>
            <td>{data.issue}</td>
          </tr>
          <tr>
            <td>Riski-alue</td>
            <td>{data.riskArea}</td>
          </tr>
          <tr>
            <td>Virallinen kesto</td>
            <td>{data.officialDuration}</td>
          </tr>
          <tr>
            <td>Kokonaiskesto</td>
            <td>{data.totalDuration}</td>
          </tr>
          <tr>
            <td>Osallistujat</td>
            <td>{data.participants}</td>
          </tr>
          <tr>
            <td>Vastuuvalvoja</td>
            <td>{data.responsibleInspector}</td>
          </tr>
          <tr>
            <td>Toimisto</td>
            <td>{data.office}</td>
          </tr>
          <tr>
            <td>Osasto</td>
            <td>{data.department}</td>
          </tr>
          <tr>
            <td>Valvonnan kohteen yhteystiedot</td>
            <td>{data.subjectContactInformation}</td>
          </tr>
          <tr>
            <td>Tarkastuksen yhteyshenkilö valvonnan kohteessa</td>
            <td>{data.inspectionContactPerson}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InspectionInformation;