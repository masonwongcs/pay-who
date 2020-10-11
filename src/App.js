import React from "react";
import InsertName from "./component/InsertName";
import GlobalStyled from "./GlobalStyled";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <GlobalStyled />
        <Switch>
          <Route path="/">
            <InsertName />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
