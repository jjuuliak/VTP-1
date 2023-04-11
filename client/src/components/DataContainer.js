import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InspectionInformation from './InspectionInformation';
import LatestDocuments from './LatestDocuments';
import Scheduling from './Scheduling';
import TargetTimeframe from './TargetTimeframe';

const DataContainer = () => {
  const { inspectionId } = useParams();
  const [inspectionData, setInspectionData] = useState([]);
  const [latestDocuments, setLatestDocuments] = useState([]);
  const [schedulingData, setSchedulingData] = useState([]);
  const [targetTimeframeData, setTargetTimeframeData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/target_timeframes/${inspectionId}`)
      .then((response) => response.json())
      .then((data) => setTargetTimeframeData(Array.isArray(data) ? data : [data]));
    fetch(`http://localhost:8080/api/inspection_information/${inspectionId}`)
      .then((response) => response.json())
      .then((data) => setInspectionData(data));
    fetch(`http://localhost:8080/api/documents/${inspectionId}`)
      .then((response) => response.json())
      .then((data) => setLatestDocuments(Array.isArray(data) ? data : [data]));
    fetch(`http://localhost:8080/api/scheduling/${inspectionId}`)
      .then((response) => response.json())
      .then((data) => setSchedulingData(Array.isArray(data) ? data : [data]));
  }, [inspectionId]);

  const handleSchedulingDataUpdate = (data) => {
    setSchedulingData(data);
  };

  return (
    <>
      <TargetTimeframe targetTimeframeData={targetTimeframeData} />
      <InspectionInformation inspectionData={inspectionData} />
      <LatestDocuments latestDocuments={latestDocuments} />
      <Scheduling events={schedulingData} setEvents={handleSchedulingDataUpdate} draftId={inspectionData.draft_id} />
    </>
  );
};

export default DataContainer;
