import React from 'react';
import Navigation from './components/Navigation';
import InspectionInformation from './components/InspectionInformation';
import LatestDocuments from './components/LatestDocuments';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Navigation />
      <div className="main-container">
        <InspectionInformation />
        <LatestDocuments />
      </div>
    </div>
  );
};

export default App;
