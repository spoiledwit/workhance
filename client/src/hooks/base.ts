import axios from "axios";
import { BaseType } from "@/types";
import toast from "react-hot-toast";
import useAuthStore from "@/store/authStore";

export const addBase = async (base: BaseType) => {
    try {
        const {user} = useAuthStore.getState();
        if (user?.role !== "Army Chief" && user?.role !== "General") {
            toast.error("You are not authorized to add a base");
            return;
        }
        const res = await axios.post(`${import.meta.env.VITE_BASE_URI}/base`, base, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        toast.success("Base added successfully");
        return res.data;
    } catch (err) {
        console.error(err);
        toast.error("Error adding base");
    }
};

export const deleteBase = async (id: string) => {
    try {
        const {user} = useAuthStore.getState();
        if (user?.role !== "Army Chief" && user?.role !== "General") {
            toast.error("You are not authorized to delete a base");
            return;
        }
        const res = await axios.delete(`${import.meta.env.VITE_BASE_URI}/base/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        toast.success("Base deleted successfully");
        return res.data;
    } catch (err) {
        console.error(err);
        toast.error("Error deleting base");
    }
};

export const getBase = async (id: string) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/base/${id}`);
        return res.data;
    } catch (err) {
        console.error(err);
        toast.error("Error getting base");
    }
};

export const getBases = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/base`);
        return res.data;
    } catch (err) {
        console.error(err);
        toast.error("Error getting bases");
    }
};

export const updateBase = async (id: string, base: BaseType) => {
    try {
        const {user} = useAuthStore.getState();
        if (user?.role !== "Army Chief" && user?.role !== "General") {
            toast.error("You are not authorized to update a base");
            return;
        }
        const res = await axios.put(`${import.meta.env.VITE_BASE_URI}/base/${id}`, base, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        toast.success("Base updated successfully");
        return res.data;
    } catch (err) {
        console.error(err);
        toast.error("Error updating base");
    }
};