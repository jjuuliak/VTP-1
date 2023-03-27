import React, { useState } from 'react';
import AddObservationForm from "./AddObservationForm";
import { useTranslation } from "react-i18next";
import './Navigation.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleSubmit = (observation) => {
    console.log("New observation:", observation);
    // Implement the logic for adding a new observation to the backend.
  };

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <button className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`navbar-nav ${isOpen ? 'open' : ''}`}>
        <ul>
          <li className="nav-item">
            <a href="#" className="nav-link">{t("nav.home")}</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">{t("nav.current_inspection")}</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">{t("nav.templates")}</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">{t("nav.finished_documents")}</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">{t("nav.regulation")}</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">{t("nav.other_instructions")}</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">{t("nav.tasks")}</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">{t("nav.material_provided")}</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">{t("nav.interviews")}</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={() => setIsFormOpen(true)}>
              {t("nav.enter_observation")}
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">{t("nav.observations_actions")}</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">{t("nav.final_actions")}</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">{t("nav.contact")}</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">{t("nav.qa")}</a>
          </li>
          <li className="nav-item">
            <select
              value={i18n.language}
              onChange={changeLanguage}
              className="language-selector"
            >
              <option value="en">{t("language.english")}</option>
              <option value="fi">{t("language.finnish")}</option>
              {/* Add more languages here */}
            </select>
          </li>
        </ul>
        <AddObservationForm
          open={isFormOpen}
          handleClose={() => setIsFormOpen(false)}
          handleSubmit={handleSubmit}
        />
      </div>
    </nav>
  );
};

export default Navigation;
