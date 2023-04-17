import React from 'react';
import styled from 'styled-components';
import Table from '../ui/Table';

const BasicInfoTitle = styled.h2`
  margin-bottom: 1rem;
`;

const StyledTable = styled(Table)`
  width: 100%;
`;

const BasicInformation = (props) => {
  const { kohde, aihe, virallinenKesto, kokonaiskesto, vastuuvalvoja, valvojanArvio } = props;

  return (
    <div>
      <BasicInfoTitle>Tarkastuksen perustiedot</BasicInfoTitle>
      <StyledTable>
        <tbody>
          <tr>
            <td>Tarkastuskohde:</td>
            <td>{kohde}</td>
          </tr>
          <tr>
            <td>Tarkastuksen aihe:</td>
            <td>{aihe}</td>
          </tr>
          <tr>
            <td>Tarkastuksen virallinen kesto:</td>
            <td>{virallinenKesto}</td>
          </tr>
          <tr>
            <td>Tarkastuksen kokonaiskesto:</td>
            <td>{kokonaiskesto}</td>
          </tr>
          <tr>
            <td>Vastuuvalvoja:</td>
            <td>{vastuuvalvoja}</td>
          </tr>
          <tr>
            <td>Valvojan arvio (viimeisin):</td>
            <td><a href={valvojanArvio}>Linkki arvioon</a></td>
          </tr>
        </tbody>
      </StyledTable>
    </div>
  );
};

export default BasicInformation;
