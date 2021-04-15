import { createHashHistory } from "history";
import React from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import LayoutContainer from "../pages/layout";
import PageMap from "../pages/mapa/PageMap";
import PageLogin from "../pages/login/PageLogin";
import TalhaoPage from "../pages/talao/PageTalhao"
import { useAuth } from '../contexts/auth';

export const history = createHashHistory();

const PrivateRoute = (props) => {
  const { signed } = useAuth();
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(props) =>
        signed ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          )
      }
    />
  );
}

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={PageLogin} />
      <Route exact path="/talhao" component={TalhaoPage} />
      <LayoutContainer>
        <Switch>
          <PrivateRoute path="/home" component={PageMap} />
          <Redirect to="/home" component={PageMap} />
        </Switch>
      </LayoutContainer>
    </Switch>
  </Router>
);

export default Routes;
