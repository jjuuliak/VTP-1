import React from 'react';
import './LatestDocuments.css';

const LatestDocuments = ({ latestDocuments }) => {
  return (
    <div className="latest-documents">
      <h2>Latest Documents</h2>
      <table>
        <thead>
          <tr>
            <th>Dokumentti</th>
            <th>Käsittelijä</th>
            <th>Muokattu</th>
          </tr>
        </thead>
        <tbody>
          {latestDocuments.map((document) => (
            <tr key={document.id}>
              <td>{document.title}</td>
              <td>{document.handler}</td>
              <td>{document.modified}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatestDocuments;
