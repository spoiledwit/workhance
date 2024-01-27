import { create } from "zustand";
import { User, Employer, Employee } from "../types";

type AuthStore = {
    token: string | null | undefined;
    user: User | null;
    employer: Employer | null;
    employee: Employee | null;
    setEmployer: (employer: Employer | null) => void;
    setEmployee: (employee: Employee | null) => void;
    setUser: (user: User | null) => void;  
    setToken: (token: string | null) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
    token: "",
    user: null,
    employer: null,
    employee: null,
    setUser: (user) => set({ user }),
    setEmployer: (employer) => set({ employer }),
    setEmployee: (employee) => set({ employee }),
    setToken: (token) => set({ token }),
}));

export default useAuthStore;