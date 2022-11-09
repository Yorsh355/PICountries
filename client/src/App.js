import React from "react";

import { Route } from "react-router-dom";
import Main from "./components/Main";
import Nav from "./components/Nav";
import Home from "./components/Home";
import DetailCard from "./components/DetailCard";
import FormActivity from "./components/FormActivity";

function App() {
  return (
    <React.Fragment>
      <Route exact path={"/"} component={Main} />
      <Route path={"/home"}>
        <Nav />
        <Home />
      </Route>

      <Route path={"/detail/:id"}>
        <Nav />
        <DetailCard />
      </Route>

      <Route path={"/activity"}>
        <Nav />
        <FormActivity />
      </Route>
    </React.Fragment>
  );
}

export default App;
