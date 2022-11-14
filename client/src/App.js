import "./App.css";

import { Route } from "react-router-dom";
import Main from "./components/Main";
import Nav from "./components/Nav";
import Home from "./components/Home";
import DetailCard from "./components/DetailCard";
import FormActivity from "./components/FormActivity";
//import Footer from "./components/Footer";
//import s from "../styles/Foorer.module.css";

function App() {
  return (
    <div className="App">
      <Route exact path={"/"} component={Main} />
      <Route path={"/home"}>
        <Nav />
        <Home />
        {/* <Footer className={s.footer} /> */}
      </Route>

      <Route path={"/detail/:id"}>
        <Nav />
        <DetailCard />
      </Route>

      <Route path={"/activity"}>
        <Nav />
        <FormActivity />
      </Route>
    </div>
  );
}

export default App;
