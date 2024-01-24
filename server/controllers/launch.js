import Launch from "../models/Launch.js";
import Missile from "../models/Missile.js";
import Base from "../models/Base.js";

export const createLaunch = async (req, res) => {
  const launch = req.body;
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const newLaunch = new Launch({
      userId: userId,
      missileId: launch.missileId,
      baseId: launch.baseId,
      targetName: launch.region,
      target:launch.target,
      totalCost: launch.totalCost,
    });

    await newLaunch.save();

    await Missile.findByIdAndDelete(launch.missileId);
    const base = await Base.findById(launch.baseId);
    base.missiles = base.missiles.filter(
      (missile) => missile.toString() !== launch.missileId
    );
    await base.save();

    res.status(201).json(newLaunch);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};


export const getLaunches = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const launches = await Launch.find({ userId: userId }).populate(
      "missileId baseId"
    );

    res.status(200).json(launches);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}