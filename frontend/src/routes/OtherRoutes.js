import { createHashHistory } from "history";
import React from "react";
import { Route, Router, Switch, Redirect } from "react-router-dom";
import LayoutContainer from "../pages/layout";
import PageMap from "../pages/mapa/PageMap";
import PageCadastrarPergunta from "../pages/pegunta/PageCadastrarPergunta";
import PageEditarPergunta from "../pages/pegunta/PageEditarPergunta";
import PageListarPegunta from "../pages/pegunta/PageListarPegunta";
import Selecionar from "../pages/selecionar/PageSelecionar";

export const history = createHashHistory();

const Routes = () => (
    <Router history={history}>
        <Switch>
            <LayoutContainer>
                <Switch>
                    <Route exact path="/" component={Selecionar} />
                    <Route exact path="/mapa/:fazenda" component={PageMap} />
                    <Route exact path="/pergunta/listar" component={PageListarPegunta} />
                    <Route exact path="/pergunta/cadastrar" component={PageCadastrarPergunta} />
                    <Route exact path="/pergunta/editar/:id" component={PageEditarPergunta} />
                    <Redirect to="/" component={Selecionar} />
                </Switch>
            </LayoutContainer>
        </Switch>
    </Router>
);

export default Routes;
