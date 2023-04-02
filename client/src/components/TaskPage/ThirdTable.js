import React from 'react';
import { useTranslation } from 'react-i18next';

const ThirdTable = ({ data, onCloseTask }) => {
  const { t } = useTranslation();

  return (
    <table>
      <thead>
        <tr>
          <th>{t('tasks.taskId')}</th>
          <th>{t('tasks.status')}</th>
          <th>{t('tasks.methodsAndTasks')}</th>
          <th>{t('tasks.startDate')}</th>
          <th>{t('tasks.endDate')}</th>
          <th>{t('tasks.comments')}</th>
          <th>{t('tasks.materialLink')}</th>
          <th>{t('tasks.workpapersLink')}</th>
          <th>{t('tasks.responsible')}</th>
          <th>{t('tasks.notes')}</th>
          <th>{t('tasks.action')}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((task, index) => (
          <tr key={index}>
            <td>{task.id}</td>
            <td>{task.status}</td>
            <td>{task.methodsAndTasks.join(', ')}</td>
            <td>{task.startDate}</td>
            <td>{task.endDate}</td>
            <td>{task.comments}</td>
            <td>
              <a href={task.materialLink}>{t('tasks.link')}</a>
            </td>
            <td>
              <a href={task.workpapersLink}>{t('tasks.link')}</a>
            </td>
            <td>{task.responsible}</td>
            <td>{task.notes}</td>
            <td>
              <button onClick={() => onCloseTask(task.id)}>{t('tasks.closeTask')}</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ThirdTable;
