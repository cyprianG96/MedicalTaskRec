import React, { Fragment, FC } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import styled from "styled-components";
import { Countries, Continents } from "./components/index";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const Linked = styled(Link)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-decoration: none;
  text-transform: uppercase;
  font-size: 50px;
`;

const App: FC = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            <Linked to="/continents">Continents</Linked>
          </Route>
          <Route path="/continents" component={Continents} exact />
          <Route path="/continents/:code" component={Countries} exact />
        </Switch>
      </Router>
    </Wrapper>
  );
};

export default App;
