import React, { createContext, useState, useEffect, useContext } from 'react';
import * as auth from '../http/auth';
import api from '../http/api';

const initialUser = {
  name: '',
  email: ''
}

const initialState = {
  signed: false,
  user: {},
  loading: false,
  signIn: () => { },
  signOut: () => { }
}

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
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
  });

  async function signIn() {
    const response = await auth.signIn();
    setUser(response.user);

    api.defaults.headers.Authorization = `Baerer ${response.token}`;

    localStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    localStorage.setItem('@RNAuth:token', response.token);
    localStorage.setItem(
      '@RNAuth:dateSync',
      new Date('0001-01-01T00:00:00Z').toDateString(),
    );
  }

  async function signOut() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}>
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
