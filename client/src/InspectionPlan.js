import React, { useState } from 'react';
import BasicInformation from './components/inspectionPlan/BasicInformation';
import Participants from './components/inspectionPlan/Participants';
import Timetable from './components/inspectionPlan/Timetable';
import InspectionSteps from './components/inspectionPlan/InspectionSteps';
import InfoBox from './components/inspectionPlan/InfoBox';
import TopicAreas from './components/inspectionPlan/TopicAreas';
import InterviewTable from './components/inspectionPlan/InterviewTable';
import CommentTable from './components/inspectionPlan/CommentTable';
import './InspectionPlan.css';

const InspectionPlan = () => {
  const inspectionData = {
    kohde: 'Norppapankki',
    aihe: 'Rahanpesu valtiossa',
    virallinenKesto: '01.02.2022-01.08.2022',
    kokonaiskesto: '01.02.2022-31.08.2022',
    vastuuvalvoja: 'Martti Möttönen',
    valvojanArvio: 'Linkki arvioon'
  };

  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: 'Matti Meikäläinen',
      email: 'matti.meikalainen@example.com',
      phone: '050 123 4567',
      htp: '60',
      responsibility: 'Tarkastuksen vetäjä'
    },
    {
      id: 2,
      name: 'Pekka Virtanen',
      email: 'pekka.virtanen@example.com',
      phone: '040 234 5678',
      htp: '30',
      responsibility: 'Tarkastusryhmän jäsen'
    }
  ]);

  const timetableData = [
    { tavoite: 'Tarkastussuunnitelma', suunniteltuPvm: '01.03.2022' },
    { tavoite: 'Aloituskirje (Toteutunut aloitus)', suunniteltuPvm: '15.03.2022' },
    { tavoite: 'Materiaalipyyntö', suunniteltuPvm: '15.03.2022' },
    { tavoite: 'Aloitustapaaminen', suunniteltuPvm: '22.03.2022' },
    { tavoite: 'On-site/Off-site', suunniteltuPvm: '29.03.2022' },
    { tavoite: 'Tarkastusraportti laadunvarmistukseen', suunniteltuPvm: '05.04.2022' },
    { tavoite: 'Tarkastusraporttiluonnos ja kommentointilomake valvonnan kohteelle', suunniteltuPvm: '12.04.2022' },
    { tavoite: 'Lopputapaaminen', suunniteltuPvm: '15.06.2022' },
    { tavoite: 'Valvonnan kohteen kommentit tarkastusraporttiluonnokseen', suunniteltuPvm: '' },
    { tavoite: 'Lopullinen tarkastusraportti valmis (Toteutunut lopetus)', suunniteltuPvm: '' },
  ];

  const [stepsData, setStepsData] = useState([
    {
      vaiheistus: 'Vaihe 1',
      ajankohta: '15.03.2022',
      osallistujat: 'Tarkastuksen vetäjä'
    },
    {
      vaiheistus: 'Vaihe 2',
      ajankohta: '22.03.2022',
      osallistujat: 'Tarkastusryhmän jäsenet'
    }
  ]);

  const topicData = [
    { area: 'Alue 1', criteria: 'Kriteeri 1' },
    { area: 'Alue 2', criteria: 'Kriteeri 2' },
    { area: 'Alue 3', criteria: 'Kriteeri 3' },
  ];

  const [interviewData, setInterviewData] = useState([
    { name: "John Doe", title: "CEO", unit: "Sales" },
    { name: "Jane Smith", title: "CFO", unit: "Finance" },
  ]);

  const [commentsData, setCommentsData] = useState([]);
  const [approvalChecked, setApprovalChecked] = useState(false);

  return (
    <div>
      <h1>Inspection Plan</h1>
      <div className="components-container">
        <div className="component">
          <BasicInformation {...inspectionData} />
        </div>
        <div className="component">
          <Participants participants={participants} setParticipants={setParticipants} approvalChecked={approvalChecked} />
        </div>
      </div>
      <div className="components-container">
        <div className="component">
          <Timetable data={timetableData} />
        </div>
        <div className="component">
          <InspectionSteps stepsData={stepsData} setStepsData={setStepsData} approvalChecked={approvalChecked} />
        </div>
      </div>
      <InfoBox title="Tavoite" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non ex quis lorem hendrerit bibendum quis id lorem. Praesent blandit vel ante eu tempor. Fusce venenatis malesuada sem, eu commodo enim facilisis eget. Donec lobortis tortor sit amet commodo malesuada. Nulla facilisi. Sed viverra sapien nisl, vitae faucibus odio hendrerit quis." className="full-width" />
      <TopicAreas data={topicData} approvalChecked={approvalChecked} className="full-width" />
      <InfoBox title="Peruste" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non ex quis lorem hendrerit bibendum quis id lorem. Praesent blandit vel ante eu tempor. Fusce venenatis malesuada sem, eu commodo enim facilisis eget. Donec lobortis tortor sit amet commodo malesuada. Nulla facilisi. Sed viverra sapien nisl, vitae faucibus odio hendrerit quis." className="full-width" />
      <InfoBox title="Aihe" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non ex quis lorem hendrerit bibendum quis id lorem. Praesent blandit vel ante eu tempor. Fusce venenatis malesuada sem, eu commodo enim facilisis eget. Donec lobortis tortor sit amet commodo malesuada. Nulla facilisi. Sed viverra sapien nisl, vitae faucibus odio hendrerit quis." className="full-width" />
      <InfoBox title="Ulkopuolelle rajattavat kokonaisuudet" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non ex quis lorem hendrerit bibendum quis id lorem. Praesent blandit vel ante eu tempor. Fusce venenatis malesuada sem, eu commodo enim facilisis eget. Donec lobortis tortor sit amet commodo malesuada. Nulla facilisi. Sed viverra sapien nisl, vitae faucibus odio hendrerit quis." className="full-width" />
      <InfoBox title="Tarkastusmenetelmät" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non ex quis lorem hendrerit bibendum quis id lorem. Praesent blandit vel ante eu tempor. Fusce venenatis malesuada sem, eu commodo enim facilisis eget. Donec lobortis tortor sit amet commodo malesuada. Nulla facilisi. Sed viverra sapien nisl, vitae faucibus odio hendrerit quis." className="full-width" />
      <InfoBox title="Otanta" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non ex quis lorem hendrerit bibendum quis id lorem. Praesent blandit vel ante eu tempor. Fusce venenatis malesuada sem, eu commodo enim facilisis eget. Donec lobortis tortor sit amet commodo malesuada. Nulla facilisi. Sed viverra sapien nisl, vitae faucibus odio hendrerit quis." className="full-width" />
      <div className="component full-width">
        <InterviewTable data={interviewData} setData={setInterviewData} approvalChecked={approvalChecked} />
      </div>
      <div className="component full-width">
        <CommentTable data={commentsData} setData={setCommentsData} approvalChecked={approvalChecked} setApprovalChecked={setApprovalChecked} />
      </div>
      {/* Add any other components you need here */}
    </div>
  );
};

export default InspectionPlan;