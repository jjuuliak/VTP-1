import React from 'react';

const Timetable = ({ data }) => {
  return (
    <div>
      <h2>Tavoiteaikataulu</h2>
      <table>
        <thead>
          <tr>
            <th>Tavoite</th>
            <th>Suunniteltu pvm</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.tavoite}</td>
              <td>{item.suunniteltuPvm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
