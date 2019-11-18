import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../layout/Register';
import Login from '../layout/Login';
import UploadHolders from '../layout/UploadHolders';
import Vote from '../layout/Vote';
import MyAccount from '../layout/MyAccount';
import Writing from '../layout/Writing';
import RegisterCorp from '../layout/RegisterCorp';
import PublishToken from '../layout/PublishToken';
// import ForgotPassword from "../layout/auth/ForgotPassword";
// import ResetPassword from "../layout/auth/ResetPassword";

// import NotFound from "../layout/NotFound";
import PrivateRoute from './PrivateRoute';
import Bulletin from '../layout/Bulletin';
import Board from '../layout/Board';
import BulletinWaggu from '../layout/BulletinWaggu';
import MakeVote from '../layout/MakeVote';

import ReceiveToken from '../layout/ReceiveToken';

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />

        <Route exact path='/uploadholders' component={UploadHolders} />
        <Route exact path='/vote' component={Vote} />
        <PrivateRoute exact path='/bulletin' component={Bulletin} />
        <PrivateRoute exact path='/uploadholders' component={UploadHolders} />
        <PrivateRoute exact path='/vote' component={Vote} />
        <PrivateRoute exact path='/myaccount' component={MyAccount} />
        <PrivateRoute exact path='/writing' component={Writing} />
        <PrivateRoute exact path='/Board' component={Board} />
        <PrivateRoute
          exact
          path='/BulletinWaggu/:id'
          component={BulletinWaggu}
        />
        <PrivateRoute exact path='/makevote' component={MakeVote} />
        <PrivateRoute exact path='/registercorp' component={RegisterCorp} />
        <PrivateRoute exact path='/publishtoken' component={PublishToken} />
        <PrivateRoute exact path='/receivetoken' component={ReceiveToken} />
        {/* <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/reset/:token" component={ResetPassword} /> */}

        {/* <Route component={NotFound} /> */}
      </Switch>
    </section>
  );
};

export default Routes;
