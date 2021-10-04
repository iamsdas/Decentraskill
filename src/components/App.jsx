import React, { Suspense, lazy, useCallback, useState, useEffect } from 'react';
import { Web3Context } from '../utils/web3.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Web3 from 'web3';

const LandingPage = lazy(() => import('../pages/LandingPage.jsx'));

const App = () => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
    email: '',
    signedIn: false,
    loaded: false,
  });

  const initWeb3 = useCallback(async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      try {
        // const web3 = new Web3(window.ethereum);
        // const netId = await web3.eth.net.getId();
        // const address = SmartContract.networks[netId].address;
        // const contract = new web3.eth.Contract(SmartContract.abi, address);
        // setState({
        //   ...state,
        //   web3,
        //   contract,
        //   loaded: true,
        // });
        console.log('setup complete');
      } catch (e) {
        alert(e);
      }
    } else {
      alert('web3 not detected');
    }
  });

  useEffect(() => {
    initWeb3();
  }, [initWeb3]);

  return (
    <Web3Context.Provider value={{ state, setState }}>
      {/* <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path='/' component={LandingPage} />
          </Switch>
        </Suspense>
      </Router> */}
      <div>hello world</div>
    </Web3Context.Provider>
  );
};

export default App;
