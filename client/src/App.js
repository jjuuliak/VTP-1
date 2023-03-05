import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import InspectionInformation from './components/InspectionInformation';
import LatestDocuments from './components/LatestDocuments';
import Scheduling from './components/Scheduling';
import TargetTimeframe from './components/TargetTimeframe';
import InspectionPlan from './InspectionPlan';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<>
              <TargetTimeframe />
              <InspectionInformation />
              <LatestDocuments />
              <Scheduling />
            </>} />
            <Route path="/inspection-plan" element={<InspectionPlan />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
