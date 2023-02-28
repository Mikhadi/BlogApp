import UserAPI from "../API/UserAPI";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import Client, { Socket } from "socket.io-client";


export type AuthData = {
    refreshToken: String;
    accessToken: String;
    id: String;
    status: Number,
    error: String,
    socket?: Socket<DefaultEventsMap, DefaultEventsMap>
}

const login = async (username: String, password: String): Promise<AuthData> => {
    const data = {
        username: username,
        password: password,
    }
    const res: any = await UserAPI.loginUser(data)
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            id: res.data.id,
            status: res.status,
            error: res.data.error,
          });
        }, 1000);
      });
  };

  const logout = async (refreshToken: any): Promise<AuthData> => {
    const res: any = await UserAPI.logoutUser(refreshToken)
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            accessToken: "",
            refreshToken: "",
            id: "",
            status: res.status,
            error: res.data?.error
          });
        }, 1000);
      });
  };
  
  export const authService = {
    login, logout
  };