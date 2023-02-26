import apiClient from "./client";

const getAllPosts = async () => {
    return apiClient.get("/post")
}

const addPost = async (postJson: any, accessToken: any) => {
    return apiClient.post("/post", postJson, {headers: {"Authorization": "JWT " + accessToken}})
}

const getPostsBySender = async (id: String, accessToken: any) => {
    return apiClient.get("/post", {sender: id}, {headers: {"Authorization": "JWT " + accessToken}})
}

const deletePostsById = async (id: String, accessToken: any) => {
    return apiClient.post("/post/delete", {params: {id: id}}, {headers: {"Authorization": "JWT " + accessToken}})
}

export default { getAllPosts, addPost, getPostsBySender, deletePostsById }