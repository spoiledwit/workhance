import AuthModel from "../models/Auth.js";

export const verifyAdminGeneral = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await AuthModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (user.role !== "Army Chief" && user.role !== "General") {
      return res
        .status(401)
        .json({ message: "You are not authorized to perform this action" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};