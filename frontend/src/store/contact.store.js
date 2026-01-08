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
    }
}));

export default useContactStore;
