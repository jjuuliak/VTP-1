import React from 'react';
import './TargetTimeframe.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Table from './ui/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

const CustomTable = styled(Table)``;

const TargetTimeframe = ({ targetTimeframeData }) => {
  const currentDate = new Date();
  const { t } = useTranslation();

  const colWidths = ['180px', '180px', '180px', 'auto', '40px'];

  const HighlightedDate = styled.td`
    background-color: rgba(255, 0, 0, 0.6);
    color: white;
  `;

  const StyledDatePicker = styled(DatePicker)`
    width: 100%;
    padding: 0;
    font-size: 16px;
    border-radius: 0;
    border: none;
    background-color: inherit;
    box-sizing: border-box;
  `;

  return (
    <>
      <h2>{t('targetTimeframeTitle')}</h2>
      <CustomTable colWidths={colWidths}>
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
          {targetTimeframeData && targetTimeframeData.map((item, index) => {
            const suunniteltuDate = new Date(item.planned_date);
            const isHighlighted = suunniteltuDate < currentDate && !item.actual_date;

            return (
              <tr key={item.id}>
                <td>{index === 0 ? <Link to="/inspection-plan">{t('inspectionPlan')}</Link> : item.goal}</td>
                {isHighlighted ? (
                  <HighlightedDate>
                    <StyledDatePicker selected={new Date(item.planned_date)} />
                  </HighlightedDate>
                ) : (
                  <td>
                    <StyledDatePicker selected={new Date(item.planned_date)} />
                  </td>
                )}
                <td>
                  <StyledDatePicker
                    selected={item.actual_date ? new Date(item.actual_date) : null}
                  />
                </td>
                <td>{item.comments}</td>
                <td>
                  {index === 0 ? (
                    <Link to="/inspection-plan">
                      <FontAwesomeIcon icon={faFile} />
                    </Link>
                  ) : (
                    <a href={item.document_id}>{item.document_id}</a>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </CustomTable>
    </>
  );
};

export default TargetTimeframe;