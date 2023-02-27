import apiClient from "./client";

const getAllPosts = async (accessToken: any) => {
    return apiClient.get("/post/", {}, {headers: {"Authorization": "JWT " + accessToken}})
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

const getPostsById = async (id: String, accessToken: any) => {
    return apiClient.get("/post/"+ id, {}, {headers: {"Authorization": "JWT " + accessToken}})
}

const updatePost = async (id: String, dataJson: any ,accessToken: any) => {
    return apiClient.put("/post/"+ id, dataJson, {headers: {"Authorization": "JWT " + accessToken}})
}

export default { getAllPosts, addPost, getPostsBySender, deletePostsById, getPostsById, updatePost }