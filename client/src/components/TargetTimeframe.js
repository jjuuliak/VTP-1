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
            const suunniteltuDate = new Date(item.plannedDate);
            let suunniteltuCellClass = '';

            if (suunniteltuDate < currentDate && !item.actualDate) {
              suunniteltuCellClass = 'highlighted-date';
            }

            return (
              <tr key={item.target}>
                <td>{index === 0 ? <Link to="/inspection-plan">Tarkastussuunnitelma</Link> : item.target}</td>
                <td className={suunniteltuCellClass}>
                  <DatePicker selected={new Date(item.plannedDate)} />
                </td>
                <td>
                  <DatePicker
                    selected={item.actualDate ? new Date(item.actualDate) : null}
                  />
                </td>
                <td>{item.comments}</td>
                <td>
                  {index === 0 ? (
                    <Link to="/inspection-plan">Linkki tarkastussuunnitelmaan</Link>
                  ) : (
                    <a href={item.documentLink}>{item.documentLink}</a>
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