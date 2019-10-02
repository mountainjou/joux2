import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../layout/Register";
import Login from "../layout/Login";
// import ForgotPassword from "../layout/auth/ForgotPassword";
// import ResetPassword from "../layout/auth/ResetPassword";

// import NotFound from "../layout/NotFound";
// import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/reset/:token" component={ResetPassword} /> */}

        {/* <Route component={NotFound} /> */}
      </Switch>
    </section>
  );
};

export default Routes;
