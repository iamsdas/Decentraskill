import React, {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useReducer,
} from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Web3 from 'web3';
import { StoreContext, Reducer, initialState } from '../utils/store.js';
import SmartContract from '../abis/Decentraskill.json';

const LandingPage = lazy(() => import('../pages/LandingPage.jsx'));
const Company_Dashboard = lazy(() => import('../pages/Company_Dashboard'));
const User_Dashboard = lazy(() => import('../pages/User_Dashboard'));

const App = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const initWeb3 = useCallback(async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      try {
        const web3 = new Web3(window.ethereum);
        const account = (await web3.eth.getAccounts())[0];
        const netId = await web3.eth.net.getId();
        const address = SmartContract.networks[netId].address;
        const contract = new web3.eth.Contract(SmartContract.abi, address);
        const accountId = await contract.methods.address_to_id(account).call();
        dispatch({
          type: 'init_web3',
          payload: {
            web3,
            account,
            contract,
            accountId,
          },
        });
      } catch (e) {
        alert(e);
      }
    } else {
      alert('web3 not detected');
    }
  }, []);

  useEffect(() => {
    initWeb3();
  }, [initWeb3]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/company' component={Company_Dashboard} />
            <Route exact path='/user' component={User_Dashboard} />
          </Switch>
        </Suspense>
      </Router>
    </StoreContext.Provider>
  );
};

export default App;
