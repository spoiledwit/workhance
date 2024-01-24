import axios from "axios";
import toast from "react-hot-toast";
import { MissileType } from "@/types";
import useAuthStore from "@/store/authStore";

export const addMissile = async (missile: MissileType) => {
  try {
    const { user } = useAuthStore.getState();
    if (user?.role !== "Army Chief" && user?.role !== "General") {
      toast.error("You are not authorized to add a missile");
      return;
    }
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URI}/missile`,
      missile,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success("Missile added successfully");
    return res.data;
  } catch (err) {
    console.error(err);
    toast.error("Error adding missile");
  }
};

export const deleteMissile = async (id: string) => {
  try {
    const { user } = useAuthStore.getState();
    if (user?.role !== "Army Chief" && user?.role !== "General") {
      toast.error("You are not authorized to delete a missile");
      return;
    }
    const res = await axios.delete(
      `${import.meta.env.VITE_BASE_URI}/missile/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success("Missile deleted successfully");
    return res.data;
  } catch (err) {
    console.error(err);
    toast.error("Error deleting missile");
  }
};

export const getMissile = async (id: string) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URI}/missile/${id}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
    toast.error("Error getting missile");
  }
};

export const getMissiles = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/missile`);
    return res.data;
  } catch (err) {
    console.error(err);
    toast.error("Error getting missiles");
  }
};

export const updateMissile = async (id: string, missile: MissileType) => {
  try {
    const { user } = useAuthStore.getState();
    if (user?.role !== "Army Chief" && user?.role !== "General") {
      toast.error("You are not authorized to update a missile");
      return;
    }
    const res = await axios.patch(
      `${import.meta.env.VITE_BASE_URI}/missile/${id}`,
      missile,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success("Missile updated successfully");
    return res.data;
  } catch (err) {
    console.error(err);
    toast.error("Error updating missile");
  }
};
