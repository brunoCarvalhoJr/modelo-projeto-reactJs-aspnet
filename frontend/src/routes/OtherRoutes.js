import { createHashHistory } from "history";
import React from "react";
import { Route, Router, Switch, Redirect } from "react-router-dom";
import LayoutContainer from "../pages/layout";
import PageMap from "../pages/mapa/PageMap";
import Selecionar from "../pages/selecionar/PageSelecionar";

export const history = createHashHistory();

const Routes = () => (
    <Router history={history}>
        <Switch>
            <LayoutContainer>
                <Switch>
                    <Route exact path="/" component={Selecionar} />
                    <Route exact path="/mapa/:fazenda" component={PageMap} />
                    <Redirect to="/" component={Selecionar} />
                </Switch>
            </LayoutContainer>
        </Switch>
    </Router>
);

export default Routes;
