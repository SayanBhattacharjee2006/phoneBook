import api from "./axios"

export const createPhone = (contactId, data) => {
    // backend expects { phones: [ ... ] }
    return api.post(`/phone/${contactId}`, { phones: [data] });
}

export const updatePhone = (contactId, phoneId, data) => {
    // backend expects { phoneDetails: { ... } } and uses PUT
    return api.put(`/phone/${contactId}/${phoneId}`, { phoneDetails: data });
}