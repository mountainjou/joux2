import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./layout/Nav";
import Main from "./layout/Main";

// Routing
import Routes from "./routes/Routes";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { getWeb3Account } from "./actions/user";
import setAuthToken from "./utils/setAuthToken";

import Web3 from "web3";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

const App = () => {
  // 유저 불러오기 액션 실행
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  web3.eth.getAccounts().then(account => {
    console.log(account);
    store.dispatch(getWeb3Account(account));
  });

  return (
    <Provider store={store}>
      <Router>
        <Nav />
        <div style={{ height: "30px" }} />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
