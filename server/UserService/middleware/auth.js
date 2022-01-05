const jwt = require("jsonwebtoken");

module.exports = {
  authToken: async (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.send(" no token provided");
    } else token = authHeader.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ message: "Access denied. No token provided" });

    try {
      const data = await jwt.verify(token, process.env.SECRET_KEY);
      req.user = data;
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid token" });
    }
  },
  isAdmin: async (req, res, next) => {
    try {
      if (req.user.isAdmin !== true)
        return res
          .status(401)
          .send({ message: "Only admins can make this request" });
      next();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};
