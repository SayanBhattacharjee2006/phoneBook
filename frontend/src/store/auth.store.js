import { create } from "zustand";
import { loginUser, registerUser, getMe, logoutUser } from "../api/auth.api";

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    authChecked: false,

    //login
    login: async (data) => {
        try {
            set({ loading: true });
            await loginUser(data);
            const res = await getMe();
            const userData = res?.data?.user ?? res?.data?.data?.user;
            set({
                user: userData,
                isAuthenticated: true,
                loading: false,
                authChecked: true,
            });
        } catch (error) {
            set({ loading: false });
            throw error;
        }
    },

    //register
    register: async (data) => {
        try {
            set({ loading: true });
            await registerUser(data);
            const res = await getMe();
            const userData = res?.data?.user ?? res?.data?.data?.user;
            set({
                user: userData,
                isAuthenticated: true,
                loading: false,
                authChecked: true,
            });
        } catch (error) {
            set({ loading: false });
            throw error;
        }
    },

    // check existing season
    checkAuth: async () => {
        try {
            set({ loading: true });
            const res = await getMe();
            const userData = res?.data?.user ?? res?.data?.data?.user;
            set({
                user: userData,
                isAuthenticated: true,
                loading: false,
                authChecked: true,
            });
        } catch (error) {
            set({
                user: null,
                isAuthenticated: false,
                loading: false,
                authChecked:true
            });
        }
    },

    //logout user
    logout: async () => {
        try {
            set({ loading: true });
            await logoutUser();
        } finally {
            set({
                user: null,
                isAuthenticated: false,
                loading: false,
            });
        }
    },
}));

export default useAuthStore;
