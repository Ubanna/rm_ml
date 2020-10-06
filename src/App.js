import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import "./App.css";
import About from "./components/pages/About";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import { getLocations } from "./components/redux/actions/userActions";

function App() {
  // useEffect(() => {
  //   store.dispatch(getLocations());
  // }, []);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
          </Switch>
        </Router>
      </Provider>
    </>
  );
}

export default App;
