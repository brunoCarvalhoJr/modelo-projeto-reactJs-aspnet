import React, { createContext, useState, useEffect, useContext } from 'react';

const LoadingContext = createContext({
  loading: false
});

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function invokeLoading() {
    setLoading(!loading)
  }

  return (
    <LoadingContext.Provider
      value={{ loading, invokeLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { LoadingProvider, useLoading };
