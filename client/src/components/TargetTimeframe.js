import React from 'react';
import './TargetTimeframe.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

const TargetTimeframe = () => {
  const data = [
    {
      target: <Link to="/inspection-plan">Tarkastussuunnitelma</Link>,
      plannedDate: '2023-02-21',
      actualDate: '2023-02-23',
      comments: '',
      documentLink: <Link to="/inspection-plan">Linkki tarkastussuunnitelmaan</Link>
    },
    {
      target: 'Increase sales',
      plannedDate: '2023-01-01',
      actualDate: '2023-03-31',
      comments: 'Some comments here',
      documentLink: 'https://example.com'
    },
    {
      target: 'Launch new product',
      plannedDate: '2023-02-01',
      actualDate: '',
      comments: 'Some comments here',
      documentLink: 'https://example.com'
    },
    {
      target: 'Improve customer satisfaction',
      plannedDate: '2023-01-15',
      actualDate: '2023-12-31',
      comments: 'Some comments here',
      documentLink: 'https://example.com'
    },
    {
      target: 'Expand into new markets',
      plannedDate: '2023-03-01',
      actualDate: '2024-01-31',
      comments: 'Some comments here',
      documentLink: 'https://example.com'
    }
  ];

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
          {data.map((item) => {
            const suunniteltuDate = new Date(item.plannedDate);
            let suunniteltuCellClass = '';

            if (suunniteltuDate < currentDate && !item.actualDate) {
              suunniteltuCellClass = 'highlighted-date';
            }

            return (
              <tr key={item.target}>
                <td>{item.target}</td>
                <td className={suunniteltuCellClass}>
                  <DatePicker selected={new Date(item.plannedDate)} />
                </td>
                <td>
                  <DatePicker
                    selected={item.actualDate ? new Date(item.actualDate) : null}
                  />
                </td>
                <td>{item.comments}</td>
                <td>{item.documentLink}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TargetTimeframe;
