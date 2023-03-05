import React from 'react';

const BasicInformation = (props) => {
    const { kohde, aihe, virallinenKesto, kokonaiskesto, vastuuvalvoja, valvojanArvio } = props;
  
    return (
      <div>
        <h2>Tarkastuksen perustiedot</h2>
        <table>
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
        </table>
      </div>
    );
  };
  
  export default BasicInformation;