import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InspectionInformation from './InspectionInformation';
import LatestDocuments from './LatestDocuments';
import Scheduling from './Scheduling';
import TargetTimeframe from './TargetTimeframe';
import Card from './ui/Card';
import PageContainer from './ui/PageContainer';

const DataContainer = () => {
  const { inspectionId } = useParams();
  const [draftData, setDraftData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8080/api/drafts/${inspectionId}/full`)
      .then((response) => response.json())
      .then((data) => setDraftData(data));
  }, [inspectionId]);

  const handleSchedulingDataUpdate = (data) => {
    setDraftData({ ...draftData, scheduling: data });
  };

  return (
    <PageContainer>
      <Card>
        <TargetTimeframe targetTimeframeData={draftData.target_timeframes} />
      </Card>
      <Card>
        <InspectionInformation inspectionData={draftData} />
      </Card>
      <Card>
        <LatestDocuments latestDocuments={draftData.documents} />
      </Card>
      <Card>
        <Scheduling
          events={draftData.scheduling}
          setEvents={handleSchedulingDataUpdate}
          draftId={draftData.draft_id} />
      </Card>
    </PageContainer>
  );
};

export default DataContainer;
