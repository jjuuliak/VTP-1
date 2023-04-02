import React from 'react';
import { useTranslation } from 'react-i18next';

const SecondTable = ({ data }) => {
  const { t } = useTranslation();

  return (
    <table>
      <thead>
        <tr>
          <th>{t('tasks.materialFromSubject')}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((task, index) => (
          <tr key={index}>
            <td>{task.materialFromSubject}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SecondTable;
