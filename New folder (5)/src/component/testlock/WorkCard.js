import React from 'react';
import { NavLink } from "react-router-dom";
import"./WorkCard.css";

function WorkCard({ imgUrl, title, description, source }) {
  return (
    <div className="projectcard">
      <img src={imgUrl} alt={title} />
      <h2 className="project-title">{title}</h2>
      <div className="pro-details">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default WorkCard;
