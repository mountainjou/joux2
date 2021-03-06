import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './layout/Nav';
import Main from './layout/Main';

import './App.css';

// Routing
import Routes from './routes/Routes';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import { getWeb3Account } from './actions/user';
import setAuthToken from './utils/setAuthToken';

// import Web3 from "web3";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

if (
  typeof window.ethereum !== 'undefined' ||
  typeof window.web3 !== 'undefined'
) {
  // Web3 browser user detected. You can now use the provider.
  const provider = window['ethereum'] || window.web3.currentProvider;
  // window.ethereum.enable(); // 메타마스크를 연결한다.
  provider.enable(); // 메타마스크를 연결한다.
  const account = provider.selectedAddress; // 현재 제공되는 web3 provider의 선택된 주소를 상수 account 담는다.
  console.log('isMetaMask? ', provider.isMetaMask); // 메타 마스크 접속되어있는지 확인
  store.dispatch(getWeb3Account(account)); // account 값이 존재하면 리듀서에 담아 전역 관리한다.

  // 만약 web3 provider의 지갑 주소가 업데이트 되면 전역 상태값을 갱신한다.
  provider.on('accountsChanged', account => {
    store.dispatch(getWeb3Account(account));
  });
}

// const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
// // const web3 = new Web3(Web3.givenProvider);

// let account;

// if (!Web3.givenProvider) {
//   console.log("없음");
// } else {
//   account = web3.givenProvider.selectedAddress; // 현재 제공되는 web3 provider의 선택된 주소를 상수 account 담는다.
// }

// // account 값이 존재하면 리듀서에 담아 전역 관리한다.
// if (account) {
//   store.dispatch(getWeb3Account(account));
// }
// // 만약 web3 provider의 지갑 주소가 업데이트 되면 전역 상태값을 갱신한다.
// web3.currentProvider.publicConfigStore.on("update", result => {
//   const account = result.selectedAddress;
//   store.dispatch(getWeb3Account(account));
// });

const App = () => {
  // 유저 불러오기 액션 실행
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Nav />
        <div style={{ height: '30px' }} />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;

// // 만약 web3 provider의 지갑 주소가 업데이트 되면 전역 상태값을 갱신한다.
// window.web3.currentProvider.publicConfigStore.on('update', result => {
//   const account = result.selectedAddress;
//   store.dispatch(getWeb3Account(account));
// });
