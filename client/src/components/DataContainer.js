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
    fetch('https://api.example.com/inspections')
      .then((response) => response.json())
      .then((data) => setInspectionData(data));
    fetch('https://api.example.com/documents')
      .then((response) => response.json())
      .then((data) => setLatestDocuments(data));
    fetch('https://api.example.com/scheduling')
      .then((response) => response.json())
      .then((data) => setSchedulingData(data));
    fetch('https://api.example.com/target-timeframe')
      .then((response) => response.json())
      .then((data) => setTargetTimeframeData(data));
  }, []);

  return (
    <>
      <TargetTimeframe targetTimeframeData={targetTimeframeData} />
      <InspectionInformation inspectionData={inspectionData} />
      <LatestDocuments latestDocuments={latestDocuments} />
      <Scheduling schedulingData={schedulingData} />
    </>
  );
};

export default DataContainer;