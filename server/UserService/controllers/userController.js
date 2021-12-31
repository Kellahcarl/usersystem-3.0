const db = require("../database");

module.exports = {
  getUsers: async (req, res) => {
    let { recordset } = await db.exec("sp_getUsers");
    res.send({ users: recordset });
  },
  getUser: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).send({ message: "Id is required" });
    let { recordset } = await db.exec("sp_getUser", {
      userId: id,
    });
    res.send({ user: recordset[0] });
  },
  getUnassignedUsers: async (req, res) => {
    try {
      let { recordset } = await db.exec("sp_UnassignedUsers");
      res.send({ users: recordset });
    } catch (error) {
      res.send(error.message).status(500);
    }
  },
};
