import React from "react";
import "./home.css";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-wrapper">
      <div>
        <NavLink to="chart">Click to View Chart</NavLink>
      </div>
    </div>
  );
};

export default Home;
