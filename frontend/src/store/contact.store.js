import { create } from "zustand"

const useContactStore = create(()=>({
    contacts:[],
    loading:false,
}))

export default useContactStore;