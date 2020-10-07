import React from "react";
import "../../styles/About.css";

export default function About() {
  return (
    <div className="about-container">
      <div className="about-section">
        <div className="inner-container">
          <h1>About</h1>
          <p className="text">
            This website is powered by a machine learning model that
            predicts prices of properties in Lagos State, Nigeria. The model
            uses publicly available data (from 2018 to date) on Nigerian
            property listing websites. <br /> Contact: danekehu@gmail.com
          </p>
          <div className="skills">
            <span>Python</span>
            <span>React</span>
            <span>AWS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
