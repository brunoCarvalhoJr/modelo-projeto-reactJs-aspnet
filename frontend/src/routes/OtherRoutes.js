import { createHashHistory } from "history";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import LayoutContainer from "../pages/layout";
import PageMap from "../pages/mapa/PageMap";

export const history = createHashHistory();

const Routes = () => (
    <Router history={history}>
        <Switch>
            <LayoutContainer>
                <Switch>
                    <Route path="/" component={PageMap} />
                </Switch>
            </LayoutContainer>
        </Switch>
    </Router>
);

export default Routes;
