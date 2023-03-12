import React from 'react';
import './LatestDocuments.css';

const LatestDocuments = ({ latestDocuments }) => {
  const formatDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    const formattedDate = new Date(date).toLocaleDateString('fi-FI', options);
    return formattedDate;
  };

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
              <td>{formatDate(document.modified)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatestDocuments;
