import React from "react";
import "../styles/Loading.css";

export default function Loading() {
  return (
    <div className="top_container">
      <div className="loading-container">
        <div className="loading">
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
        </div>
        <p className="loading-text">loading</p>
      </div>
    </div>
  );
}
