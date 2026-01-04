import { create } from "zustand"

const useAuthStore = create(()=>({
    user:null,
    isAuthenticated:user,
    loading:false,
}))

export default useAuthStore;