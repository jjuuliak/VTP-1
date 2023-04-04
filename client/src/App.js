import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { StepPopupProvider } from './contexts/StepPopupContext';
import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import DataContainer from './components/DataContainer';
import InspectionPlan from './InspectionPlan';
import TaskPage from './components/TaskPage/TaskPage';
import Homepage from './components/Homepage';
import './App.css';

const App = () => {
  useEffect(() => {
    document.title = "VTP";
  }, []);
  return (
    <StepPopupProvider>
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
              <Route path="/tasks" element={<TaskPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </StepPopupProvider>
  );
};

export default App;