import React from "react";
import { Link, useLocation } from "react-router-dom";

function Jumbotron(props) {
  const location = useLocation();
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">Google Books Search</h1>
        <p className="lead">Search for and Save Books of Interest</p>
      </div>
    </div>
  );
}

export default Jumbotron;
