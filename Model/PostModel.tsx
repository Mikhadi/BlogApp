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
    console.log(res);
    return res;
  } catch (err) {
    console.log("Adding Post failed" + err);
  }
  return null;
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
  return data.reverse()
};

const deletePostById = async (id: String, accessToken: any) => {
    try{
        const res: any = await PostAPI.deletePostsById(id, accessToken);
        console.log(res)
        return res
    }catch(err){
        console.log("Failed deleting post" + err)
    }
  };

export default { addPost, getPostsBySender, deletePostById };
