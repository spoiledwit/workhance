const emailVerified = async (req, res, next) => {
    try {
        const user = await AuthModel.findById(req.userId);

        if (!user) {
            return res.status(404).send("User doesn't exist");
        }

        if (!user.verify) {
            return res.status(404).send("User not verified");
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
}

export default emailVerified;