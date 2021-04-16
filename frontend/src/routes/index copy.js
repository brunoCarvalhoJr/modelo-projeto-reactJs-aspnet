// import { createHashHistory } from "history";
// import React from "react";
// import { Redirect, Route, Router, Switch } from "react-router-dom";
// import LayoutContainer from "../pages/layout";
// import PageMap from "../pages/mapa/PageMap";
// import PageLogin from "../pages/login/PageLogin";
// import { useAuth } from '../contexts/auth';
// import { AuthProvider } from '../contexts/auth';

// export const history = createHashHistory();

// const PrivateRoute = (props) => {
//   const { signed } = useAuth();
//   console.log('signed', signed)
//   const { component: Component, ...rest } = props;
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         signed ? (
//           <Component {...props} />
//         ) : (
//             <Redirect
//               to={{
//                 pathname: "/",
//                 state: { from: props.location },
//               }}
//             />
//           )
//       }
//     />
//   );
// }

// const Routes = () => (
//   <Router history={history}>
//     <Switch>
//       <Route exact path="/" component={PageLogin} />
//       <AuthProvider>
//         <LayoutContainer history={history}>
//           <Switch>
//             <PrivateRoute path="/home" component={PageMap} />
//             <Redirect to="/home" component={PageMap} />
//           </Switch>
//         </LayoutContainer>
//       </AuthProvider>
//     </Switch>
//   </Router>
// );

// export default Routes;


import React, { useContext } from 'react';
import AuthContext from '../contexts/auth';

import SignRoutes from './SignRoutes';
import OtherRoutes from './OtherRoutes';

const Routes = () => {
 const { signed } = useContext(AuthContext);

 return signed ? <OtherRoutes /> : <SignRoutes />;
};

export default Routes;
