import Missile from "../models/Missile.js";
import Base from "../models/Base.js";

export const getAvailableMissiles = async (req, res) => {
    try {
        const missiles = await Missile.find();
        const bases = await Base.find();
        const availableMissiles = missiles.filter(missile => !bases.some(base => base.missiles.includes(missile._id)));
        res.status(200).json(availableMissiles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getMissiles = async (req, res) => {
    try {
        const missiles = await Missile.find();
        res.status(200).json(missiles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getMissile = async (req, res) => {
    const { id } = req.params;

    try {
        const missile = await Missile.findById(id);
        res.status(200).json(missile);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createMissile = async (req, res) => {
    const missile = req.body;

    const newMissile = new Missile(missile);

    try {
        await newMissile.save();
        res.status(201).json(newMissile);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateMissile = async (req, res) => {
    const { id } = req.params;
    const missile = req.body;

    const updatedMissile = await Missile.findByIdAndUpdate(id, missile, { new: true });

    if (!updatedMissile) {
        return res.status(404).send("No missile with that id");
    }

    res.json(updatedMissile);
}

export const deleteMissile = async (req, res) => {
    const { id } = req.params;

    const missile = await Missile.findByIdAndRemove(id);

    if (!missile) {
        return res.status(404).send("No missile with that id");
    }

    res.json({ message: "Missile deleted successfully" });
}