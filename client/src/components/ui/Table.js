import React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1.5rem;

  th,
  td {
    padding: 8px 12px;
    text-align: left;
    border: 1px solid var(--border-grey);
    vertical-align: middle;
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
    color: var(--dark-grey-text);
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
  }
`;

const Table = ({ children, colWidths }) => {
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === 'thead') {
        return React.cloneElement(child, {
          children: React.Children.map(child.props.children, (row) => {
            if (React.isValidElement(row) && row.type === 'tr') {
              return React.cloneElement(row, {
                children: React.Children.map(row.props.children, (cell, index) => {
                  if (React.isValidElement(cell) && colWidths && colWidths[index]) {
                    return React.cloneElement(cell, {
                      style: { width: colWidths[index], maxWidth: colWidths[index] },
                    });
                  }
                  return cell;
                }),
              });
            }
            return row;
          }),
        });
      }
      return child;
    });
  };

  return <TableWrapper>{renderChildren()}</TableWrapper>;
};

export default Table;
