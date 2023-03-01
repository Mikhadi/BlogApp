import apiClient from "../API/client";
import UserAPI from "../API/UserAPI";
import FormData from "form-data";

export type User = {
  name: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
};

const register = async (user: User) => {
  const data = {
    name: user.name,
    email: user.email,
    username: user.username,
    password: user.password,
    avatar_url: user.avatar,
  };
  try {
    const res: any = await UserAPI.registerUser(data);
    return res;
  } catch (err) {
    console.log("Register user failed" + err);
  }
};

const getUser = async (id: String, accessToken: any) => {
  let user: User = {
    name: "",
    email: "",
    username: "",
    password: "",
    avatar: "",
  };
  const res: any = await UserAPI.getUser(id, accessToken);
  user.name = res.data.name;
  user.email = res.data.email;
  user.username = res.data.username;
  user.avatar = res.data.avatar_url;
  return user;
};

const uploadImage = async (imageURI: String) => {
  var body = new FormData();
  body.append("file", { name: "name", type: "image/jpeg", uri: imageURI });
  let url = "/file/";
  const res: any = await apiClient.post(url, body);
  if (!res.ok) {
    return "";
  } else {
    return res.data.url;
  }
};

const updateUser = async (dataJson: any, accessToken: any) => {
  const res = await UserAPI.updateUser(dataJson, accessToken);
  return res;
};

export default { register, getUser, uploadImage, updateUser };
