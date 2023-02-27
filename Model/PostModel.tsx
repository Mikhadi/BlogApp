import apiClient from "../API/client";
import PostAPI from "../API/PostAPI";
import UserModel from "./UserModel";

export type Post = {
  id: string;
  message: string;
  image: string;
  sender: string;
};

const addPost = async (message: string, image: string, accessToken: any) => {
  const data = {
    message: message,
    image: image,
  };
  try {
    const res = await PostAPI.addPost(data, accessToken);
    return res;
  } catch (err) {
    console.log("Adding Post failed" + err);
  }
  return null;
};

const getAllPosts = async (accessToken: any) => {
  const res: any = await PostAPI.getAllPosts(accessToken);
  let data = Array<Post>();
  if (res.status == 200) {
    res.data.post.forEach((obj: any) => {
      const post: Post = {
        id: obj._id,
        message: obj.message,
        image: obj.image,
        sender: obj.sender,
      };
      data.push(post);
    });
  }
  return data.reverse();
};

const getPostsBySender = async (id: String, accessToken: any) => {
  const res: any = await PostAPI.getPostsBySender(id, accessToken);
  let data = Array<Post>();
  if (res.data) {
    res.data.post.forEach((obj: any) => {
      const post: Post = {
        id: obj._id,
        message: obj.message,
        image: obj.image,
        sender: obj.sender,
      };
      data.push(post);
    });
  }
  return data.reverse();
};

const deletePostById = async (id: String, accessToken: any) => {
  try {
    const res: any = await PostAPI.deletePostsById(id, accessToken);
    return res;
  } catch (err) {
    console.log("Failed deleting post" + err);
  }
};

const getPostById = async (id: String, accessToken: any) => {
  let post: Post = {
    id: "",
    message: "",
    image: "",
    sender: "",
  };
  try {
    const res: any = await PostAPI.getPostsById(id, accessToken);
    if (res.status == 200) {
      post.id = id.toString();
      post.message = res.data.post.message;
      post.image = res.data.post.image;
      post.sender = res.data.post.sender;
    }
  } catch (err) {
    console.log("Failed getting post" + err);
  }
  return post;
};

const updatePost = async (id: String, data: any, accessToken: any) => {
  let res: any
  try {
    res = await PostAPI.updatePost(id, data, accessToken);
  } catch (err) {
    console.log("Failed getting post" + err);
  }
  return res
};

export default {
  addPost,
  getPostsBySender,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePost
};
