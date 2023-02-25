import React from 'react';
import Navigation from './components/Navigation';
import InspectionInformation from './components/InspectionInformation';
import LatestDocuments from './components/LatestDocuments';
import Scheduling from './components/Scheduling';
import TargetTimeframe from './components/TargetTimeframe';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Navigation />
      <div className="main-container">
        <TargetTimeframe />
        <InspectionInformation />
        <LatestDocuments />
        <Scheduling />
      </div>
    </div>
  );
};

export default App;
