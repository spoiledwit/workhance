import axios from "axios";
import toast from "react-hot-toast";

export const getLaunches = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/launch`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err);
    toast.error("Error getting launches");
  }
};
