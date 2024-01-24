import mongoose from "mongoose";
import Base from "../models/Base.js";
import Missile from "../models/Missile.js";
import Launch from "../models/Launch.js";
import Auth from "../models/Auth.js";

export const getStats = async (req, res) => {
    try {
        const bases = await Base.find();
        const missiles = await Missile.find();
        const launches = await Launch.find();
        const users = await Auth.find();

        res.status(200).json({ bases: bases.length, missiles: missiles.length, launches: launches.length, users: users.length });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}