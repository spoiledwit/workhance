import Base from "../models/Base.js";
import Missile from "../models/Missile.js";
import mongoose from "mongoose";


export const getBaseMissiles  = async (req, res) => {
  const { id } = req.params;
  try {
    const base = await Base.findById(id).populate("missiles");
    res.status(200).json(base.missiles);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBases = async (req, res) => {
  try {
    const bases = await Base.find();
    res.status(200).json(bases);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBasesWithMissiles = async (req, res) => {
  try {
    const bases = await Base.find().populate("missiles");
    res.status(200).json(bases);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBase = async (req, res) => {
  const { id } = req.params;

  try {
    const base = await Base.findById(id);
    res.status(200).json(base);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createBase = async (req, res) => {
  const base = req.body;

  const newBase = new Base(base);

  try {
    await newBase.save();
    res.status(201).json(newBase);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateBase = async (req, res) => {
  const { id } = req.params;
  const base = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No base with that id");
    }

    const updatedBase = await Base.findByIdAndUpdate(id, base, { new: true });

    res.json(updatedBase);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const editBase = async (req, res) => {
  const { id } = req.params;
  const base = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No base with that id");
  }

  const updatedBase = await Base.findByIdAndUpdate(id, base, { new: true });

  res.json(updatedBase);
};

export const deleteBase = async (req, res) => {
  const { id } = req.params;

  await Base.findByIdAndRemove(id);

  res.json({ message: "Base deleted successfully" });
};

export const addMissile = async (req, res) => {
  const { id } = req.params;
  const { missileId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No base with that id");
  }

  if (!mongoose.Types.ObjectId.isValid(missileId)) {
    return res.status(404).send("No missile with that id");
  }

  const base = await Base.findById(id);
  const missile = await Missile.findById(missileId);

  base.missiles.push(missile);

  const updatedBase = await Base.findByIdAndUpdate(id, base, { new: true });

  res.json(updatedBase);
};
