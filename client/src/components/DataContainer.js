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
    fetch('http://localhost:8080/api/targettimeframes')
      .then((response) => response.json())
      .then((data) => setTargetTimeframeData(data));
    fetch(`http://localhost:8080/api/inspections/${inspectionId}`)
      .then((response) => response.json())
      .then((data) => setInspectionData(data));
    fetch('http://localhost:8080/api/documents')
      .then((response) => response.json())
      .then((data) => setLatestDocuments(data));
    fetchSchedulingData();
  }, [inspectionId]);

  const handleSchedulingDataUpdate = (data) => {
    setSchedulingData(data);
  };

  const fetchSchedulingData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/scheduling');
      const data = await response.json();
      setSchedulingData(data);
    } catch (error) {
      console.error('Error fetching scheduling data:', error);
    }
  };
  

  return (
    <>
      <TargetTimeframe targetTimeframeData={targetTimeframeData} />
      <InspectionInformation inspectionData={inspectionData} />
      <LatestDocuments latestDocuments={latestDocuments} />
      <Scheduling events={schedulingData} setEvents={handleSchedulingDataUpdate} />
    </>
  );
};

export default DataContainer;
