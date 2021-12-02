import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from "./home/home";
import OrgChart from "./edit-node/chart";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="wrapper">
        <nav>
          <NavLink to="/chart" activeClassName="selected">
            OrgChart
          </NavLink>
        </nav>

        <Route exact path="/" component={Home} />
        <Route exact path="/chart" component={OrgChart} />
      </div>
    </Router>
  );
};

export default App;
