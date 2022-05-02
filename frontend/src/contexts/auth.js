import React, { createContext, useState, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import * as auth from '../http/auth';
import api from '../http/api';

const AuthContext = createContext({
  signed: false,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = localStorage.getItem('@RNAuth:user');
      const storagedToken = localStorage.getItem('@RNAuth:token');
      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(username, password) {
    const { data } = await auth.signIn(username, password);

    const { token } = data;

    api.defaults.headers.Authorization = `Baerer ${token}`;

    var decoded = jwt_decode(token);
    setUser(decoded);

    localStorage.setItem('@RNAuth:user', JSON.stringify(decoded));
    localStorage.setItem('@RNAuth:token', token);
  }

  async function signOut() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn: signIn,
        signOut: signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { AuthProvider, useAuth };
