import React from 'react';
import './InspectionInformation.css';
import { useTranslation } from 'react-i18next';

const InspectionInformation = ({ inspectionData }) => {
  const data = inspectionData || {};
  const { t } = useTranslation();
  
  return (
    <div className="inspection-information">
      <h2 className="inspection-information-title">{t('inspectionInformationTitle')}</h2>
      <table className="inspection-information-table">
        <thead>
          <tr>
            <th>{t('subjectOfInspection')}</th>
            <th>{data.subjectOfInspection || ''}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t('issue')}</td>
            <td>{data.issue || ''}</td>
          </tr>
          <tr>
            <td>{t('riskArea')}</td>
            <td>{data.riskArea || ''}</td>
          </tr>
          <tr>
            <td>{t('officialDuration')}</td>
            <td>{data.officialDuration || ''}</td>
          </tr>
          <tr>
            <td>{t('totalDuration')}</td>
            <td>{data.totalDuration || ''}</td>
          </tr>
          <tr>
            <td>{t('participants')}</td>
            <td>{data.participants || ''}</td>
          </tr>
          <tr>
            <td>{t('responsibleInspector')}</td>
            <td>{data.responsibleInspector || ''}</td>
          </tr>
          <tr>
            <td>{t('office')}</td>
            <td>{data.office || ''}</td>
          </tr>
          <tr>
            <td>{t('department')}</td>
            <td>{data.department || ''}</td>
          </tr>
          <tr>
            <td>{t('subjectContactInformation')}</td>
            <td>{data.subjectContactInformation || ''}</td>
          </tr>
          <tr>
            <td>{t('inspectionContactPerson')}</td>
            <td>{data.inspectionContactPerson || ''}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InspectionInformation;