import { AuthContext, useAuth } from '../Contexts/AuthContext';
import apiClient from './client';

const registerUser = async(userJson: any) => {
    return apiClient.post("/auth/register", userJson)
}

const getUser = async(id: String, accessToken: any) => {
    return apiClient.get("/user/" + id, {}, {headers: {"Authorization": "JWT " + accessToken}})
}

const loginUser = async(authJson: any) => {
    return apiClient.post("/auth/login", authJson)
}

const logoutUser = async(refreshToken: any) => {
    return apiClient.get("/auth/logout", {}, {headers: {"Authorization": "JWT " + refreshToken}})
}

const updateUser = async(dataJson: any, accessToken: any) => {
    return apiClient.put("/user", dataJson, {headers: {"Authorization": "JWT " + accessToken}})
}

const refreshAccessToken = async(refreshToken: any) => {
    return apiClient.get("/auth/refresh", {}, {headers: {"Authorization": "JWT " + refreshToken}})
}

export default { registerUser, loginUser, logoutUser, getUser, updateUser, refreshAccessToken }
