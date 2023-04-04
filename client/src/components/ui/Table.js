import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;

  th,
  td {
    padding: 12px 15px;
    text-align: left;
    border: 1px solid var(--accent-grey);
  }

  thead th {
    background-color: var(--secondary-blue);
    color: white;
    font-weight: bold;
  }

  tbody tr:nth-child(odd) {
    background-color: var(--light-background);
  }

  tbody tr:nth-child(even) {
    background-color: white;
  }

  tbody tr:hover {
    background-color: var(--accent-grey);
    transition: background-color 0.2s;
  }
`;

const Table = ({ children, ...props }) => {
  return <StyledTable {...props}>{children}</StyledTable>;
};

export default Table;