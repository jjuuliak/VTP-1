import React from 'react';
import styled from 'styled-components';
import Table from '../ui/Table';

const TimetableTitle = styled.h2`
  margin-bottom: 1rem;
`;

const StyledTable = styled(Table)`
  width: 100%;
  margin-bottom: 1rem;
`;

const Timetable = ({ data }) => {
  return (
    <div>
      <TimetableTitle>Tavoiteaikataulu</TimetableTitle>
      <StyledTable>
        <thead>
          <tr>
            <th>Tavoite</th>
            <th>Suunniteltu pvm</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.tavoite}</td>
              <td>{item.suunniteltuPvm}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default Timetable;
