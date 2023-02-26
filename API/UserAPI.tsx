import { AuthContext, useAuth } from '../Contexts/AuthContext';
import apiClient from './client';

const registerUser = async(userJson: any) => {
    return apiClient.post("/auth/register", userJson)
}

const getUser = async(id: String) => {
    return apiClient.get("/user", {id: id})
}

const loginUser = async(authJson: any) => {
    return apiClient.post("/auth/login", authJson)
}

const logoutUser = async(refreshToken: any) => {
    return apiClient.get("/auth/logout", {}, {headers: {"Authorization": "JWT " + refreshToken}})
}

export default { registerUser, loginUser, logoutUser, getUser }
