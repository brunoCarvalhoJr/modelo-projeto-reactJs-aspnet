import React, {createContext, useState, useEffect, useContext} from 'react';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../http/auth';
import api from '../http/api';

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(username: String, password: String): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
      }

      setLoading(false);
    }

    loadStorageData();
  });

  async function signIn(username: String, password: String) {
    const { data } = await auth.signIn(username, password);

    const { token } = data;

    api.defaults.headers.Authorization = `Baerer ${data.token}`;

    var decoded = jwt_decode<User>(token);
    setUser(decoded);
    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(decoded));
    await AsyncStorage.setItem('@RNAuth:token', token);
    await AsyncStorage.setItem(
      '@RNAuth:dateSync',
      new Date('0001-01-01T00:00:00Z').toDateString(),
    );
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{signed: !!user, user, loading, signIn, signOut}}>
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

export {AuthProvider, useAuth};
