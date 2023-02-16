import apiClient from './client';
import { User } from '../Model/UserModel';


const registerUser = async(userJson: any) => {
    return apiClient.post("/auth/register", userJson)
}

const loginUser = async(userJson: any) => {
    return apiClient.post("/auth/login", userJson)
}

export default { registerUser, loginUser }
