import { createContext, useState, useContext, useEffect, FC } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthData, authService } from "../Services/AuthService";
import createSocket from "../Services/SocketService";

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  login(username: String, password: String): Promise<void>;
  signOut(): Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: FC<{ children: any }> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
    console.log("===> Load storage data")
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem("@AuthData");
      if (authDataSerialized) {
        const _authData: AuthData = JSON.parse(authDataSerialized);
        _authData.socket = await createSocket(_authData.accessToken)
        setAuthData(_authData);
      }
    } catch (error) {
      console.log("Error loading data from memory");
    } finally {
      setLoading(false);
    }
  }

  const login = async (username: String, password: String) => {
    setLoading(true);
    const _authData = await authService.login(username, password);
    AsyncStorage.setItem("@AuthData", JSON.stringify(_authData));
    _authData.socket = await createSocket(_authData.accessToken)
    setAuthData(_authData);
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    const _authData = await authService.logout(authData?.refreshToken);
    if (_authData.status == 200) {
      authData?.socket?.close()
      setAuthData(undefined);
      await AsyncStorage.removeItem("@AuthData");
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ authData, loading, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
