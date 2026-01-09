import api from "./axios"

export const createEmail = (contactId, data) => {
    // backend expects { emails: [ ... ] }
    return api.post(`/email/${contactId}`, { emails: [data] });
}

export const updateEmail = (contactId, emailId, data) => {
    // backend expects { emailDetails: { ... } } and uses PUT
    return api.put(`/email/${contactId}/${emailId}`, { emailDetails: data });
}