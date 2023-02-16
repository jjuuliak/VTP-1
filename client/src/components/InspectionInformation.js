// client/src/components/InspectionInformation/InspectionInformation.js
import React from 'react';
import './InspectionInformation.css';

const InspectionInformation = () => {
  return (
    <div className="inspection-information">
      <h2 className="inspection-information-title">Inspection Information</h2>
      <table className="inspection-information-table">
        <thead>
          <tr>
            <th>Valvonnan kohde</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Aihe</td>
            <td></td>
          </tr>
          <tr>
            <td>Riski-alue</td>
            <td></td>
          </tr>
          <tr>
            <td>Virallinen kesto</td>
            <td></td>
          </tr>
          <tr>
            <td>Kokonaiskesto</td>
            <td></td>
          </tr>
          <tr>
            <td>Osallistujat</td>
            <td></td>
          </tr>
          <tr>
            <td>Vastuuvalvoja</td>
            <td></td>
          </tr>
          <tr>
            <td>Toimisto</td>
            <td></td>
          </tr>
          <tr>
            <td>Osasto</td>
            <td></td>
          </tr>
          <tr>
            <td>Valvonnan kohteen yhteystiedot</td>
            <td></td>
          </tr>
          <tr>
            <td>Tarkastuksen yhteyshenkilö valvonnan kohteessa</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InspectionInformation;
