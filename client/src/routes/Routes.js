import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../layout/Register";
import Login from "../layout/Login";
import UploadHolders from "../layout/UploadHolders";
import Vote from "../layout/Vote";
// import ForgotPassword from "../layout/auth/ForgotPassword";
// import ResetPassword from "../layout/auth/ResetPassword";

// import NotFound from "../layout/NotFound";
import PrivateRoute from "./PrivateRoute";
import Bulletin from "../layout/Bulletin";

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />

        {/* <Route exact path="/uploadholders" component={UploadHolders} />
        <Route exact path="/vote" component={Vote} /> */}
        <PrivateRoute exact path="/Bulletin" component={Bulletin} />
        <PrivateRoute exact path="/uploadholders" component={UploadHolders} />
        <PrivateRoute exact path="/vote" component={Vote} />
        {/* <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/reset/:token" component={ResetPassword} /> */}

        {/* <Route component={NotFound} /> */}
      </Switch>
    </section>
  );
};

export default Routes;
