import React from 'react';
import { useTranslation } from 'react-i18next';

const FirstTable = ({ data }) => {

  const { t } = useTranslation();
  
  return (
    <table>
      <thead>
        <tr>
          <th>{t('tasks.topicArea')}</th>
          <th>{t('tasks.responsiblePerson')}</th>
          <th>{t('tasks.criteria')}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((task, index) => (
          <tr key={index}>
            <td>{task.topicArea}</td>
            <td>{task.responsiblePersons.join(', ')}</td>
            <td>{task.criteria.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FirstTable;
