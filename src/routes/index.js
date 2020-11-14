import { createHashHistory } from "history";
import React from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import LayoutContainer from "../pages/layout";
import PageMap from "../pages/mapa/PageMap";
import PageLogin from "../pages/login/PageLogin";

export const history = createHashHistory();

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAutenticado: true,
    };
  }
  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) =>
          this.state.isAutenticado ? (
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
}

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={PageLogin} />
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
