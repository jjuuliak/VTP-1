import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import DataContainer from './components/DataContainer';
import InspectionPlan from './InspectionPlan';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<DataContainer />} />
            <Route path="/inspection-plan" element={<InspectionPlan />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;