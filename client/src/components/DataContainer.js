import React, { useState, useEffect } from 'react';
import InspectionInformation from './InspectionInformation';
import LatestDocuments from './LatestDocuments';
import Scheduling from './Scheduling';
import TargetTimeframe from './TargetTimeframe';

const DataContainer = () => {
  const [inspectionData, setInspectionData] = useState([]);
  const [latestDocuments, setLatestDocuments] = useState([]);
  const [schedulingData, setSchedulingData] = useState([]);
  const [targetTimeframeData, setTargetTimeframeData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/targettimeframes')
      .then((response) => response.json())
      .then((data) => setTargetTimeframeData(data));
    fetch('http://localhost:8080/api/inspections')
      .then((response) => response.json())
      .then((data) => setInspectionData(data));
    fetch('http://localhost:8080/api/documents')
      .then((response) => response.json())
      .then((data) => setLatestDocuments(data));
    fetch('http://localhost:8080/api/scheduling')
      .then((response) => response.json())
      .then((data) => setSchedulingData(data));
  }, []);

  const handleSchedulingDataUpdate = (data) => {
    setSchedulingData(data);
  };

  return (
    <>
      <TargetTimeframe targetTimeframeData={targetTimeframeData} />
      <InspectionInformation inspectionData={inspectionData} />
      <LatestDocuments latestDocuments={latestDocuments} />
      <Scheduling schedulingData={schedulingData} setSchedulingData={handleSchedulingDataUpdate} />
    </>
  );
};

export default DataContainer;
