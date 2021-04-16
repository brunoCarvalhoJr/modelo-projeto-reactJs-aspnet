import React from 'react';
import { createHashHistory } from "history";
import { Router, Route } from 'react-router-dom';

import Login from '../pages/login/PageLogin';

export const history = createHashHistory();

const SignRoutes = () => {
 return (
  <Router history={history}>
     <Route path="/" component={Login} />
   </Router>
 );
};

export default SignRoutes;