// this file will contain only auth related api calls

import api from "./axios"

export const registerUser = (data) => {
    return api.post("/auth/register",data);
}

export const loginUser = (data) => {
    return api.post("/auth/login",data);
}

export const getMe = () => {
    return api.get("/auth/me")
}

export const logoutUser = () => {
    return api.post("/auth/logout")
}