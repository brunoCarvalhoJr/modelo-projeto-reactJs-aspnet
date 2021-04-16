import React from 'react';
import { useAuth } from '../contexts/auth';

import SignRoutes from './SignRoutes';
import OtherRoutes from './OtherRoutes';

const Routes = () => {
 const {signed } = useAuth();
 return signed ? <OtherRoutes /> : <SignRoutes />;
};

export default Routes;
