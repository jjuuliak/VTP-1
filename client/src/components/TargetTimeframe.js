import React from 'react';
import './TargetTimeframe.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TargetTimeframe = ({ targetTimeframeData }) => {
  const currentDate = new Date();
  const { t } = useTranslation();

  return (
    <div className="target-timeframe-container">
      <h2>{t('targetTimeframeTitle')}</h2>
      <table className="target-timeframe-table">
        <thead>
          <tr>
            <th>{t('target')}</th>
            <th>{t('plannedDate')}</th>
            <th>{t('actualDate')}</th>
            <th>{t('comments')}</th>
            <th>{t('documentLink')}</th>
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
                <td>{index === 0 ? <Link to="/inspection-plan">{t('inspectionPlan')}</Link> : item.goal}</td>
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
                    <Link to="/inspection-plan">{t('inspectionPlanLink')}</Link>
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