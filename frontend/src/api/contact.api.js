import api from "./axios";

export const createContact = (data) => {
    return api.post("/contact/",data);
}

export const getAllContact = () => {
    return api.get("/contact/");
}

export const searchContacts = (query) => {
    return api.get(`/contact/search?q=${query}`);
}

export const getContactById = (contactId) => {
    return api.get(`/contact/${contactId}`);
}

export const updateContact = (contactId,data) => {
    return api.put(`/contact/${contactId}`,data);
}

export const deleteContact = (contactId) => {
    return api.delete(`/contact/${contactId}`);
}

export const toggleFavouriteContact = (contactId) => {
    return api.patch(`/contact/${contactId}/favourite`);
}