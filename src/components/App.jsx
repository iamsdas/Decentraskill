import { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StoreContext, initialState } from '../utils';
import Load from './Load';
import Layout from './Layout';
import '../styles/App.css';

const Verify = lazy(() => import('../pages/Verify'));
const LandingPage = lazy(() => import('../pages/LandingPage'));
const Company_Dashboard = lazy(() => import('../pages/Company_Dashboard'));
const User_Dashboard = lazy(() => import('../pages/User_Dashboard'));

const App = () => {
  const [state, setState] = useState(initialState);

  return (
    <StoreContext.Provider value={{ state, setState }}>
      <Router>
        <Layout>
          <Suspense fallback={Load}>
            <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route exact path='/company/:id' component={Company_Dashboard} />
              <Route exact path='/user/:id' component={User_Dashboard} />
              <Route exact path='/verify' component={Verify} />
            </Switch>
          </Suspense>
        </Layout>
      </Router>
    </StoreContext.Provider>
  );
};

export default App;
