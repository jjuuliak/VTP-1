import React from 'react';
import './InfoBox.css';

const InfoBox = ({ title, text }) => {
  return (
    <div className="info-box">
      <h2>{title}</h2>
      <div className="info-box-text">
        {text}
      </div>
    </div>
  );
};

export default InfoBox;
