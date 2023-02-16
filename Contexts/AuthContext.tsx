import {createContext, useState, useContext, useEffect, FC} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

import {AuthData, authService} from "../Services/AuthService"

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  login(username: String, password: String): Promise<void>;
  signOut(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: FC<{children:any}> = ({children}) => {
  const [authData, setAuthData] = useState<AuthData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
        console.log("Error loading data from memory")
    } finally {
      setLoading(false);
    }
  }

  const login = async (username: String, password: String) => {
    setLoading(true)
    const _authData = await authService.login(username, password);
    setAuthData(_authData);
    AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
    setLoading(false)
  };

  const signOut = async () => {
    setLoading(true)
    setAuthData(undefined);
    await AsyncStorage.removeItem('@AuthData');
    setLoading(false)
  };

  return (
    <AuthContext.Provider value={{authData, loading, login, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthContext, AuthProvider, useAuth};
