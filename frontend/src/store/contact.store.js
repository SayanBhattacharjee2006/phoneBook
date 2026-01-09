import { create } from "zustand";
import {
    createContact as createContactApi,
    getAllContact,
    searchContacts as searchContactsApi,
    getContactById,
    updateContact as updateContactApi,
    deleteContact as deleteContactApi,
    toggleFavouriteContact,
} from "../api/contact.api";

import {
    createPhone,
    updatePhone as updatePhoneApi,
} from "../api/phone.api"

import {
    createEmail,
    updateEmail as updateEmailApi,
} from "../api/email.api"

import {
    createAddress,
    updateAddress as updateAddressApi
} from "../api/address.api"

const useContactStore = create((set) => ({
    contacts: [],
    selectedContact: null,
    loading: false,

    fetchContacts: async () => {
        try {
            set({ loading: true });
            const res = await getAllContact();
            set({
                loading: false,
                contacts:
                    res?.data?.data?.contacts || [],
            });
        } catch (error) {
            set({ loading: false });
            throw error;
        }
    },

    getContact: async (contactId) => {
        try {
            set({ loading: true });
            const res = await getContactById(contactId);
            set({
                loading: false,
                selectedContact: res?.data?.data?.contact,
            });
        } catch (error) {
            set({ loading: false });
            throw error;
        }
    },

    createContact: async (data) => {
        try {
            set({ loading: true });
            const res = await createContactApi(data);
            set((state) => ({
                contacts: [res?.data?.data?.contact, ...state.contacts],
                loading: false,
            }));
        } catch (error) {
            set({ loading: false });
            throw error;
        }
    },

    updateContact: async (contactId, data) => {
        try {
            set({ loading: true });
            const res = await updateContactApi(contactId, data);
            set((state) => ({
                contacts: state.contacts.map((contact) =>
                    contact._id === contactId ? res?.data?.data?.contact : contact
                ),
                loading: false,
            }));
        } catch (error) {
            set({ loading: false });
            throw error;
        }
    },

    deleteContact: async (contactId) => {
        try {
            set({ loading: true });
            await deleteContactApi(contactId);
            set((state) => ({
                contacts: state.contacts.filter((contact) =>
                    contact._id !== contactId
                ),
                selectedContact:null,
                loading: false,
            }));
        } catch (error) {
            set({ loading: false });
            throw error;
        }
    },

    toggleFavourite: async (contactId) => {
        try {
            const res = await toggleFavouriteContact(contactId);
            set((state) => ({
                contacts: state.contacts.map((contact) =>
                    contact._id === contactId ? res?.data?.data?.contact : contact
                ),
                selectedContact:state.selectedContact?._id === contactId? res?.data?.data?.contact : state.selectedContact,
                loading: false,
            }));
        } catch (error) {
            throw error;
        }
    },

    searchContacts: async (query) => {
        try {
            set({loading:true})
            const res = await searchContactsApi(query)
            set({
                loading:false,
                contacts: res?.data?.data?.contacts || [],
            })
        } catch (error) {
            set({loading:false})
            throw error;
        }
    },

    addPhone: async (contactId, data) => {
        const res = await createPhone(contactId,data);

        set((state) => ({
            selectedContact:{
                ...state.selectedContact,
                phones:[
                    ...(state.selectedContact?.phones || []),
                    ...(res?.data?.data?.phones || []),
                ],
            },
        }))

    },
    updatePhone: async (contactId,phoneId,data)=>{
        const res = await updatePhoneApi(contactId,phoneId,data);

        set((state)=>({
            selectedContact:{
                ...state.selectedContact,
                phones: state.selectedContact.phones.map((phone)=> phone._id === phoneId ? res?.data?.data?.phone : phone)
            }
        }))
    },
    addEmail: async (contactId, data) => {
        const res = await createEmail(contactId,data);

        set((state) => ({
            selectedContact:{
                ...state.selectedContact,
                emails:[
                    ...(state.selectedContact?.emails || []),
                    ...(res?.data?.data?.emails || []),
                ],
            },
        }))

    },
    updateEmail: async (contactId,emailId,data)=>{
        const res = await updateEmailApi(contactId,emailId,data);

        set((state)=>({
            selectedContact:{
                ...state.selectedContact,
                emails: state.selectedContact.emails.map((email)=> email._id === emailId ? res?.data?.data?.email : email)
            }
        }))
    },
    addAddress: async (contactId, data) => { 
        const res = await createAddress(contactId,data);

        set((state) => ({
            selectedContact:{
                ...state.selectedContact,
                addresses:[
                    ...(state.selectedContact?.addresses || []),
                    ...(res?.data?.data?.addresses || []),
                ],
            },
        }))
    },
    updateAddress: async (contactId,addressId,data)=>{
        const res = await updateAddressApi(contactId,addressId,data);

        set((state)=>({
            selectedContact:{
                ...state.selectedContact,
                addresses: state.selectedContact.addresses.map((address)=> address._id === addressId ? res?.data?.data?.address : address)
            }
        }))
    },
}));

export default useContactStore;
