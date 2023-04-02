import React from 'react';
import { useTranslation } from 'react-i18next';

const StepsTable = ({ data }) => {
  const { t } = useTranslation();

  return (
    <table>
      <thead>
        <tr>
          <th>{t('steps.phase')}</th>
          <th>{t('steps.events')}</th>
          <th>{t('steps.date')}</th>
          <th>{t('steps.participants')}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((step, index) => (
          <tr key={index}>
            <td>{step.phase}</td>
            <td>{step.events.join(', ')}</td>
            <td>{step.date}</td>
            <td>{step.participants.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StepsTable;
