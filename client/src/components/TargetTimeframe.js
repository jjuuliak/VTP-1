import React from 'react';
import './TargetTimeframe.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

const TargetTimeframe = ({ targetTimeframeData }) => {
  const currentDate = new Date();

  return (
    <div className="target-timeframe-container">
      <h2>Tavoiteaikataulu</h2>
      <table className="target-timeframe-table">
        <thead>
          <tr>
            <th>Tavoite</th>
            <th>Suunniteltu pvm</th>
            <th>Toteutunut pvm</th>
            <th>Kommentit</th>
            <th>Linkki valmiseen dokumenttiin</th>
          </tr>
        </thead>
        <tbody>
          {targetTimeframeData.map((item, index) => {
            const suunniteltuDate = new Date(item.planned_date);
            let suunniteltuCellClass = '';

            if (suunniteltuDate < currentDate && !item.actual_date) {
              suunniteltuCellClass = 'highlighted-date';
            }

            return (
              <tr key={item.id}>
                <td>{index === 0 ? <Link to="/inspection-plan">Tarkastussuunnitelma</Link> : item.goal}</td>
                <td className={suunniteltuCellClass}>
                  <DatePicker selected={new Date(item.planned_date)} />
                </td>
                <td>
                  <DatePicker
                    selected={item.actual_date ? new Date(item.actual_date) : null}
                  />
                </td>
                <td>{item.comments}</td>
                <td>
                  {index === 0 ? (
                    <Link to="/inspection-plan">Linkki tarkastussuunnitelmaan</Link>
                  ) : (
                    <a href={item.document_id}>{item.document_id}</a>
                  )}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TargetTimeframe;