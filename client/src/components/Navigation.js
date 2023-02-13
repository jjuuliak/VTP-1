import React, { useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <button onClick={() => setIsOpen(!isOpen)}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </button>
      {isOpen && (
        <ul className="navbar-nav">
        <li className="nav-item">
          <a href="#" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">The name of the current inspection</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Templates</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Finished Documents</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Regulation</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Other instructions</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Tasks</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Material provided by the target of the inspection</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Interviews</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Enter an observation</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Observations and actions</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Final actions (summary, working hours, overall significance)</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Contact</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Q & A</a>
        </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
