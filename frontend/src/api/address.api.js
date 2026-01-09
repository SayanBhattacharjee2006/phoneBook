import api from "./axios"

export const  createAddress = (contactId,data) => {
    return api.post(`/address/${contactId}`,{ addresses:[data]});
}

export const  updateAddress = (contactId,addressId,data) => {
    return api.put(`/address/${contactId}/${addressId}`,{addressDetails: data});
}