import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import DataContainer from './components/DataContainer';
import InspectionPlan from './InspectionPlan';
import Homepage from './components/Homepage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/tarkastukset" element={<Outlet />}>
              <Route path=":inspectionId" element={<DataContainer />} />
            </Route>
            <Route path="/inspection-plan" element={<InspectionPlan />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;