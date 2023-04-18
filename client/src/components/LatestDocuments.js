import React from 'react';
import './LatestDocuments.css';
import { useTranslation } from 'react-i18next';
import Table from './ui/Table';
import styled from 'styled-components';

const LatestDocumentsWrapper = styled.div`
  h2 {
    margin-bottom: 1rem;
  }
`;

const LatestDocuments = ({ latestDocuments }) => {
  const { t } = useTranslation();
  const colWidths = ['260px'];

  const formatDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    const formattedDate = new Date(date).toLocaleDateString('fi-FI', options);
    return formattedDate;
  };

  return (
    <LatestDocumentsWrapper>
      <h2>{t('latestDocuments')}</h2>
      <Table colWidths={colWidths}>
        <thead>
          <tr>
            <th>{t('document')}</th>
            <th>{t('handler')}</th>
            <th>{t('modified')}</th>
          </tr>
        </thead>
        <tbody>
          {latestDocuments && latestDocuments.map((document) => (
            <tr key={document.id}>
              <td>{document.title}</td>
              <td>{document.handler}</td>
              <td>{formatDate(document.modified)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </LatestDocumentsWrapper>
  );
};

export default LatestDocuments;
