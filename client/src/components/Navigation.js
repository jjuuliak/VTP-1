import React, { useState } from 'react';
import AddObservationForm from "./AddObservationForm";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = (observation) => {
    console.log("New observation:", observation);
    // Implement the logic for adding a new observation to the backend.
  };

  return (
    <nav className="navbar">
      <button onClick={() => setIsOpen(!isOpen)}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </button>
      {isOpen && (
        <ul className="navbar-nav">
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
        </ul>
      )}
      <AddObservationForm
        open={isFormOpen}
        handleClose={() => setIsFormOpen(false)}
        handleSubmit={handleSubmit}
      />
    </nav>
  );
};

export default Navigation;
